<script lang="ts">
import FormUpdateSquashTests from "./components/FormUpdateSquashTests.vue"
import LoadingScreenUpdateSquashTests from "./components/LoadingScreenUpdateSquashTests.vue"
import ResultUpdateSquashTests from "./components/ResultUpdateSquashTests.vue"
import InfoSquashTests from "./components/InfoSquashTests.vue"
import SocketioService from "./services/socket"
import { storeVisibility as store } from "./services/store"
export default {
    name: "App",
    components: {
        FormUpdateSquashTests,
        LoadingScreenUpdateSquashTests,
        ResultUpdateSquashTests,
        InfoSquashTests,
    },
    data() {
        return {
            store,
        }
    },
    created() {
        SocketioService.setupSocketConnection()
    },
    beforeUnmount() {
        SocketioService.disconnect()
    },
    mounted() {
        document.body.classList.add("container")
        document.body.classList.add("is-fluid")
    },
}
</script>

<template>
    <header></header>

    <main class="container mt-6">
        <div class="has-text-centered">
            <p class="title has-text-black">FCC passerel</p>

            <a class="button is-primary is-outlined is-large m-1" href="http://172.27.0.229:8080/jenkins2/view/FCC%20GUI%20-%20Tests%20Robot%20Framework/" target="_blank">Jenkins</a>
            <a class="button is-primary is-outlined is-large m-1" href="https://testmanagement.factory.orange-business.com/squash/campaign-workspace/campaign-folder/13627/content" target="_blank"
                >Squash</a
            >
        </div>

        <FormUpdateSquashTests :class="{ 'is-hidden': !store.formUST }" />

        <LoadingScreenUpdateSquashTests :class="{ 'is-hidden': !store.loadUST }" />

        <ResultUpdateSquashTests :class="{ 'is-hidden': !store.resultUST }" />

        <InfoSquashTests />
    </main>
</template>
