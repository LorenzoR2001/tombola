<template>
  <div>
    <ul class="text-3xl gap-y-8 flex flex-col text-center">
      <li><Logo /></li>
      <li class="title">
        <router-link :to="{ name: 'Game' }">Single Player</router-link>
      </li>
      <li class="title">Multiplayer</li>
      <li class="title">Classifiche</li>
      <li class="title">Crediti</li>
    </ul>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  components: { Logo },
};
</script>

<style lang="scss" scoped>
ul > li:hover {
  color: red;
  cursor: pointer;
  font-size: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.title {
  border: 1px solid black;
  background-color: gainsboro;
  padding: 20px;
}
</style>
