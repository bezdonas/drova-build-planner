<script setup lang="ts">
import { useBuild } from '../composables/useBuild'

const { strength, dexterity, mind, prowess, statLpSpent, incrementStat, decrementStat } =
  useBuild()

function onDecrement(stat: 'strength' | 'dexterity' | 'mind', event: MouseEvent) {
  decrementStat(stat, event.shiftKey ? 10 : 1)
}

function onIncrement(stat: 'strength' | 'dexterity' | 'mind', event: MouseEvent) {
  incrementStat(stat, event.shiftKey ? 10 : 1)
}
</script>

<template>
  <div class="stat-allocator">
    <div class="stat-row">
      <div class="stat-group">
        <label class="stat-label">STR</label>
        <button
          class="stat-btn"
          title="Hold Shift to remove 10"
          @click="onDecrement('strength', $event)"
          :disabled="strength <= 5"
        >-</button>
        <span class="stat-value">{{ strength }}</span>
        <button
          class="stat-btn"
          title="Hold Shift to add 10"
          @click="onIncrement('strength', $event)"
          :disabled="false"
        >+</button>
        <span class="stat-effect">+{{ strength - 5 }}% dmg</span>
      </div>

      <div class="stat-group">
        <label class="stat-label">DEX</label>
        <button
          class="stat-btn"
          title="Hold Shift to remove 10"
          @click="onDecrement('dexterity', $event)"
          :disabled="dexterity <= 5"
        >-</button>
        <span class="stat-value">{{ dexterity }}</span>
        <button
          class="stat-btn"
          title="Hold Shift to add 10"
          @click="onIncrement('dexterity', $event)"
          :disabled="false"
        >+</button>
        <span class="stat-effect">+{{ ((dexterity - 5) * 0.4).toFixed(1) }}% crit</span>
      </div>

      <div class="stat-group">
        <label class="stat-label">MIND</label>
        <button
          class="stat-btn"
          title="Hold Shift to remove 10"
          @click="onDecrement('mind', $event)"
          :disabled="mind <= 5"
        >-</button>
        <span class="stat-value">{{ mind }}</span>
        <button
          class="stat-btn"
          title="Hold Shift to add 10"
          @click="onIncrement('mind', $event)"
          :disabled="false"
        >+</button>
      </div>

      <div class="stat-derived">
        <span class="stat-label">Prowess</span>
        <span class="prowess-value">{{ prowess }}</span>
      </div>

      <div class="stat-derived">
        <span class="stat-label">Stat LP</span>
        <span class="stat-lp-value">{{ statLpSpent }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-allocator {
  padding: 12px 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-muted);
  min-width: 28px;
}

.stat-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-bg-skill);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: all 0.1s ease;
}

.stat-btn:hover:not(:disabled) {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: #fff;
}

.stat-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  min-width: 28px;
  text-align: center;
  color: var(--color-text);
}

.stat-effect {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-left: 2px;
}

.stat-derived {
  display: flex;
  align-items: center;
  gap: 6px;
}

.prowess-value,
.stat-lp-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-accent);
}
</style>
