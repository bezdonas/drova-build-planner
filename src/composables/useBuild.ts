import { ref, computed } from 'vue'
import { SKILL_CATEGORIES, SKILL_MAP } from '../data/skills'
import type { Skill } from '../types'

const BASE_STR = 5
const BASE_DEX = 5
const BASE_MIND = 5
const DEFAULT_TOTAL_LP = 132

const strength = ref(BASE_STR)
const dexterity = ref(BASE_DEX)
const mind = ref(BASE_MIND)
const totalLpAvailable = ref(DEFAULT_TOTAL_LP)
const selectedSkillIds = ref(new Set<string>())

const prowess = computed(() => strength.value + dexterity.value)

const statLpSpent = computed(
  () =>
    strength.value -
    BASE_STR +
    (dexterity.value - BASE_DEX) +
    (mind.value - BASE_MIND),
)

const skillLpSpent = computed(() => {
  let total = 0
  for (const id of selectedSkillIds.value) {
    const skill = SKILL_MAP.get(id)
    if (skill) total += skill.cost
  }
  return total
})

const totalLpSpent = computed(() => statLpSpent.value + skillLpSpent.value)
const lpRemaining = computed(
  () => totalLpAvailable.value - totalLpSpent.value,
)

function getAllPrerequisites(skillId: string): string[] {
  const result: string[] = []
  const visited = new Set<string>()

  function collect(id: string) {
    const skill = SKILL_MAP.get(id)
    if (!skill) return
    for (const prereqId of skill.prerequisites) {
      if (!visited.has(prereqId)) {
        visited.add(prereqId)
        collect(prereqId)
        result.push(prereqId)
      }
    }
  }

  collect(skillId)
  return result
}

function getAllDependents(skillId: string): string[] {
  const result: string[] = []
  const visited = new Set<string>()

  function collect(id: string) {
    for (const skill of SKILL_MAP.values()) {
      if (
        skill.prerequisites.includes(id) &&
        selectedSkillIds.value.has(skill.id) &&
        !visited.has(skill.id)
      ) {
        visited.add(skill.id)
        result.push(skill.id)
        collect(skill.id)
      }
    }
  }

  collect(skillId)
  return result
}

function costOfSkills(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (SKILL_MAP.get(id)?.cost ?? 0), 0)
}

function toggleSkill(skillId: string) {
  const next = new Set(selectedSkillIds.value)

  if (next.has(skillId)) {
    const dependents = getAllDependents(skillId)
    next.delete(skillId)
    for (const id of dependents) next.delete(id)
  } else {
    const prereqs = getAllPrerequisites(skillId).filter((id) => !next.has(id))
    const skill = SKILL_MAP.get(skillId)
    if (!skill) return

    for (const id of prereqs) next.add(id)
    next.add(skillId)
  }

  selectedSkillIds.value = next
}

function isSelected(skillId: string): boolean {
  return selectedSkillIds.value.has(skillId)
}

function meetsPrerequisites(skillId: string): boolean {
  const skill = SKILL_MAP.get(skillId)
  if (!skill) return false
  return skill.prerequisites.every((id) => selectedSkillIds.value.has(id))
}

function meetsProwess(skillId: string): boolean {
  const skill = SKILL_MAP.get(skillId)
  if (!skill) return true
  if (skill.prowess == null) return true
  return prowess.value >= skill.prowess
}

function canAfford(_skillId: string): boolean {
  return true
}

type StatName = 'strength' | 'dexterity' | 'mind'

const statRefs = { strength, dexterity, mind } as const
const statBases = {
  strength: BASE_STR,
  dexterity: BASE_DEX,
  mind: BASE_MIND,
} as const

function incrementStat(stat: StatName, amount = 1) {
  if (amount <= 0) return
  statRefs[stat].value += amount
}

function decrementStat(stat: StatName, amount = 1) {
  const base = statBases[stat]
  const current = statRefs[stat].value
  const remove = Math.min(amount, current - base)
  if (remove <= 0) return

  statRefs[stat].value -= remove

  // Remove skills whose prowess requirement is no longer met
  if (stat === 'strength' || stat === 'dexterity') {
    const newProwess = strength.value + dexterity.value
    const toRemove: string[] = []
    for (const id of selectedSkillIds.value) {
      const skill = SKILL_MAP.get(id)
      if (skill?.prowess != null && skill.prowess > newProwess) {
        toRemove.push(id)
      }
    }
    if (toRemove.length > 0) {
      const next = new Set(selectedSkillIds.value)
      for (const id of toRemove) {
        next.delete(id)
        for (const dep of getAllDependents(id)) next.delete(dep)
      }
      selectedSkillIds.value = next
    }
  }
}

function resetBuild() {
  strength.value = BASE_STR
  dexterity.value = BASE_DEX
  mind.value = BASE_MIND
  selectedSkillIds.value = new Set()
}

const selectedSkillsByCategory = computed(() => {
  const result: { category: string; skills: Skill[] }[] = []
  for (const cat of SKILL_CATEGORIES) {
    const skills = cat.skills.filter((s) => selectedSkillIds.value.has(s.id))
    if (skills.length > 0) {
      result.push({ category: cat.name, skills })
    }
  }
  return result
})

interface AggregatedBonus {
  label: string
  value: number
  unit: string
}

const aggregatedBonuses = computed(() => {
  const bonusMap = new Map<string, AggregatedBonus>()

  // Stat bonuses
  const strBonus = strength.value - BASE_STR
  if (strBonus > 0) {
    bonusMap.set('stat_phys_damage', {
      label: 'Physical damage (STR)',
      value: strBonus,
      unit: '%',
    })
  }
  const dexBonus = (dexterity.value - BASE_DEX) * 0.4
  if (dexBonus > 0) {
    bonusMap.set('stat_crit', {
      label: 'Crit chance (DEX)',
      value: parseFloat(dexBonus.toFixed(1)),
      unit: '%',
    })
  }

  // Skill bonuses
  for (const id of selectedSkillIds.value) {
    const skill = SKILL_MAP.get(id)
    if (!skill) continue
    for (const bonus of skill.bonuses) {
      const existing = bonusMap.get(bonus.type)
      if (existing) {
        existing.value = parseFloat((existing.value + bonus.value).toFixed(1))
      } else {
        bonusMap.set(bonus.type, { ...bonus })
      }
    }
  }

  return [...bonusMap.values()]
})

export function useBuild() {
  return {
    strength,
    dexterity,
    mind,
    prowess,
    totalLpAvailable,
    totalLpSpent,
    statLpSpent,
    skillLpSpent,
    lpRemaining,
    selectedSkillIds,
    selectedSkillsByCategory,
    aggregatedBonuses,
    toggleSkill,
    isSelected,
    meetsPrerequisites,
    meetsProwess,
    canAfford,
    incrementStat,
    decrementStat,
    resetBuild,
  }
}
