<script>
import Pie from './Pie.vue'
import fakeData from './fakeDataInfosSquashTest.json'
import { storeGraph as store } from '../services/store'
export default {
    data() {
        return {
            dataBrut: 'no data'
        }
    },
    components: {
        Pie
    },
    methods: {
        updateInfoSquashTests() {
            fetch('http://localhost:3001/api/squash/tests/status')
                .then(res => { return res.json() })
                .then(res => {
                    console.log(res)
                    store.setFromJson(res.totalCount)
                })
        }
    },
    mounted() {
        //this.updateInfoSquashTests()
        store.setFromJson(fakeData.totalCount)

    }

}
</script>
<template>
    <div class="box mt-6 has-text-left">
        <div class="columns">
            <div class="column">
                <Pie />
            </div>
            <div class="column">
                <pre>{{ dataBrut.totalCount }}</pre>

            </div>
        </div>
        <pre>{{ dataBrut.globalTreeInfo }}</pre>
        <pre>{{ dataBrut.lastExecutions }}</pre>


    </div>
</template>