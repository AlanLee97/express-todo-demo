<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Todo from './pages/todo/Todo.vue'

export default {
  name: 'App',
  components: {
    // Todo
  },

  created () {
    this.checkIsLogin();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  margin: 0;
  padding: 0;
}
</style>
