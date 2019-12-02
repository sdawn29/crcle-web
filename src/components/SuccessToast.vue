<template>
  <div class="fixed bottom-0 inset-x-0">
    <center class="px-4 py-3 rounded bg-green-600 mx-auto my-5 font-semibold max-w-xs text-white">
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