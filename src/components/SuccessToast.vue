<template>
  <div class="absolute bottom-0 inset-x-0">
    <center class="px-4 py-3 rounded bg-green-700 mx-auto my-5 font-semibold max-w-xs">
      <i class="fas fa-check-circle"></i>
      {{msg}}
    </center>
  </div>
</template>

<script>
export default {
  name: "SuccessToast",
  props: ["msg"]
};
</script>

<style>
</style>