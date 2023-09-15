<template>
  <v-app>
    <div id="app-container">
      <div id="info-container">
        <InfoContainer :searchList="searchList" @searchLocation="onSearchLocation" />
      </div>
      <div id="map-container">
        <MapContainer :searchText="defaultText" />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import InfoContainer from '@/components/InfoContainer.vue';
import MapContainer from '@/components/MapContainer.vue';

export default {
  name: "DefaultComponent",
  components: {
    InfoContainer,
    MapContainer
  },
  data() {
    return {
      defaultText: "Hello",
      searchList: [
        {
          location: "Location 1",
          image:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
          selected: true,
        },
        {
          location: "Location 2",
          image:
            "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
          selected: false,
        },
      ]
    };
  },
  methods: {
    onSearchLocation(text: string) {
      this.defaultText = text;
    }
  }
}
</script>

<style>
#app-container {
  display: flex;
  flex-direction: row;
}

#info-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#map-container {
  width: 60%;
}
</style>
