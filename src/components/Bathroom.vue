<template>
    <md-card class="sb-bathroom-card">
        <md-card-header>{{data.name}}</md-card-header>
        <md-card-content>
            <p>{{data.comment ? data.comment : 'No description available.'}}</p>
            <div>
                <md-chip v-if="data.accessible">Accessible</md-chip>
            </div>
        </md-card-content>
        <md-divider></md-divider>
        <md-card-actions class="sb-bathroom-card-actions">
            <md-button>Directions</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: "Bathroom",
  props: {
    data: Object
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
</style>
