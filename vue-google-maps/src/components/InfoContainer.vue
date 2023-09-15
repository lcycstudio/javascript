<template>
    <v-container>
        <v-text-field v-model="text" :loading="loading" density="compact" variant="solo" label="Search"
            hint="Enter your search location" append-inner-icon="mdi-magnify" clear-icon="mdi-close-circle" single-line
            clearable @click:append-inner="search" @keyup.enter="search" @click:clear="clearText"></v-text-field>
    </v-container>
    <v-container>
        <div class="text-h6">Search Result List</div>
        <v-card class="mt-4 mb-4 mx-auto" v-for="(item, index) in thisList" :key="index">
            <div class="search-item">
                <div><v-checkbox v-model="item.selected" hide-details @click="toggleCheckbox"></v-checkbox></div>
                <div class="text-body-2" style="width:70%">{{ item.location }}</div>
                <v-btn class="mr-2" size="x-small" icon="mdi-trash-can"></v-btn>
            </div>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        searchList: Array<{
            location: String,
            image: String
            selected: Boolean,
        }>
    },
    data() {
        return {
            loading: false,
            text: '',
            thisList: this.searchList
        }
    },
    emits: ['searchLocation'],
    setup(props, ctx) {
        ctx.emit('searchLocation')
    },
    methods: {
        search() {
            this.$emit("searchLocation", this.text)
            this.clearText();
        },
        clearText() {
            this.text = ''
        },
        toggleCheckbox() {
            console.info('searchLocation: ', this.thisList)
        }
    },
    mounted() {

    }
})
</script>

<style>
.search-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>