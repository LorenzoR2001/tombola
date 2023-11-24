<template>
  <div
    v-if="visibleModalNumber"
    class="fixed inset-0 transition-opacity z-[100] overflow-y-auto"
  >
    <div
      class="flex min-h-full bg-gray-700/50 items-center justify-center text-center flex-col"
    >
      <img :src="'../public/players/' + currentNumber+'.png'" class="" />
      <span class="text shadow-xl font-bold">{{ currentNumber }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["visibleModalNumber", "currentNumber"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.text {
  background-color: #ecb67b;
  border-radius: 50%;
  border: #d41e2a 8px solid;
  padding: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 50px;
  color: #d41e2a;
}
</style>
