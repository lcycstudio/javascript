<template>
    <div id="info-container">
        <v-container id="search-input-container">
            <v-text-field id="search-input" v-model="text" :loading="loading" density="compact" variant="solo"
                label="Search" append-inner-icon="mdi-magnify" clear-icon="mdi-close-circle" single-line clearable
                hide-details @click:append-inner="search" @click:clear="clearText"></v-text-field>
            <div class="text-body-2 py-2">{{ errorMsg }}</div>
        </v-container>
        <v-container>
            <div id="search-list-title-container">
                <div class="text-h6">Search Result</div>
                <v-btn color="red" size="small" @click="clearList">Clear List</v-btn>
            </div>
            <div v-if="!thisList || thisList.length === 0" class="py-4 text-center">Your search list is empty</div>
            <v-card class="my-4 mx-auto" v-if="thisList && thisList.length > 0" v-for="(item, index) in thisList"
                :key="index">
                <div class="search-item">
                    <div><v-checkbox v-model="item.checked" hide-details @click="toggleCheck(index)"></v-checkbox>
                    </div>
                    <div class="search-item-text" @click="onSelectItem(index)">
                        <div class="font-weight-bold">{{ item.location.name }}</div>
                        <div class="text-body-2">{{ item.location.formatted_address }}</div>
                    </div>
                    <v-tooltip text="Remove" location="start">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-2 delete-icons" color="orange-darken-2" icon="mdi-trash-can"
                                @click="removeItem(index)"></v-icon>
                        </template>
                    </v-tooltip>
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SearchItemIF } from '@/interfaces/search'
import { Loader } from '@googlemaps/js-api-loader';

export default defineComponent({
    props: {
        searchList: Array<SearchItemIF>,
    },
    data() {
        return {
            errorMsg: '' as string,
            loading: false,
            text: '',
            thisList: this.searchList,
        }
    },
    emits: ['searchLocation', 'filterLocation', 'clearList', 'removeItem'],
    setup(props, ctx) {
        ctx.emit('searchLocation')
        ctx.emit('filterLocation')
        ctx.emit('clearList')
        ctx.emit('removeItem')
    },
    methods: {
        search: function () {
            this.loading = true
            const keyboardEvent = new KeyboardEvent('keydown', {
                code: 'Enter',
                key: 'Enter',
                charCode: 13,
                keyCode: 13,
                view: window,
                bubbles: true
            });
            const myInput = document.getElementById('search-input') as HTMLInputElement
            myInput.dispatchEvent(keyboardEvent)
        },
        toggleCheck: function (index: number) {
            console.info('this.thisList: ', this.thisList)
            this.$emit('filterLocation', this.thisList)
        },
        clearText: function () {
            this.text = ''
        },
        clearList: function () {
            this.$emit('clearList')
        },
        removeItem: function (index: number) {
            this.$emit('removeItem', index)
        },
        onSelectItem: function (index: number) {
            const items = Array.from(document.getElementsByClassName('search-item') as HTMLCollectionOf<HTMLElement>)
            items.forEach((element: HTMLElement, i: number) => {
                if (i !== index) {
                    if (element.style.border === '5px solid rgba(22, 119, 255, 0.8)') {
                        element.style.border = 'none';
                    }
                } else {
                    const thisBorder = element.style.border;
                    if (thisBorder === '5px solid rgba(22, 119, 255, 0.8)') {
                        element.style.border = 'none';
                        this.$emit('filterLocation', this.thisList)
                    } else {
                        element.style.border = '5px solid rgba(22, 119, 255, 0.8)';
                        this.$emit('filterLocation', [this.thisList![index]])
                    }
                }
            });
        }
    },
    watch: {
        searchList: function (newValue, _) {
            if (newValue) {
                this.thisList = newValue
            }
        }
    },
    mounted() {
        const loader = new Loader({
            apiKey: "",
            version: "weekly",
            libraries: ["places"]
        })
        loader
            .load()
            .then((google) => {
                const input = document.getElementById('search-input') as HTMLInputElement
                const options = {
                    fields: ["formatted_address", "geometry", "name"],
                    strictBounds: false,
                };
                const searchBox = new google.maps.places.SearchBox(input, options);
                searchBox.addListener("places_changed", () => {
                    this.text = input.value
                    this.loading = true
                    const places = searchBox.getPlaces();
                    if (places.length === 0) {
                        this.errorMsg = 'Place is not found or invalid'
                        this.loading = false
                        return;
                    }
                    this.errorMsg = ''
                    this.$emit('searchLocation', { text: this.text, time: new Date(), places: places.slice(0, 10) })
                    this.loading = false
                })
            })
            .catch(error => {
                alert(error)
            });
    }
})
</script>

<style>
#info-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    overflow-y: auto;
}

#search-list-title-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#search-input-container {
    display: flex;
    flex-direction: column;
}

#search-input {
    width: 90%;
    padding: 10px;
    border-bottom: 1px solid rgb(211, 211, 211);
}

.search-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.search-item:hover {
    border: 2px solid #d3d3d3;
}

.search-item-text {
    width: 80%;
}

.search-item-text:hover {
    cursor: pointer;
}

.delete-icons:hover {
    cursor: pointer;
}
</style>