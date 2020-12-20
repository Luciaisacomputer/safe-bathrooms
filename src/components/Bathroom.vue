<template>
    <md-card class="sb-bathroom-card">
        <md-card-header class="md-title">{{data.name}}</md-card-header>
        <md-card-content>
            <span class="sb-bathroom-card-label">Description</span>
            <p>{{ data.comment ? data.comment : 'No description available.' }}</p>
            <span class="sb-bathroom-card-label">Directions</span>
            <p>{{ data.directions ? data.directions : 'No directions available.' }}</p>
            <span class="sb-bathroom-card-label">Address</span>
            <p>{{data.street}} {{data.city}}, {{data.state}}</p>
            <span class="sb-bathroom-card-label">Distance</span>
            <p>{{getDistanceString}} mi.</p>
            <div>
                <span class="sb-bathroom-card-label">Tags</span>
                <md-chip class="sb-bathroom-card-chip" v-if="data.accessible">Accessible</md-chip>
                <md-chip class="sb-bathroom-card-chip" v-if="data.unisex">Gender Neutral</md-chip>
                <md-chip class="sb-bathroom-card-chip" v-if="data.changing_table">Changing Table</md-chip>
            </div>
        </md-card-content>
        <md-divider></md-divider>
        <md-card-actions class="sb-bathroom-card-actions">
            <md-button target="_blank" :href="`https://www.google.com/maps/dir/?api=1&W&destination=${data.name}`">Get Directions</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: "Bathroom",
  props: {
    data: Object
  },
  computed: {
    getDistanceString() {
        return this.data.distance.toString().substring(0,3);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sb-bathroom-card {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    width: 100%;
    margin: 16px;
}

.sb-bathroom-card-actions {
    margin-top: auto;
}

.sb-bathroom-card-label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

.sb-bathroom-card-chip {
    margin-bottom: 4px;
}
</style>
