<template>
  <div id="app">
    <!-- <RecoinfoForm /> -->
    <!-- <CCTVInsertForm /> -->
    <CCTVGroupForm />
    <!-- <ControlGroupForm /> -->
  </div>
</template>

<script>
import RecoinfoForm from './components/RecodingInfo/RecoinfoForm.vue'

import CCTVInsertForm from './components/CCTV/CCTVInsertForm.vue'
import CCTVGroupForm from './components/CCTV/CCTVGroupForm.vue'
import ControlGroupForm from './components/CCTV/ControlGroupForm.vue'

export default {
  name: 'App',
  components: {
    'RecoinfoForm': RecoinfoForm,
    'CCTVInsertForm': CCTVInsertForm,
    'ControlGroupForm': ControlGroupForm,
    'CCTVGroupForm': CCTVGroupForm
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
