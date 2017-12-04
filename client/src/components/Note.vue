<template>
  <div class="detail">
    <note-sidebar></note-sidebar>
    <router-view></router-view>  
  </div>
  
</template>

<script>
  import NoteSidebar from '@/components/NoteSidebar'
  export default {
    components: {
      NoteSidebar
    }
  }
</script>

<style scoped>

.detail {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>