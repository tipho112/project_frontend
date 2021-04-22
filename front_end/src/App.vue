<template>
  <div id="app">
    <!-- <RecoinfoForm /> -->
    <!-- <CCTVInfoForm /> -->
    <CCTVGroupForm />
    <!-- <ControlGroupForm /> -->
    <!-- <RTSPInfoForm /> -->
    <!-- <FixReportForm /> -->
    <!-- <CameraHealthForm /> -->
  </div>
</template>

<script>
import RecoinfoForm from './components/RecodingInfo/RecoinfoForm.vue'

import CCTVInfoForm from './components/CCTV/CCTVInfoForm.vue'
import CCTVGroupForm from './components/CCTV/CCTVGroupForm.vue'
import ControlGroupForm from './components/CCTV/ControlGroupForm.vue'
import RTSPInfoForm from './components/CCTV/RTSPInfoForm.vue'
import FixReportForm from './components/CCTV/FixReportForm.vue'
import CameraHealthForm from './components/CCTV/CameraHealthForm.vue'


export default {
  name: 'App',
  components: {
    'RecoinfoForm': RecoinfoForm,
    'CCTVInfoForm': CCTVInfoForm,
    'ControlGroupForm': ControlGroupForm,
    'CCTVGroupForm': CCTVGroupForm,
    'RTSPInfoForm' : RTSPInfoForm,
    'CameraHealthForm' : CameraHealthForm,
    'FixReportForm' : FixReportForm,
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
