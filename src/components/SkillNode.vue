<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '../types'
import { useBuild } from '../composables/useBuild'
import { SKILL_MAP } from '../data/skills'

const props = defineProps<{
  skill: Skill
}>()

const { isSelected, meetsPrerequisites, meetsProwess, canAfford, toggleSkill, prowess } =
  useBuild()

const prerequisiteNames = computed(() =>
  props.skill.prerequisites.map((id) => SKILL_MAP.get(id)?.name ?? id),
)

const selected = computed(() => isSelected(props.skill.id))
const hasPrereqs = computed(() => meetsPrerequisites(props.skill.id))
const hasProwess = computed(() => meetsProwess(props.skill.id))
const affordable = computed(() => canAfford(props.skill.id))
const locked = computed(() => !hasProwess.value)

function handleClick() {
  if (locked.value && !selected.value) return
  toggleSkill(props.skill.id)
}
</script>

<template>
  <div
    class="skill-node"
    :class="{
      selected,
      locked,
      'no-prereqs': !hasPrereqs && !selected,
      unaffordable: !affordable && !selected,
    }"
    @click="handleClick"
  >
    <div class="skill-name">{{ skill.name }}</div>
    <div class="skill-meta">
      <span class="skill-cost">{{ skill.cost }} LP</span>
      <span v-if="skill.prowess" class="skill-prowess" :class="{ unmet: !hasProwess }">
        {{ skill.prowess }} Pr
      </span>
    </div>
    <div class="skill-tooltip">
      <div class="tooltip-desc" v-html="skill.description" />
      <div v-if="skill.ability" class="tooltip-ability">
        <span class="ability-name">{{ skill.ability.name }}</span>
        <span v-html="skill.ability.description" />
      </div>
      <div v-if="prerequisiteNames.length" class="tooltip-prereqs">
        Requires: {{ prerequisiteNames.join(', ') }}
      </div>
      <div class="tooltip-meta">
        <span>Cost: {{ skill.cost }} LP</span>
        <span v-if="skill.prowess">
          Prowess: {{ prowess }}/{{ skill.prowess }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-node {
  position: relative;
  padding: 8px 12px;
  border: 2px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  background: var(--color-bg-skill);
  transition: all 0.15s ease;
  min-width: 120px;
  text-align: center;
}

.skill-node:hover {
  border-color: var(--color-accent);
}

.skill-node:hover .skill-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.skill-node.selected {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.skill-node.selected .skill-prowess {
  color: rgba(255, 255, 255, 0.8);
}

.skill-node.locked {
  opacity: 0.45;
  cursor: not-allowed;
}

.skill-node.no-prereqs {
  opacity: 0.65;
}

.skill-node.unaffordable:not(.selected) {
  opacity: 0.55;
}

.skill-name {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
}

.skill-meta {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 4px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.selected .skill-meta {
  color: rgba(255, 255, 255, 0.8);
}

.skill-prowess.unmet {
  color: var(--color-danger);
}

.skill-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  width: 280px;
  padding: 10px 12px;
  background: var(--color-bg-tooltip);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  text-align: left;
  color: var(--color-text);
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease;
  z-index: 100;
  pointer-events: none;
}

.tooltip-desc {
  line-height: 1.5;
}

.tooltip-desc :deep(b) {
  color: var(--color-accent);
  font-weight: 700;
}

.tooltip-ability {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--color-border);
  line-height: 1.5;
}

.ability-name {
  display: inline;
  font-weight: 700;
  font-style: italic;
  color: var(--color-accent);
  margin-right: 4px;
}

.ability-name::after {
  content: ':';
}

.tooltip-ability :deep(b) {
  color: var(--color-accent);
  font-weight: 700;
}

.tooltip-prereqs {
  margin-top: 6px;
  font-size: 11px;
  color: var(--color-text-muted);
  font-style: italic;
}

.tooltip-meta {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid var(--color-border);
  font-size: 11px;
  color: var(--color-text-muted);
}
</style>
