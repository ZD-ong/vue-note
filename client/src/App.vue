<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view></router-view>  
  </div>
</template>

<script>

import sidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: {
    sidebar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
}


a {
  text-decoration: none;
}

#app {


  display: flex;
  align-items: stretch;
}
</style>
