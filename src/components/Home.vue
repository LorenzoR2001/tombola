<template>
  <div class="relative">
    <img src="../assets/sonofelicissimo.jpg" class="w-full" />
    <div class="absolute right-96 top-40">
      <Menu />
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
export default {
  components: { Menu },
};
</script>

<style lang="scss" scoped></style>
