<template>
  <section class="blessed-dice">
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
                src="../assets/blessings.jpg"
                alt="The vagaries of fate - The Dark Gods will gift their most favoured Champions with boons of unnatural mutation. However, too many blessing can lead to damnation of a different kind - devolution into a Chaos Spawn, just ask Scylla!****"
              />
            </p>
            <div class="container has-text-centered dice">
              <Die :roll="DieOne"></Die>
            </div>
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
export default class Blessed extends Vue {
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
