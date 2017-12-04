<template>
  <div class="detail">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(3)</h3>
        <ul>
          <li><span class="iconfont icon-notebook"></span> 笔记本1 <span>2</span> <span class="date">12月3日</span></li>
          <li><span class="iconfont icon-notebook"></span> 笔记本2 <span>10</span> <span class="date">11月10日</span></li>
          <li><span class="iconfont icon-notebook"></span> 笔记本1 <span>0</span> <span class="date">9月5日</span></li>
        </ul>       
      </div>

    </main>

  </div>
</template>

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

  ul, li {
    list-style: none;
  }

  main h3{
    font-size: 12px;
    color: #000;
  }

  main ul {
    margin-top: 10px;
    padding: 0 14px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main ul span {
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
  main li {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 0;
    cursor: pointer;
  }
  main li:hover {
    background-color: #f7fafd;
  }


</style>

