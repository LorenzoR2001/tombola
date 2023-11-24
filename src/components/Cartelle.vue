<template>
  <div class="flex flex-col">
    <h4 class="mb-4">Player {{ player }}</h4>
    <div class="grid grid-cols-9 grid-rows-3 w-80">
      <div
        class="border border-black p-2 text-center text-xs"
        v-for="(n, index) in 27"
      >
        <span :class="cartella[index] > 0 && !NumbersLeft?.includes(cartella[index]) ? 'bg-red-500 text-white rounded-full p-1' : ''">{{ cartella[index] > 0 ? cartella[index] : '' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["player", "cartella","NumbersLeft"],
  data() {
    return {};
  },
};
</script>
