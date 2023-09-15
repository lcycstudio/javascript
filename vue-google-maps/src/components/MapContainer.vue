<template>
    <v-container>
        <div class="text-h5">Google Map</div>
        <div>{{ thisText }}</div>
    </v-container>
</template>

<script lang="ts">
export default {
    name: "Map Container",
    props: {
        searchText: String,
    },
    data() {
        return {
            thisText: this.searchText
        }
    },
    watch: {
        searchText: function (newValue, oldValue) {
            this.thisText = newValue ? newValue : oldValue;
        }
    }
}
</script>