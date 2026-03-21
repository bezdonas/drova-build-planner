<script setup lang="ts">
import { useBuild } from '../composables/useBuild'

const {
  totalLpSpent,
  statLpSpent,
  skillLpSpent,
  strength,
  dexterity,
  mind,
  prowess,
  selectedSkillsByCategory,
  aggregatedBonuses,
  resetBuild,
} = useBuild()
</script>

<template>
  <aside class="build-summary">
    <div class="summary-header">
      <h2>Build Summary</h2>
      <button class="reset-btn" @click="resetBuild">Reset</button>
    </div>

    <div class="lp-display">
      <div class="lp-text">
        <span class="lp-spent">{{ totalLpSpent }}</span>
        <span class="lp-total"> LP used</span>
      </div>
    </div>

    <div class="summary-stats">
      <div class="summary-stat">
        <span>STR {{ strength }}</span>
        <span>DEX {{ dexterity }}</span>
        <span>MIND {{ mind }}</span>
        <span>Prowess {{ prowess }}</span>
      </div>
      <div class="summary-lp-breakdown">
        <span>Stats: {{ statLpSpent }} LP</span>
        <span>Skills: {{ skillLpSpent }} LP</span>
      </div>
    </div>

    <div v-if="aggregatedBonuses.length" class="summary-bonuses">
      <h4>Bonuses</h4>
      <ul>
        <li v-for="bonus in aggregatedBonuses" :key="bonus.label">
          <span class="bonus-value">+{{ bonus.value }}{{ bonus.unit }}</span>
          <span class="bonus-label">{{ bonus.label }}</span>
        </li>
      </ul>
    </div>

    <div class="summary-skills">
      <div
        v-for="group in selectedSkillsByCategory"
        :key="group.category"
        class="summary-category"
      >
        <h4>{{ group.category }}</h4>
        <ul>
          <li v-for="skill in group.skills" :key="skill.id">
            {{ skill.name }}
            <span class="skill-lp">{{ skill.cost }} LP</span>
          </li>
        </ul>
      </div>
      <p v-if="selectedSkillsByCategory.length === 0" class="no-skills">No skills selected</p>
    </div>
  </aside>
</template>

<style scoped>
.build-summary {
  padding: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  position: sticky;
  top: 16px;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.reset-btn {
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.1s ease;
}

.reset-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.lp-display {
  margin-bottom: 12px;
}

.lp-text {
  font-size: 13px;
}

.lp-spent {
  font-weight: 700;
  color: var(--color-accent);
}

.lp-total {
  color: var(--color-text);
}

.summary-stats {
  padding: 8px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 12px;
  font-size: 13px;
}

.summary-stat {
  display: flex;
  gap: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}

.summary-lp-breakdown {
  display: flex;
  gap: 12px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.summary-skills {
  font-size: 13px;
}

.summary-category h4 {
  margin: 8px 0 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.summary-category ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.summary-category li {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.skill-lp {
  color: var(--color-text-muted);
  font-size: 12px;
}

.summary-bonuses {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 12px;
}

.summary-bonuses h4 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.summary-bonuses ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.summary-bonuses li {
  display: flex;
  gap: 8px;
  padding: 2px 0;
  font-size: 13px;
}

.bonus-value {
  font-weight: 700;
  color: var(--color-accent);
  min-width: 50px;
}

.bonus-label {
  color: var(--color-text);
}

.no-skills {
  color: var(--color-text-muted);
  font-style: italic;
  margin: 8px 0;
}
</style>
