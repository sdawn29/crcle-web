<template>
  <center class="container p-20" style="width:900px">
    <img src="../assets/logo.png" alt width="150px" class="mt-12 mb-10" />
    <div
      class="text-lg text-red-700 bg-red-100 border-2 border-red-700 rounded p-2 font-bold"
    >You succesfully logged out</div>
  </center>
</template>

<script>
export default {
  created() {
    this.$session.destroy();
    this.$router.push("/");
  }
};
</script>

<style>
</style>