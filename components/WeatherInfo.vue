<template>
  <div class="inner-container" v-cloak>
    <p v-if="temperature" class="temperature">{{ temperature.toFixed(1) }} C</p>
    <p class="city">{{ city }}</p>
    <p class="date">{{ date }}</p>
    <p class="weather">{{ weather.description }}</p>
    <img
      v-if="weather"
      :src="weatherIcon"
      :alt="weather.description"
      width="120"
      height="120"
    />
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
      date: "",
      sunset: "",
    };
  },
  methods: {
    appendMillis(inTs) {
      return inTs * 1000;
    },
  },
  mounted() {
    try {
      let success = async function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        await fetch(
          `https://api.weatherbit.io/v2.0/current?&key=${process.env.API_KEY}&lat=${lat}&lon=${lon}`
        )
          .then((response) => response.json())
          .then((data) => {
            const info = data.data[0];
            console.log(info);
            this.temperature = info.temp;
            this.city = info.city_name;
            this.weather = info.weather;
            this.sunrise = info.sunrise;
            this.sunset = info.sunset;
            this.date = new Date(this.appendMillis(info.ts));
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
  computed: {
    weatherIcon() {
      if (!this.weather) {
        return;
      }

      const fileName = this.weather.icon;

      return require(`../assets/${fileName}.png`); // the module request
    },
  },
};
</script>

<style lang="scss" scoped>
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