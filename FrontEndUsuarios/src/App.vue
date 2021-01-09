<template>

  <div id>
    <div id="nav">
      <router-link to="/login">login</router-link>|
      
    </div>
    <router-view/>
  
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {

  mounted(){
    //this.$router.push('/login');
    //alert("estoy en app")
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
