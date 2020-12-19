<template>
  <div id="app">
    <img class="sb-tp-logo" src="./assets/toilet-paper.svg"/>
    <div>
      <md-button class="md-primary md-raised" v-on:click="getBathroomsByLocation">Get safe bathrooms near me</md-button>
      or
      <md-field>
        <label>Initial Value</label>
        <md-input v-model="initial"></md-input>
      </md-field>
      <div>
        <md-switch v-model="accessible">Accessible</md-switch>
        <md-switch v-model="genderNeutral">Gender Neutral</md-switch>
        <md-switch v-model="changingTable">Changing Table</md-switch>
      </div>
    <ul>
      <li v-for="bathroom in bathrooms" :key="bathroom.id">
        {{ bathroom.name }}
      </li>
    </ul>
    </div>

    <div v-if="locationUnavailable">
      Unable to determine your location, try a location search instead
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
      locationUnavailable: false,
      showLocationSearch: false,
      accessible: false,
      genderNeutral: false,
      changingTable: false
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
          this.locationUnavailable = false;
      } catch (err) {
        this.locationUnavailable = true;
        return;
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