<template>
  <div class="note-sidebar">
    <h3>全部笔记 <i class="iconfont icon-down"></i></h3>
    <div class="menu">
      <div>更新时间 <i class="iconfont icon-down"></i></div>
      <div>标题 </div>
    </div>
    <ul>
      <li>
        <span class="date">2017年10月10日 12:33</span>
        <span class="title">心情记录</span>
      </li>
      <li>
        <span class="date">2017年10月10日 12:33</span>
        <span class="title">心情记录</span>
      </li>
      <li>
        <span class="date">2017年10月10日 12:33</span>
        <span class="title">心情记录</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.note-sidebar {
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;
}
h3 {
  font-size: 18px;
  color: #666;
  height: 45px;
  line-height: 45px;
  font-weight: normal;
  text-align: center;
  border-bottom: 1px solid #ccc;
  background-color: #f7f7f7;
}
.menu {
  display: flex;
}
.menu div {
  font-size: 12px;
  padding: 2px 10px;
  flex: 1;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.menu div:last-child {
  border-right: none;
}
.menu .iconfont{
  font-size: 10px;
}

li {
  font-size: 12px;
  padding: 4px 0;
  display: flex;
}
li:nth-child(odd) {
  background-color: #f2f2f2;
}
li span {
  padding: 0 10px;
  flex: 1;
}

</style>