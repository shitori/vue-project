<script lang="ts">
import { storeSocket as store, storeVisibility as componentsVisibility } from "../services/store"
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        resetComponentVisibility() {
            componentsVisibility.setFormUST(true)
            componentsVisibility.setloadUST(false)
            componentsVisibility.setResultUST(false)
        },
    },
}
</script>

<template>
    <div class="box mt-6 has-text-centered">
        <p class="title">Chargement : {{ store.message }}</p>

        <progress class="progress is-large is-info mt-1" :value="store.percent" max="100"></progress>
        <p>{{ store.percent }}%</p>
        <button class="button is-danger is-outlined is-medium m-1" @click="resetComponentVisibility()">Annuler</button>
    </div>
</template>
