import { reactive } from "vue"

import fakeData from "../data/fakeData.json"
import EnumCibleWS from "../interfaces/EnumCible"
import SocketJSONcontentType from "../types/SocketJSONcontentType"

export const storeSocket = reactive({
    percent: 0 as number,
    message: "..." as string,
    cible: EnumCibleWS.FROM_RF as EnumCibleWS,
    setMessage(message: string) {
        this.message = message
    },
    setFromJson(json: SocketJSONcontentType) {
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
    formUST: true as boolean,
    loadUST: false as boolean,
    resultUST: false as boolean,
    setFormUST(formUST: boolean) {
        this.formUST = formUST
    },
    setloadUST(loadUST: boolean) {
        this.loadUST = loadUST
    },
    setResultUST(resultUST: boolean) {
        this.resultUST = resultUST
    },
})
