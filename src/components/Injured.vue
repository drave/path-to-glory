<template>
  <section class="injury-dice">
    <b-modal
      :active="true"
      trap-focus
      aria-role="dialog"
      aria-modal
      full-screen
      :can-cancel="false"
    >
      <div class="container container--main is-fullhd">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <p class="image is-1by2">
              <img
                src="../assets/injuries.jpg"
                alt="Life in the Mortal Realms is hazardous at best and downright lethal at worst. Add trying to impress the Dark Gods into the mix, and it's a recipe for death and dismemberment!"
              />
            </p>
          </div>
        </div>
      </div>
      <nav class="navbar is-fixed-bottom">
        <div class="navbar-item">
          <button class="button is-primary" type="button" @click="roll">
            Roll a D6
          </button>
        </div>
      </nav>
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
.navbar {
  justify-content: center;
}
.container--main {
  padding-bottom: 52px;
}
</style>
