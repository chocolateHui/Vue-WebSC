<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  h1,h2,h3{
    font-family: 'Open Sans', sans-serif;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: calc(100%);
}
  body{
    font-family: 'Open Sans',sans-serif;
    overflow-y: hidden;
  }
</style>
