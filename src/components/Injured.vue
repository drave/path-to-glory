<template>
  <section class="injury-dice">
    <b-modal
      :active="true"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Injured in battle</p>
        </header>
        <section class="modal-card-body">
          <p class="intro">
            Life in the Mortal Realms is hazardous at best and downright<br />
            lethal at worst. Add trying to impress the Dark Gods into the<br />
            mix, and it's a recipe for death and dismemberment!
          </p>
          <div class="container has-text-centered dice">
            <Die :roll="DieOne"></Die>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="container has-text-centered">
            <button class="button is-primary" type="button" @click="roll">
              Roll dice
            </button>
          </div>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script lang="ts">
import Die from "./Die.vue";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { Die } })
export default class Injured extends Vue {
  @Prop() private result!: Number;

  private DieOne: number | null = null;

  roll() {
    this.DieOne = Math.floor(Math.random() * 6) + 1;
    this.$emit("roll", this.DieOne);
  }
}
</script>

<style lang="scss" scoped>
.dice {
  display: block;
  margin: 20px 0 0;
}
.intro {
  font-size: 1.1em;
  margin-bottom: 20px;
}
</style>
