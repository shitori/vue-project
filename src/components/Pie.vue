<template>
  <div class="box mt-6 has-text-left">
    <div class="columns">
      <div class="column is-two-thirds">
        <Pie :data="data" :options="options" />
      </div>
      <div class="column">

        <div class="list">

          <div class="list-item" v-for="(app, index) in dataBrut.globalTreeInfo">
            <div class="list-item-title">
              <p v-if="index === 0">Bandeau</p>
              <p v-else-if="index === 1">Wallboard</p>
              <p v-else>Admin Wallboard</p>
              - {{ app.name }} -
              <div class="list">
                <div class="list-item" v-for="ts in app.test_suites">
                  <div class="list-item-title">{{ ts.name }}</div>
                </div>
              </div>
            </div>
          </div>


        </div>


      </div>
    </div>
    <ul>
      <li v-for="app in dataBrut.globalTreeInfo">
        {{ app.name }}
        <ul>
          <li v-for="ts in app.test_suites">
            {{ ts.name }}
            <ul>
              <li v-for="tp in ts.test_plan">
                {{ tp.name }}
              </li>
            </ul>
          </li>
        </ul>

      </li>
    </ul>
    <pre>{{ fakeData.globalTreeInfo }}</pre>
    <pre>{{ fakeData.lastExecutions }}</pre>
    <pre>{{ fakeData.totalCount }}</pre>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { options } from '../config/chartConfig.js'
import { storeGraph as store } from '../services/store'
import fakeData from './fakeDataInfosSquashTest.json'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Pie
  },
  data() {
    return {
      options,
      store,
      fakeData,
      dataBrut: { totalCount: {}, globalTreeInfo: [], lastExecutions: [] },
      data: {
        labels: [
          `Fail : -%`,
          `Success : -%`,
          `Untestable : -%`,
          `Unknow : -%`,
        ],
        datasets: [
          {
            backgroundColor: [
              'rgb(220,53,69)',
              'rgb(25,135,84)',
              'rgb(33,37,41)',
              'rgb(108,117,125)',
            ],
            data: [25, 25, 25, 25]
          }
        ]
      }
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
            backgroundColor: [
              'rgb(220,53,69)',
              'rgb(25,135,84)',
              'rgb(33,37,41)',
              'rgb(108,117,125)',
            ],
            data: [totalCount.FAILURE, totalCount.SUCCESS, totalCount.UNTESTABLE, totalCount.UNKNOW]
          }
        ]
      }
    },
    updateInfoSquashTests() {
      /*fetch('http://localhost:3001/api/squash/tests/status')
        .then(res => { return res.json() })
        .then(res => {
          console.log(res)
          this.updateGraph(res.totalCount)
        })*/
      this.dataBrut = this.fakeData
      this.updateGraph(this.dataBrut.totalCount)

    }
  }
}

</script>
