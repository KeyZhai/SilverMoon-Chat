<script setup lang="ts"></script>

<template>
  <div class="drag-region">
    <slot><span class="_placeholder">_placeholder_</span></slot>
  </div>
</template>

<style scoped>
._placeholder {
  opacity: 0;
}
</style>
