<script setup lang="ts">
import { computed } from 'vue'
import type { SkillCategory, Skill } from '../types'
import SkillNode from './SkillNode.vue'

const props = defineProps<{
  category: SkillCategory
}>()

const mainChain = computed(() => {
  const skills = props.category.skills
  const root = skills.find(
    (s) =>
      s.prerequisites.length === 0 ||
      s.prerequisites.every((p) => !skills.some((sk) => sk.id === p)),
  )
  if (!root) return []

  const chain: Skill[] = [root]
  let current = root

  while (true) {
    const candidates = skills.filter(
      (s) =>
        s.prerequisites.length === 1 &&
        s.prerequisites[0] === current.id &&
        !chain.includes(s),
    )
    if (candidates.length === 0) break
    // Pick the candidate that continues the longest chain (most dependents)
    const next = candidates.reduce((best, c) => {
      const bestDeps = skills.filter((s) =>
        s.prerequisites.includes(best.id),
      ).length
      const cDeps = skills.filter((s) =>
        s.prerequisites.includes(c.id),
      ).length
      return cDeps > bestDeps ? c : best
    })
    chain.push(next)
    current = next
  }

  return chain
})

const sideSkills = computed(() => {
  const chainIds = new Set(mainChain.value.map((s) => s.id))
  return props.category.skills.filter((s) => !chainIds.has(s.id))
})
</script>

<template>
  <div class="skill-category">
    <h3 class="category-name">{{ category.name }}</h3>
    <div class="skill-rows">
      <div v-if="mainChain.length" class="skill-row">
        <template v-for="(skill, i) in mainChain" :key="skill.id">
          <span v-if="i > 0" class="row-arrow">→</span>
          <SkillNode :skill="skill" />
        </template>
      </div>
      <div v-if="sideSkills.length" class="skill-row">
        <SkillNode
          v-for="skill in sideSkills"
          :key="skill.id"
          :skill="skill"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-category {
  padding: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.category-name {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

.skill-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.row-arrow {
  color: var(--color-text-muted);
  font-size: 16px;
  user-select: none;
}
</style>
