<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapState(['user']),
      ...mapGetters(['slug'])
    },
    methods: {
      ...mapMutations([
        'setUser',
        'unsetUser'
      ]),
    }
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>