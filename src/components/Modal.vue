<template>
  <div
    v-if="visibleModal"
    class="fixed inset-0 transition-opacity z-[100] overflow-y-auto"
  >
    <div
      class="flex min-h-full bg-gray-700/50 items-center justify-center text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden text-left p-2 h-auto transition-all sm:my-8 sm:w-full mx-6 w-full max-w-2xl"
      >
        <img src="../assets/panaro.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["visibleModal"],
  data() {
    return {};
  },
};
</script>

<style scoped>
img {
  animation-name: panaro;
  animation-duration: 0.7s;
  animation-delay: 0.5s;
  animation-iteration-count: infinite;
  margin: 10px;
}

@keyframes panaro {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(5deg);
  }

  20% {
    transform: rotate(10deg);
  }

  30% {
    transform: rotate(15deg);
  }

  40% {
    transform: rotate(20deg);
  }

  50% {
    transform: rotate(25deg);
  }

  60% {
    transform: rotate(20deg);
  }

  70% {
    transform: rotate(15deg);
  }

  80% {
    transform: rotate(10deg);
  }

  90% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
