<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/notebook/1" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link> 
    </div> 
  </div>
</template>

<script>
  import avatar from '@/components/Avatar'
  
  export default {
    components: {
      avatar
    }
  }
</script>

<style lang="less" scoped>

#sidebar {
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;

  a {
    padding: 6px 0;
    display: block;
  }

  .router-link-active {
    background-color: #5e6266;
  }
}

.iconfont {
  color: #fff;
}
</style>
