<template>
  <div id="app">
    <img class="sb-tp-logo" src="./assets/toilet-paper.svg"/>
    <div>
      <md-button class="md-primary md-raised" v-on:click="getBathroomsByLocation">Get safe bathrooms near me</md-button>
      or
      <md-field>
        <label>Initial Value</label>
        <md-input v-model="searchQuery"></md-input>
      </md-field>
      <div>
        <md-switch v-model="accessible">Accessible</md-switch>
        <md-switch v-model="genderNeutral">Gender Neutral</md-switch>
        <md-switch v-model="changingTable">Changing Table</md-switch>
      </div>
    </div>

    <div v-if="locationUnavailable">
      Unable to determine your location, try a location search instead
    </div>

    <div class="sb-bathroom-list">
      <Bathroom v-for="bathroom in bathrooms" :key="bathroom.id" :data="bathroom" />
    </div>


  </div>
</template>

<script>

import axios from 'axios';

import Bathroom from '@/components/Bathroom';

export default {
  name: "App",
  components: {
    Bathroom
  },
  data() {
    return {
      currentLocation: null,
      bathrooms: [],
      locationUnavailable: false,
      showLocationSearch: false,
      accessible: false,
      genderNeutral: false,
      changingTable: false,
      searchQuery: '',
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