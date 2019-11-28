<template>
  <div class="relative mt-2">
    <div class="relative z-10 flex rounded w-40 flex justify-between">
      <div></div>
      <div @click="menu = !menu">
        <button
          class="font-bold text-sm mx-auto cursor-pointer py-2 px-4 border hover:bg-gray-900 rounded outline-none"
          v-if="!user.isAdmin"
        >{{ user.username }}</button>
        <button
          class="font-bold text-sm mx-auto cursor-pointer py-2 px-4 border border-purple-500 text-purple-500 hover:bg-gray-900 rounded outline-none"
          v-if="user.isAdmin"
        >{{ user.username }}</button>
      </div>
    </div>
    <div
      v-if="menu"
      @click="menu = false"
      class="fixed inset-0 h-full w-full cursor-default outline-none"
    ></div>
    <div class="font-semibold text-sm absolute bg-gray-900 rounded" style="width:100%" v-if="menu">
      <div class="uppercase font-bold tracking-wider p-2" style="font-size:10px">My stuff</div>
      <div class="block hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
        <i class="fas fa-user mr-4 text-sm"></i>My Profile
      </div>
      <div class="block hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
        <i class="fas fa-circle mr-4 text-sm"></i>My Crcles
      </div>

      <div class="uppercase font-bold tracking-wider p-2" style="font-size:10px">others</div>
      <div class="block hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
        <i class="fas fa-cog mr-4 text-sm"></i>Settings
      </div>
      <div class="block hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
        <i class="fas fa-bookmark mr-4 text-sm"></i>Saved Posts
      </div>
      <hr class="text-gray-800" />
      <div
        class="block hover:bg-red-700 hover:text-white px-4 py-2 cursor-pointer"
        @click="$router.push({name: 'logout'})"
      >
        <i class="fas fa-sign-out-alt text-sm mr-4"></i>Logout
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$session.get("user");
    }
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>

<style>
</style>