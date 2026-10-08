<template>
  <Background :class="{ 'dark-mode': isDarkMode }">
    <template #background>
      <!-- 编辑背景内容的位置：在此插入页面专属背景内容。 -->
    </template>

    <Header>
      <div class="header-content">
        <strong>Windy</strong>
        <nav class="header-buttons" aria-label="页面按钮">
          <button type="button">button1</button>
          <button type="button">button2</button>
        </nav>
      </div>
    </Header>

    <div class="home-body">
      <div class="aside-slot" :class="{ 'is-collapsed': !isAsideExpanded }">
        <Aside
          :expanded="isAsideExpanded"
          @update:expanded="updateAsideExpanded"
        >
          <template #default="{ collapsed }">
            <nav class="side-navigation" aria-label="主页导航">
              <a href="#home">
                <span aria-hidden="true">⌂</span>
                <span v-if="!collapsed">首页</span>
              </a>
              <a href="#features">
                <span aria-hidden="true">◇</span>
                <span v-if="!collapsed">功能</span>
              </a>
              <a href="#about">
                <span aria-hidden="true">○</span>
                <span v-if="!collapsed">关于</span>
              </a>
            </nav>
          </template>
          <template #footer="{ collapsed }">
            <button
              class="theme-toggle"
              type="button"
              :aria-label="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'"
              :title="isDarkMode ? '亮色模式' : '暗色模式'"
              @click="toggleDarkMode"
            >
              <span aria-hidden="true">{{ isDarkMode ? '☀' : '☾' }}</span>
              <span v-if="!collapsed">{{ isDarkMode ? '亮色模式' : '暗色模式' }}</span>
            </button>
          </template>
        </Aside>
      </div>

      <DocumentMain class="home-document-main">
        <!-- 翻页测试内容：可删除整个区域。 -->
        <div class="page-test" aria-label="翻页测试内容">
          <div v-for="column in testColumns" :key="column" class="page-test__column">
            <span v-for="row in testRows" :key="`${column}-${row}`">1</span>
          </div>
        </div>
      </DocumentMain>
    </div>

    <button
      class="back-to-top"
      :class="{ 'is-visible': isBackToTopVisible }"
      type="button"
      aria-label="回到顶部"
      title="回到顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </Background>
</template>

<script setup lang="ts">
import Background from './components/layout/Background.vue'
import Aside from './components/layout/Aside.vue'
import DocumentMain from './components/layout/DocumentMain.vue'
import Header from './components/layout/Header.vue'

import { onMounted, onUnmounted, ref } from 'vue'

const themeStorageKey = 'windy-theme'
const asideStorageKey = 'windy-aside-expanded'
const testColumns = 4
const testRows = 32

function readAsideExpanded() {
  const savedAsideExpanded = window.localStorage.getItem(asideStorageKey)
  const savedAsideCollapsed = window.localStorage.getItem('windy-aside-collapsed')

  return savedAsideExpanded !== null
    ? savedAsideExpanded === 'true'
    : savedAsideCollapsed !== 'collapsed'
}

const isAsideExpanded = ref(readAsideExpanded())
const isDarkMode = ref(false)
const isBackToTopVisible = ref(false)

function updateAsideExpanded(expanded: boolean) {
  isAsideExpanded.value = expanded
  window.localStorage.setItem(asideStorageKey, String(expanded))
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  window.localStorage.setItem(themeStorageKey, isDarkMode.value ? 'dark' : 'light')
}

function updateBackToTopVisibility() {
  isBackToTopVisible.value = window.scrollY > 0
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  isDarkMode.value = window.localStorage.getItem(themeStorageKey) === 'dark'
  updateBackToTopVisibility()
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateBackToTopVisibility)
})
</script>

<style scoped>
.header-content {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid rgb(15 23 42 / 10%);
  color: #1e293b;
}

.header-buttons {
  position: absolute;
  left: 50%;
  display: flex;
  height: 64px;
  transform: translateX(-50%);
}

