<template>
    <div class="box mt-6 has-text-left">
        <p class="title has-text-centered">
            Resultat Squash QUAL BJN
            <button id="buttonToUpdateInfoSquashTests" class="button is-warning" @click="updateInfoSquashTests()">Update</button>
        </p>

        <div class="columns">
            <div class="column">
                <Pie :data="data" :options="options" />
            </div>
        </div>

        <aside class="menu">
            <div v-for="(app, indexApp) in dataBrut.globalTreeInfo" :key="indexApp">
                <p class="menu-label">
                    <span class="tag is-success m-1">{{ app.SUCCESS }}</span>
                    <span class="tag is-danger m-1">{{ app.FAILURE }}</span>
                    <span class="tag is-dark m-1">{{ app.UNTESTABLE }}</span>
                    <span class="tag is-info m-1">{{ app.UNKNOW }}</span>
                    -
                    <span v-if="indexApp === 0">Bandeau</span>
                    <span v-else-if="indexApp === 1">Wallboard</span>
                    <span v-else>Admin Wallboard</span>
                    - {{ app.name }}
                </p>
                <ul class="menu-list">
                    <li v-for="(ts, indexTS) in app.test_suites" :key="indexTS">
                        <a :id="'section_' + indexApp + '_' + indexTS + '_title'" @click="changeVisibilityContent('section_' + indexApp + '_' + indexTS + '_content')">
                            <span class="tag is-success m-1" :class="{ 'is-hidden': ts.SUCCESS === 0 }">{{ ts.SUCCESS }}</span>
                            <span class="tag is-danger m-1" :class="{ 'is-hidden': ts.FAILURE === 0 }">{{ ts.FAILURE }}</span>
                            <span class="tag is-dark m-1" :class="{ 'is-hidden': ts.UNTESTABLE === 0 }">{{ ts.UNTESTABLE }}</span>
                            <span class="tag is-info m-1" :class="{ 'is-hidden': ts.UNKNOW === 0 }">{{ ts.UNKNOW }}</span>
                            -
                            {{ ts.name }}
                        </a>
                        <ul :id="'section_' + indexApp + '_' + indexTS + '_content'" class="is-hidden">
                            <li v-for="tp in ts.test_plan" :key="tp.id">
                                <a :href="'https://testmanagement.factory.orange-business.com/squash/test-case-workspace/test-case/' + tp.id + '/content'" target="_blank">
                                    <span
                                        class="tag m-1 has-text-white"
                                        :class="{
                                            'has-background-success': tp.status === EnumTypeStatus.SUCCESS,
                                            'has-background-danger': tp.status === EnumTypeStatus.FAILURE,
                                            'has-background-dark': tp.status === EnumTypeStatus.UNTESTABLE,
                                            'has-background-info': tp.status !== EnumTypeStatus.SUCCESS && tp.status !== EnumTypeStatus.FAILURE && tp.status !== EnumTypeStatus.UNTESTABLE,
                                        }"
                                        >{{ tp.status }}</span
                                    >
                                    -
                                    {{ tp.name }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "vue-chartjs"
import { options } from "../config/chartConfig"
import AppSquashType from "../types/AppSquashType"
import EnumTypeStatus from "../interfaces/EnumTypeStatus"

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: "App",
    components: {
        Pie,
    },
    data() {
        return {
            options,
            EnumTypeStatus,
            dataBrut: { totalCount: {}, globalTreeInfo: [] as Array<AppSquashType>, lastExecutions: [] },
            data: {
                labels: [`Fail : -%`, `Success : -%`, `Untestable : -%`, `Unknow : -%`],
                datasets: [
                    {
                        backgroundColor: ["rgb(241 70 104)", "rgb(72 199 142)", "rgb(33,37,41)", "rgb(62 142 208)"],
                        data: [25, 25, 25, 25],
                    },
                ],
            },
        }
    },
    mounted() {
        this.updateInfoSquashTests()
    },
    methods: {
        updateGraph(totalCount) {
            this.data = {
                labels: [
                    `Fail : ${Math.floor((totalCount.FAILURE * 100) / totalCount.TOTAL)}%`,
                    `Success : ${Math.floor((totalCount.SUCCESS * 100) / totalCount.TOTAL)}%`,
                    `Untestable : ${Math.floor((totalCount.UNTESTABLE * 100) / totalCount.TOTAL)}%`,
                    `Unknow : ${Math.floor((totalCount.UNKNOW * 100) / totalCount.TOTAL)}%`,
                ],
                datasets: [
                    {
                        backgroundColor: ["rgb(241 70 104)", "rgb(72 199 142)", "rgb(33,37,41)", "rgb(62 142 208)"],
                        data: [totalCount.FAILURE, totalCount.SUCCESS, totalCount.UNTESTABLE, totalCount.UNKNOW],
                    },
                ],
            }
        },
        updateInfoSquashTests() {
            const button = document.getElementById("buttonToUpdateInfoSquashTests")
            if (button !== null) {
                button.classList.add("is-loading")
            }

            fetch("http://localhost:3001/api/squash/tests/status")
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    this.dataBrut = res
                    this.updateGraph(this.dataBrut.totalCount)
                })
                .catch((err) => {
                    console.error(err)
                })
                .finally(() => {
                    if (button !== null) {
                        button.classList.remove("is-loading")
                    }
                })
        },
        changeVisibilityContent(idContent) {
            const content = document.getElementById(idContent)
            if (content !== null) {
                if (content.classList.contains("is-hidden")) {
                    content.classList.remove("is-hidden")
                } else {
                    content.classList.add("is-hidden")
                }
            }
        },
    },
}
</script>
