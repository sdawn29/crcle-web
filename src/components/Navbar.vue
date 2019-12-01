<template>
  <nav class="flex justify-between">
    <div @click="$router.push({name: 'home'})" class="logo text-3xl font-bold cursor-pointer">
      <span>crcle</span>
      <span class="text-blue-500 text-4xl">.</span>
    </div>
    <div v-if="!this.$session.exists()">
      <div
        @click="$router.push({name: 'login'})"
        class="mt-2 font-semibold text-gray-600 hover:text-gray-800 cursor-pointer inline-block"
      >Login</div>
      <div
        @click="$router.push({name: 'signup'})"
        class="mt-2 font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer inline-block ml-3 px-4 py-2 rounded shadow text-white"
      >Sign Up</div>
    </div>
    <UserDropdown v-if="this.$session.exists()" />
  </nav>
</template>

<script>
import UserDropdown from "../components/UserDropdown.vue";
export default {
  components: {
    UserDropdown
  }
};
</script>

<style>
</style>