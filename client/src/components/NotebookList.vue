<template>
  <div class="detail">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(3)</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="">
            <span class="iconfont icon-notebook"></span> {{notebook.title}} <span>2</span> <span class="date">{{notebook.date}}</span>
          </router-link>
        </div>       
      </div>

    </main>

  </div>
</template>

<script>
  
  export default {
    data(){
      return {
        notebooks: [  
          {title: '我的笔记本11', date: '12月3日'},
          {title: '我的笔记本22', date: '12月3日'},
          {title: '我的笔记本33', date: '12月3日'}
         ]
      }
    }
  }

</script>


<style scoped>
  .detail {
    flex: 1;
  }
  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  header .btn {
    font-size: 12px;
    color: #666;
  }
  header .btn .iconfont {
    font-size: 12px;
  }

  main {
    padding: 30px 40px;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }


  main h3{
    font-size: 12px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    padding: 0 14px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }
  main .date {
    float: right;
  }
  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }
  main a {
    display: block;
    border-bottom: 1px solid #ebebeb;
    padding: 12px 0;
    cursor: pointer;
  }
  main a:hover {
    background-color: #f7fafd;
  }


</style>

