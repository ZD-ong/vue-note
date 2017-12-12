<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curNotebook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间 <i class="iconfont icon-down"></i></div>
      <div>标题 </div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/notebook/${curNotebook.id}/note/${note.id}`">
          <span class="date">{{note.friendlyDate}}</span>
          <span class="title">{{note.title}}</span>          
        </router-link>

      </li>
    </ul>
  </div>
</template>

<script>
  import fetch from '../helpers/fetch'
  import { friendlyDate } from '../helpers/util'
  import { Message } from 'element-ui'
  import bus from '../helpers/bus'
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'


  export default {
    data(){
      return {
      }
    },

    computed: {
      ...mapState([
        'notebooks',
        'notes',
        'curNotebook',
        'curNote'
      ])
    },

    // watch: {
    //   notebooks(){
    //     this.setCurrentBook({notebookId: this.$route.params.notebookId})
    //   }
    // },

    methods: {
      ...mapActions([
      ]),
      ...mapMutations([
        'setCurrentBook'
        ]),


      handleCommand(notebookId){
        console.log('handleCommand', notebookId)
        this.setCurrentBook({notebookId})
        this.$router.replace({ path: `/notebook/${this.curNotebook.id}/` })      
      }
    }
  }

</script>



<style lang="less" scoped>
.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    z-index: 1;
  }

  .el-dropdown {
    font-size: 18px;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    width: 200px;
  }

  .menu {
    display: flex;
    
    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont{
      font-size: 10px;
    }
  }

  .notes {
    li {
      
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}



</style>


