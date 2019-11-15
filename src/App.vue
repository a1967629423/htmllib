<template>
  <div id="app">
    <div id="nav">
      <router-link to="/mask">遮罩</router-link>
      <router-link to="/transparentrect">透明方格</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <footer style="height:40px"></footer>
  </div>
</template>

<style lang="scss">
:root{
  --bg-color:#eee;
  --text-color:#2c3e50;
  --text-color-light:#42b983;
}
body,html{
  margin: 0;
  background-color: var(--bg-color);
  transition: .3s;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
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
    color: var(--text-color);
    margin:5px;

    &.router-link-exact-active {
      color: var(--text-color-light);
    }
  }
}
</style>
