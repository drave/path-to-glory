<template>
  <section class="blessed-dice">
    <b-modal
      :active="true"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Blessed by the gods</p>
        </header>
        <section class="modal-card-body">
          <p class="intro">
            The Dark Gods will gift their most favoured Champions<br />
            with boons of unnatural mutation. However, too many<br />
            blessing can lead to damnation of a different kind -<br />
            devolution into a Chaos Spawn, just ask Scylla!****
          </p>
          <h3 class="title is-3">The vagaries of fate</h3>
          <p>
            These bonuses are permanent. However, if you roll a<br />
            Chaos Boon/Mutation that you already have (other than<br />
            a Random Mutation), you immediately devolve into a<br />
            Chaos Spawn and your journey end in ignominy!
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
.intro {
  font-size: 1.1em;
  margin-bottom: 20px;
}
</style>