.header-buttons button {
  position: relative;
  min-width: 136px;
  height: 64px;
  padding: 0 32px;
  border: 0;
  border-right: 1px solid transparent;
  background-color: transparent;
  color: #334155;
  cursor: pointer;
  font: inherit;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
}

.header-buttons button:hover {
  background: radial-gradient(
    ellipse at center,
    rgb(255 255 255 / 62%) 0%,
    rgb(255 255 255 / 28%) 42%,
    transparent 78%
  );
  box-shadow: inset 0 0 18px rgb(255 255 255 / 36%);
  color: #0f172a;
}

.header-buttons button:last-child {
  border-right-color: transparent;
}

.home-body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  width: 96%;
  margin: 88px auto 0;
  padding: 0 24px 24px;
}

.home-document-main {
  flex: 0 0 auto;
  flex-shrink: 0;
  margin: 0;
}

.aside-slot {
  flex: 0 0 240px;
  width: 240px;
  min-height: calc(100vh - 112px);
  transition:
    flex-basis 0.25s ease,
    width 0.25s ease;
}

.aside-slot.is-collapsed {
  flex-basis: 64px;
  width: 64px;
}

.side-navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 12px;
}

.side-navigation a {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  color: #334155;
  text-decoration: none;
  white-space: nowrap;
}

.side-navigation a:hover {
  background-color: rgb(255 255 255 / 55%);
}

.side-navigation a span:first-child {
  flex: 0 0 16px;
  text-align: center;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 0 24px;
  border: 0;
  border-top: 1px solid rgb(15 23 42 / 10%);
  background-color: transparent;
  color: #334155;
  cursor: pointer;
  font: inherit;
  text-align: left;
  white-space: nowrap;
}

.theme-toggle:hover {
  background-color: rgb(255 255 255 / 55%);
}

.theme-toggle span:first-child {
  flex: 0 0 16px;
  text-align: center;
}

:global(.dark-mode) .header-content,
:global(.dark-mode) .page-test {
  color: #e2e8f0;
}

:global(.dark-mode) .header-content {
  border-bottom-color: rgb(255 255 255 / 12%);
}

:global(.dark-mode) .header-buttons button {
  color: #cbd5e1;
}

:global(.dark-mode) .header-buttons button:hover {
  background: radial-gradient(
    ellipse at center,
    rgb(15 23 42 / 62%) 0%,
    rgb(15 23 42 / 28%) 42%,
    transparent 78%
  );
  box-shadow: inset 0 0 18px rgb(15 23 42 / 36%);
  color: #f8fafc;
}

:global(.dark-mode) .side-navigation a {
  color: #cbd5e1;
}

:global(.dark-mode) .side-navigation a:hover,
:global(.dark-mode) .theme-toggle:hover {
  background-color: rgb(15 23 42 / 55%);
}

:global(.dark-mode) .theme-toggle {
  border-top-color: rgb(255 255 255 / 12%);
  color: #cbd5e1;
}

.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 11;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: 50%;
  background-color: rgb(255 255 255 / 72%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px rgb(15 23 42 / 18%);
  color: #334155;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  transform: scale(0);
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
}

.back-to-top.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.back-to-top:hover {
  background-color: rgb(255 255 255 / 90%);
  transform: scale(1) translateY(-2px);
}

:global(.dark-mode) .back-to-top {
  border-color: rgb(255 255 255 / 12%);
  background-color: rgb(15 23 42 / 72%);
  color: #e2e8f0;
}

:global(.dark-mode) .back-to-top:hover {
  background-color: rgb(30 41 59 / 90%);
}

.page-test {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  min-height: 1200px;
  color: #1e293b;
  font-size: 1.25rem;
  line-height: 2;
  text-align: center;
}

.page-test__column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 640px) {
  .home-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 0 16px 16px;
  }

  .home-document-main {
    width: 100%;
    margin: 0;
  }

  .aside-slot,
  .aside-slot.is-collapsed {
    flex: 0 0 auto;
    width: 100%;
    min-height: 0;
  }

  .page-test {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .back-to-top {
    right: 16px;
    bottom: 16px;
  }
}
</style>
