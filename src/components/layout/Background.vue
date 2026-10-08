<template>
  <div class="layout-background">
    <div class="layout-background__layer" aria-hidden="true">
      <!-- 编辑背景内容的位置：可在此处使用 background slot 放置背景图形或装饰。 -->
      <slot name="background" />
    </div>

    <div class="layout-background__overlay" aria-hidden="true" />

    <div class="layout-background__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout-background {
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

.layout-background__layer,
.layout-background__overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

.layout-background__layer {
  z-index: 0;
  background-image: url('https://www.loliapi.com/acg/pc/');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.layout-background__overlay {
  z-index: 1;
  background-color: rgb(255 255 255 / 72%);
  pointer-events: none;
}

.layout-background.dark-mode .layout-background__overlay {
  background-color: rgba(75, 75, 75, 0.72);
}

.layout-background__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}
</style>
