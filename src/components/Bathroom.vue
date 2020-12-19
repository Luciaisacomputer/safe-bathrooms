<template>
    <md-card>
        <md-card-header>{{data.name}}</md-card-header>
        <md-card-content>
            {{data.comment}}
            <md-chip v-if="data.accessible">Accessible</md-chip>
        </md-card-content>
        <md-card-actions>
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

</style>
