<template>
  <aside class="layout-aside" :class="{ 'is-collapsed': collapsed }">
    <button
      class="layout-aside__toggle"
      type="button"
      :aria-expanded="!collapsed"
      :aria-label="collapsed ? '展开侧边栏' : '折叠侧边栏'"
      @click="toggle"
    >
      <span aria-hidden="true">{{ collapsed ? '›' : '‹' }}</span>
    </button>

    <div class="layout-aside__content">
      <slot :collapsed="collapsed" />
    </div>

    <div class="layout-aside__footer">
      <slot name="footer" :collapsed="collapsed" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ expanded?: boolean }>(), {
  expanded: true,
})

const emit = defineEmits<{
  'update:expanded': [value: boolean]
  toggle: [value: boolean]
}>()

const collapsed = computed(() => !props.expanded)

function toggle() {
  const nextValue = !props.expanded
  emit('update:expanded', nextValue)
  emit('toggle', nextValue)
}
</script>

<style scoped>
.layout-aside {
  position: fixed;
  top: 88px;
  left: 24px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: calc(100vh - 112px);
  align-self: flex-start;
  flex-shrink: 0;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 45%);
  border-radius: 16px;
  background-color: rgb(255 255 255 / 42%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 16px 40px rgb(15 23 42 / 10%);
  transition:
    flex-basis 0.25s ease,
    width 0.25s ease;
  animation: layout-fade-in 0.7s ease-out 0.1s both;
}

.layout-aside.is-collapsed {
  flex-basis: 64px;
  width: 64px;
}

.layout-aside__toggle {
  display: grid;
  flex: 0 0 40px;
  place-items: center;
  align-self: flex-end;
  width: 40px;
  margin: 12px 12px 8px;
  border: 0;
  border-radius: 10px;
  background: rgb(255 255 255 / 55%);
  color: #334155;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  transition: background-color 0.2s ease;
}

.layout-aside__toggle:hover {
  background: rgb(255 255 255 / 85%);
}

.layout-aside__content {
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.layout-aside__footer {
  flex: 0 0 auto;
  margin-top: auto;
}

:global(.dark-mode) .layout-aside {
  border-color: rgb(255 255 255 / 12%);
  background-color: rgb(15 23 42 / 42%);
  box-shadow: 0 16px 40px rgb(0 0 0 / 28%);
  color: #e2e8f0;
}

:global(.dark-mode) .layout-aside__toggle {
  background-color: rgb(15 23 42 / 55%);
  color: #e2e8f0;
}

:global(.dark-mode) .layout-aside__toggle:hover {
  background-color: rgb(15 23 42 / 85%);
}

@keyframes layout-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layout-aside {
    animation: none;
  }
}

@media (max-width: 768px) {
  .layout-aside {
    position: relative;
    top: auto;
    left: auto;
    z-index: auto;
    width: 100%;
    height: auto;
  }

  .layout-aside.is-collapsed {
    flex-basis: 64px;
    width: 64px;
  }
}
</style>
