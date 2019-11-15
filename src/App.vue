<template>
  <div id="app">
    <div id="nav">
      <router-link to="/transparentrect">透明方格</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body,html{
  margin: 0;
  background-color: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#nav {
  flex: none;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin:5px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
