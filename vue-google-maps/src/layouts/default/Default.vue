<template>
  <v-app>
    <div id="app-container">
      <InfoContainer :searchList="searchList" @searchLocation="onSearchLocation" @filterLocation="onFilterLocation"
        @clearList="onClearList" @removeItem="onRemoveItem" />
      <MapContainer :searchText="searchText" :markerList="markerList" :searchTime="searchTime" :myLocation="myLocation" />
    </div>
  </v-app>
</template>

<script lang="ts">
import InfoContainer from '@/components/InfoContainer.vue';
import MapContainer from '@/components/MapContainer.vue';
import { LocationIF, DateTimeIF, SearchItemIF } from '@/interfaces/search';

export default {
  name: "DefaultComponent",
  components: {
    InfoContainer,
    MapContainer
  },
  data() {
    return {
      searchText: "" as string,
      searchList: [] as Array<SearchItemIF>,
      markerList: [] as Array<SearchItemIF>,
      searchTime: {} as DateTimeIF,
      myLocation: {} as LocationIF,
    };
  },
  methods: {
    onSearchLocation: function (result: { text: string, time: Date, places: any }) {
      if (result) {
        this.searchText = result.text;
        this.searchTime = {
          time: result.time.toLocaleTimeString(),
          date: result.time.toDateString(),
          gmt: result.time.toTimeString().split(' ')[1],
          timezone: '(' + result.time.toTimeString().split('(')[1],
        }
        this.searchList = result.places.map((item: any) => ({
          location: item,
          checked: true,
          value: 1
        }))
        this.markerList = this.searchList
      }
    },
    onFilterLocation: function (places: Array<SearchItemIF>) {
      console.info('places: ', places)
      if (places && places.length > 0) {
        this.markerList = places.filter((item) => (item.checked))
      }
    },
    onRemoveItem: function (index: number) {
      this.searchList = [...this.searchList.slice(0, index), ...this.searchList.slice(index + 1)]
      this.markerList = [...this.markerList.slice(0, index), ...this.markerList.slice(index + 1)]
    },
    onClearList: function () {
      this.searchList = []
      this.markerList = []
    },
  },
  mounted() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          this.myLocation = { lat: lat, lng: lng }
        },
        (error) => {
          console.error("Error getting user location:", error)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }
}
</script>

<style>
#app-container {
  display: flex;
  flex-direction: row;
}
</style>
