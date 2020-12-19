<template>
  <div id="app">
    <div>
      <md-button class="md-primary md-raised" v-on:click="getBathroomsByLocation">Get safe bathrooms near me</md-button>
    <ul id="example-1">
      <li v-for="bathroom in bathrooms" :key="bathroom.id">
        {{ bathroom.name }}
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "App",
  components: {
 
  },
  data() {
    return {
      currentLocation: null,
      bathrooms: [],
    };
  },
  created() {
    //this.getBathroomsByLocation();
  },
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      });
    },
     async getBathroomsByLocation(){
      try {
          const position = await this.getPosition();
          this.currentLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }   
      } catch (err) {
        console.log(err);
      }

      axios.get(`https://www.refugerestrooms.org/api/v1/restrooms/by_location`, {
        params: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lon
        }
      })
      .then(response => {
        this.bathrooms = response.data;
        console.log(response.data);
      })
      .catch(e => {
        this.errors.push(e)
        console.log(e);
      })
    },
  },
  computed: {
    computedIncidents() {
      return this.bathrooms;
    },
  },
};
</script>

<style>

</style>
