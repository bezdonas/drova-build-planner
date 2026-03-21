<script setup lang="ts">
import { SKILL_CATEGORIES } from './data/skills'
import StatAllocator from './components/StatAllocator.vue'
import SkillCategoryGroup from './components/SkillCategoryGroup.vue'
import BuildSummary from './components/BuildSummary.vue'
</script>

<template>
  <header class="app-header">
    <h1>Drova: Forsaken Kin — Build Planner</h1>
  </header>

  <StatAllocator />

  <div class="app-layout">
    <main class="skill-grid">
      <SkillCategoryGroup
        v-for="category in SKILL_CATEGORIES"
        :key="category.id"
        :category="category"
      />
    </main>
    <BuildSummary />
  </div>
</template>

<style scoped>
.app-header {
  margin-bottom: 16px;
}

.app-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}

.app-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 16px;
  align-items: start;
  margin-top: 16px;
}

.skill-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
  }

  .skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>
