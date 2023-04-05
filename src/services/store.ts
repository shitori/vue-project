import { reactive } from "vue"

import fakeData from "../data/fakeData.json"

export const storeSocket = reactive({
    percent: 0,
    message: "...",
    cible: "UNKNOW",
    setMessage(message) {
        this.message = message
    },
    setFromJson(json) {
        this.percent = json.percent
        this.message = json.message
        this.cible = json.cible
    },
})

export const storeResult = reactive({
    message: "resultMessage",
    moreInfo: "resultMoreInfo",
    result: fakeData,
    setFromJson(json) {
        this.message = json.message
        this.moreInfo = json.moreInfo
        this.result = json.result
    },
})

export const storeVisibility = reactive({
    formUST: true,
    loadUST: false,
    resultUST: false,
    setFormUST(formUST) {
        this.formUST = formUST
    },
    setloadUST(loadUST) {
        this.loadUST = loadUST
    },
    setResultUST(resultUST) {
        this.resultUST = resultUST
    },
})

export const storeGraph = reactive({
    totalFail: 0,
    totalSucess: 0,
    totalUntestable: 0,
    totalUnknow: 0,
    total: 0,
    setFromJson(json) {
        this.totalFail = json.FAILURE
        this.totalSucess = json.SUCCESS
        this.totalUntestable = json.UNTESTABLE
        this.totalUnknow = json.UNKNOW
        this.total = json.TOTAL
    },
})
