<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer'

export default {
  name:'App',
  components: {
    Header,
    Footer
  },
  mounted() {
     this.$store.dispatch("home/categoryList"); //使用命名空间后一定要指明是向哪个模块的服务员发送
  },
}
</script>

<style>

</style>
