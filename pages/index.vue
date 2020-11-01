<template>
  <div class="container">
    <WeatherInfo />
  </div>
</template>

<script>
import WeatherInfo from "@/components/WeatherInfo.vue";

export default {
  components: {
    WeatherInfo,
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rebeccapurple;
}
</style>
