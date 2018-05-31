<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Stomp from 'stompjs'
export default {
  name: 'App',
  created(){
    const ws = new WebSocket('ws://localhost:9090/sc-websocket')
    const wsclient = Stomp.over(ws)
    wsclient.connect(
      { login: 'H000001' },
      function connectCallback (frame) {
        // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
        wsclient.subscribe('/topic/subscribe', function (response) {
          console.log(response)
          // let returnData = JSON.parse(response.body)
          // console.log(returnData)
          // console.log(sc.$store.getters.username)
        })
        wsclient.send('/welcome', {}, JSON.stringify({ 'name': 'FOX' }))
      })
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  h1,h2,h3{
    font-family: 'Open Sans', sans-serif;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: calc(100%);
}
  body,span,input,label{
    font-family: 'Open Sans',sans-serif;
    overflow-y: hidden;
  }
  input,table{
    font-size: 0.9rem;
  }
</style>
