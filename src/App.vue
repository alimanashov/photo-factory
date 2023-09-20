<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="app">
    <div class="app-header">
      <NavBar />
    </div>
    <div class="app-body">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
