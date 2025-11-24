<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorageValue } from "./useLocalStorageValue";
const storageKey = ref("my-value");

const random = () => Math.floor(Math.random() * 100);
const options = ref({ syncTabs: true });
const { value: randomValue } = useLocalStorageValue(
  storageKey,
  random(),
  options
);
</script>

<template>
  <h1>Random value persister</h1>
  <h2>{{ randomValue }}</h2>
  <p>Key: <input v-model="storageKey" /></p>
  <button @click="randomValue = random()">Generate!</button>
  <p>Options: <input v-model="options.syncTabs" type="checkbox" /></p>
</template>

<style scoped></style>
