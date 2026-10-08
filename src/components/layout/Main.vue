<template>
  <main class="layout-main">
    <slot />
  </main>
</template>

<style scoped>
.layout-main {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  width: 100%;
}
</style>
