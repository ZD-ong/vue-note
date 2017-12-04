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
@import '//at.alicdn.com/t/font_496303_ex5pbak1digdgqfr.css';

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
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  background-color: #eee;
}


a {
  text-decoration: none;
}

ul, li{
  list-style: none;
}

.btn {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 2px 6px;
  background-color: #fff;
}


#app {


  display: flex;
  align-items: stretch;
}
</style>
