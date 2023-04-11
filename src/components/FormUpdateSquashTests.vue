<script lang="ts">
import { storeResult as store, storeVisibility as componentsVisibility } from "../services/store"
export default {
    data() {
        return {
            inputUrlResult: "",
            inputFileResult: "pas de fichier",
            inputCible: "v0",
            inputIsNGP: false,
            inputUpdateUntestable: false,
        }
    },
    methods: {
        updateNameFile(e) {
            this.inputFileResult = e.target.files[0].name
        },
        callAPIUpdateSquash() {
            componentsVisibility.setFormUST(false)
            componentsVisibility.setloadUST(true)
            componentsVisibility.setResultUST(false)
            const data = {
                inputUrlResult: this.inputUrlResult,
                inputFileResult: this.inputFileResult,
                inputCible: this.inputCible,
                inputIsNGP: this.inputIsNGP,
                inputUpdateUntestable: this.inputUpdateUntestable,
            }

            console.info(data)
            const formData = new FormData()
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value)
            }
            fetch("http://localhost:3001/api/rf2squashnofile", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    componentsVisibility.setFormUST(false)
                    componentsVisibility.setloadUST(false)
                    componentsVisibility.setResultUST(true)
                    console.log(res)
                    store.setFromJson(res)
                })
                .catch((err) => {
                    componentsVisibility.setFormUST(false)
                    componentsVisibility.setloadUST(false)
                    componentsVisibility.setResultUST(true)
                    console.error(err)
                    store.setFromJson({
                        message: "Fail call api",
                        moreInfo: err,
                        result: [],
                    })
                })
        },
    },
}
</script>

<template>
    <div class="box mt-6 has-text-centered">
        <p class="subtitle m-1">MàJ Campagne Squash</p>

        <div class="has-text-left">
            <div class="field">
                <label class="label">Url du fichier résultat Robot Framework</label>
                <div class="control">
                    <input id="inputUrlResult" v-model="inputUrlResult" class="input" type="text" placeholder="https://..." />
                </div>
                <p class="help">Fichier output.xml, si vide récupère les valeurs du champ "Fichier résultat Robot Framework"</p>
            </div>

            <p class="subtitle"><strong>OU</strong></p>

            <div class="field">
                <label class="label">Fichier résultat Robot Framework</label>
                <div class="control">
                    <div id="file-js-example" class="file is-info has-name">
                        <label class="file-label">
                            <input id="inputFileResult" class="file-input" type="file" accept=".xml" @change="updateNameFile" />
                            <span class="file-cta">
                                <span class="file-label"> Import file </span>
                            </span>
                            <span class="file-name">
                                {{ inputFileResult }}
                            </span>
                        </label>
                    </div>
                </div>
                <p class="help">Fichier output.xml, si vide récupère les valeurs par défaut de l'API</p>
            </div>

            <div class="field">
                <label class="label">Campagne itération cible</label>
                <div class="control">
                    <input id="inputCible" v-model="inputCible" class="input" type="text" placeholder="v0,v1,v2 ..." />
                </div>
                <p class="help">Fichier output.xml, si vide récupère les valeurs par défaut de l'API</p>
            </div>

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input id="inputIsNGP" v-model="inputIsNGP" type="checkbox" />
                        Cible : NGP ?
                    </label>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input id="inputUpdateUntestable" v-model="inputUpdateUntestable" type="checkbox" />
                        Mettre à jour les tests intestables ?
                    </label>
                </div>
            </div>
        </div>

        <button class="button is-primary is-outlined is-medium m-1" @click="callAPIUpdateSquash">Robot Framework ➡️ Squash</button>
    </div>
</template>
