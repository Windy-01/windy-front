<template>
  <header class="layout-header">
    <slot />
  </header>
</template>

<style scoped>
.layout-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 10;
  width: 100%;
  margin-bottom: 24px;
  background-color: rgba(255, 255, 255, 0.312);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  animation: layout-fade-in 0.6s ease-out both;
}

:global(.dark-mode) .layout-header {
  background-color: rgb(15 23 42 / 31.2%);
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
  .layout-header {
    animation: none;
  }
}
</style>
