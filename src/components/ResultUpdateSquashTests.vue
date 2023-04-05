<script>
import {
  storeResult as store,
  storeVisibility as componentsVisibility,
} from "../services/store";
import { FAILURE, SUCCESS } from "../interfaces/interfaceStutusTestSquash";
export default {
  data() {
    return {
      store,
      typeStatusSquash: { FAILURE, SUCCESS },
    };
  },
  methods: {
    removeHTMLtagsAndShorter(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      let text = div.textContent || div.innerText || "";

      return text.substring(0, 174);
    },
    resetComponentVisibility() {
      componentsVisibility.setFormUST(true);
      componentsVisibility.setloadUST(false);
      componentsVisibility.setResultUST(false);
    },
  },
};
</script>

<template>
  <div class="box mt-6 has-text-centered">
    <p class="subtitle m-1">{{ store.message }}</p>
    <button
      class="button is-info is-outlined is-medium m-1"
      @click="resetComponentVisibility()"
    >
      Nouvelle itération
    </button>
    <pre class="m-5 has-text-left">{{ store.moreInfo }}</pre>

    <div class="columns is-multiline has-text-left is-centered">
      <div
        v-for="result in store.result"
        class="card m-1 column is-one-quarter"
        style="width: 20rem"
        :class="{
          'has-background-success': result.status === typeStatusSquash.SUCCESS,
          'has-background-danger': result.status === typeStatusSquash.FAILURE,
        }"
      >
        <a
          target="_blank"
          class="is-link"
          :href="
            'https://testmanagement.factory.orange-business.com/squash/test-case-workspace/test-case/' +
            result.realId +
            '/content'
          "
        >
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ result.testName }}</p>
                <p class="subtitle is-6">{{ result.status }}</p>
              </div>
            </div>

            <div class="content">
              <p class="has-text-dark">
                {{ removeHTMLtagsAndShorter(result.extraInfo) }}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
