<template>
  <div class="container">
    <div class="inner-container" v-cloak>
      <p v-if="temperature" class="temperature">{{ temperature }} C</p>
      <p class="city">{{ city }}</p>
      <p class="weather">{{ weather.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: "",
      city: "",
      weather: "",
      sunrise: "",
      sunset: "",
    };
  },
  mounted() {
    try {
      let success = async function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        await fetch(
          `https://api.weatherbit.io/v2.0/current?&key=7272755a0c7e408eaa20038a2a5a6698&lat=${lat}&lon=${lon}`
        )
          .then((response) => response.json())
          .then((data) => {
            const info = data.data[0];
            console.log(info.temp);
            this.temperature = info.temp;
            this.city = info.city_name;
            this.weather = info.weather;
            this.sunrise = info.sunrise;
            this.sunset = info.sunset;
          });
      };
      let failure = function (e) {
        console.log(e);
      };
      navigator.geolocation.getCurrentPosition(
        success.bind(this),
        failure.bind(this)
      );
    } catch (e) {
      console.log(e);
    }
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

.inner-container {
  text-align: center;
}

p.temperature {
  font-size: 4rem;
}

p.city {
  font-size: 3rem;
}

[v-cloak] {
  display: none;
}
</style>
