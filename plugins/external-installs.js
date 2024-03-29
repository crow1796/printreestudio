import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import AreaLoader from '@/components/AreaLoader'
import PTForm from '@/components/PTForm'
import VeeValidate from 'vee-validate'
import VueCurrencyInput from 'vue-currency-input'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import LoaderImage from "~/assets/images/loader.gif"

Vue.use(VeeValidate)
Vue.component('simplebar', simplebar)
Vue.component('AreaLoader', AreaLoader)
Vue.use(VueTippy)
Vue.component("tippy", TippyComponent);
Vue.use(PTForm)
Vue.use(VueVirtualScroller)
const pluginOptions = {
  globalOptions: { currency: 'PHP' }
}
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(VueToast)

if (process.client) {
  require('vue2-animate/dist/vue2-animate.min.css')
  const VueProgressiveImage = require('vue-progressive-image').default
  const drr = require('@/components/Designer/drr').default
  const VueKonva = require('vue-konva')
  const vClickOutside = require('v-click-outside')
  const vue2Dropzone = require('vue2-dropzone')
  const VTooltip = require('v-tooltip').default
  require('vue2-dropzone/dist/vue2Dropzone.min.css')
  const ToggleButton = require('vue-js-toggle-button').default
  const VueNumber = require('vue-number-animation').default
  const StarRating = require('vue-star-rating')

  Vue.component('vue-dropzone', vue2Dropzone)
  Vue.component('drr', drr)
  Vue.use(VueNumber)
  Vue.use(ToggleButton)
  Vue.use(VTooltip)
  Vue.use(vClickOutside)
  Vue.use(VueKonva)
  Vue.use(VueProgressiveImage, {
    placeholder: LoaderImage,
    blur: 100
  })
  Vue.component('star-rating', StarRating)
}
