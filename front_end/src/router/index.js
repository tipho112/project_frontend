import Vue from 'vue'
import Router from 'vue-router'

import RecoinfoForm from '@/components/RecodingInfo/RecoinfoForm'

import CCTVInfoForm from "@/components/CCTV/CCTVInfoForm"
import CCTVGroupForm from "@/components/CCTV/CCTVGroupForm"
import ControlGroupForm from "@/components/CCTV/ControlGroupForm"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecoinfoForm',
      component: RecoinfoForm
    },
    {
      path: '/',
      name: 'CCTVInfoForm',
      component: CCTVInfoForm
    },
    {
      path: '/',
      name: 'CCTVGroupForm',
      component: CCTVGroupForm
    },
    {
      path: '/',
      name: 'ControlGroupForm',
      component: ControlGroupForm
    }
  ]
})
