<template>
  <div id="app" class="appFont mx-auto max-w-4xl sm:container">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Comfortaa|Open+Sans&display=swap");
.logo {
  font-family: "Comfortaa", cursive;
}

.appFont {
  /* font-family: "Open Sans", sans-serif; */
}

table,
th,
td {
  border: 0.5px solid #cbd5e0;
  padding: 5px;
}

blockquote {
  padding: 7px;
  margin: 10px 0 10px 0;
  border-left: 3px solid #2b6cb0;
}

img {
  margin: auto;
}

iframe {
  margin: auto;
}
</style>
