<template>
  <div class="w-full top-0 left-0 h-full bg-white z-topmost items-center justify-center flex"
    :class="{ 'absolute': !fullscreen, 'fixed': fullscreen }">
    <div class="flex flex-col justify-center items-center">
      <img src="~/assets/images/loader.svg"/>
      <span class="font-bold" v-if="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullscreen: {
      type: Boolean
    },
    text: {
      type: String,
      default: "Loading..."
    }
  }
}
</script>
