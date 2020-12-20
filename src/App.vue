<template>
  <div id="app">
    <div class="sb-location-toolbar">
      <md-button
        class="md-primary md-raised"
        v-on:click="getBathroomsByLocation"
        >Use Current Location</md-button
      >
      <md-button
        class="md-primary md-raised"
        v-on:click="showLocationSearch = true"
        >Enter A Location</md-button
      >
    </div>
    <div>
    <form novalidate class="md-layout" @submit.prevent="getBathroomsByAddress">
      <md-field v-if="showLocationSearch">
        <label>Enter an address</label>
        <md-input v-model="searchQuery"></md-input>
        <md-button type="submit" class="md-primary" :disabled="sending"
          >Search</md-button
        >
      </md-field>
      </form>
    </div>
    <div v-if="locationUnavailable">
      Unable to determine your location, try a location search instead
    </div>
    <div class="sb-filter-toolbar">
      <div>
        <md-switch v-model="accessible">Accessible</md-switch>
        <md-switch v-model="genderNeutral">Gender Neutral</md-switch>
        <md-switch v-model="changingTable">Changing Table</md-switch>
      </div>
    </div>
    <div class="sb-results">
      <md-progress-spinner
        v-if="loading"
        class="sb-list-loading"
        md-mode="indeterminate"
      ></md-progress-spinner>
      <div v-if="!loading" class="sb-bathroom-list">
        <Bathroom
          v-for="bathroom in bathrooms"
          :key="bathroom.id"
          :data="bathroom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Bathroom from "@/components/Bathroom";

export default {
  name: "App",
  components: {
    Bathroom
  },
  data() {
    return {
      accessible: false,
      bathrooms: [],
      changingTable: false,
      currentLocation: null,
      genderNeutral: false,
      loading: false,
      locationUnavailable: false,
      searchQuery: "",
      sending: false,
      showLocationSearch: false,
    };
  },
  created() {
    // this.getBathroomsByLocation();
  },
  methods: {
    getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    async getBathroomsByLocation() {
      this.loading = true;

      if(!this.currentLocation) {
        try {
          const position = await this.getPosition();
          this.currentLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          this.locationUnavailable = false;
        } catch (err) {
          this.locationUnavailable = true;
          this.loading = false;
          return;
        }
      }

      axios
        .get(`https://www.refugerestrooms.org/api/v1/restrooms/by_location`, {
          params: {
            lat: this.currentLocation.lat,
            lng: this.currentLocation.lon
          }
        })
        .then(response => {
          this.loading = false;
          this.bathrooms = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    async getBathroomsByAddress() {
      this.loading = true;


      const query = this.searchQuery;
      console.log(this.searchQuery)
      axios
        .get(`http://api.positionstack.com/v1/forward?access_key=${process.env.VUE_APP_GEOCODER_API_KEY}&query=${query}&limit=1`)
        .then(response => {
          this.loading = false;

          this.bathrooms = {
            lat: response.data.data[0].latitude,
            lng: response.data.data[0].longitude
          };

           this.getBathroomsByLocation();
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  computed: {
    computedIncidents() {
      return this.bathrooms;
    }
  }
};
</script>
