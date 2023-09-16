<template>
    <v-container id="map-container">
        <div class="text-h4 pl-3">Google Map</div>
        <div class="text-body-1 pl-4" v-if="thisText">Latest search: {{ thisText }} </div>
        <div class="text-body-1 pl-4" v-if="thisTime?.time">
            Local time:
            {{ thisTime?.time }}
            {{ thisTime?.date }}
            {{ thisTime?.gmt }}
            {{ thisTime?.timezone }}
        </div>
        <v-container>
            <div id="vue-map"></div>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import { LocationIF, DateTimeIF, SearchItemIF } from '@/interfaces/search';

export default {
    name: "Map Container",
    props: {
        searchText: String,
        markerList: Array<SearchItemIF>,
        searchTime: {
            type: Object as () => DateTimeIF,
        },
        myLocation: {
            type: Object as () => LocationIF
        },
    },
    data() {
        return {
            loader: null as any,
            map: null as any,
            thisText: this.searchText,
            thisList: this.markerList,
            thisTime: this.searchTime,
            myPlace: { lat: this.myLocation?.lat, lng: this.myLocation?.lng },
        }
    },
    watch: {
        searchText: function (newValue, oldValue) {
            this.thisText = newValue ? newValue : oldValue;
            this.$emit('addLocation', {
                location: newValue,
                selected: true
            })
        },
        markerList: function (newValue, _) {
            this.thisList = newValue
            if (newValue.length > 0) {
                const loader2 = this.loader as Loader
                loader2
                    .load()
                    .then((google) => {
                        let markers: any[] = []
                        const map = new google.maps.Map(
                            document.getElementById("vue-map") as HTMLElement,
                            {
                                center: this.myPlace,
                                zoom: 13,
                                mapTypeId: 'roadmap',
                            }
                        )
                        const bounds = new google.maps.LatLngBounds();
                        newValue.forEach((place: any) => {
                            if (!place.location.geometry || !place.location.geometry.location) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            const icon = {
                                url: place.location.icon as string,
                                size: new google.maps.Size(30, 30),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25),
                                fillColor: place.location.icon_background_color
                            }
                            markers.push(
                                new google.maps.Marker({
                                    map,
                                    icon,
                                    title: place.location.name,
                                    position: place.location.geometry.location
                                })
                            );
                            if (place.location.geometry.viewport) {
                                bounds.union(place.location.geometry.viewport);
                            } else {
                                bounds.extend(place.location.geometry.location);
                            }
                        })
                        map.fitBounds(bounds);
                    })
                    .catch(error => {
                        alert(error)
                    });
            }
        },
        searchTime: function (newValue, _) {
            this.thisTime = newValue
        },
        myLocation: function (newValue, _) {
            this.myPlace = { lat: newValue?.lat, lng: newValue?.lng }
            const thisLoader = this.loader as Loader
            thisLoader
                .load()
                .then((google) => {
                    this.map = new google.maps.Map(
                        document.getElementById("vue-map") as HTMLElement,
                        {
                            center: this.myPlace,
                            zoom: 13,
                            mapTypeId: 'roadmap',
                        }
                    )
                })
                .catch(error => {
                    alert(error);
                });
        }
    },
    mounted() {
        this.loader = new Loader({
            apiKey: "AIzaSyA1IgTfCbQdxG5ISLhZAgxQK98hD_eweqA",
            version: "weekly",
            libraries: ["places"]
        })
    }
}
</script>

<style>
#map-container {
    width: 60%;
    height: 500px;
}

#vue-map {
    height: 400px;
}
</style>