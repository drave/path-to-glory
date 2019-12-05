<template>
  <div class="combat-dice">
    <div class="dice">
      <Die :roll="DieOne"></Die>
      <Die :roll="DieTwo"></Die>
    </div>
    <button @click="roll">Roll dice</button>
  </div>
</template>

<script lang="ts">
import Die from "./Die.vue";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { Die } })
export default class CombatDice extends Vue {
  @Prop() private result!: Number;

  private DieOne: number | null = null;
  private DieTwo: number | null = null;

  roll() {
    this.DieOne = Math.floor(Math.random() * 6) + 1;
    this.DieTwo = Math.floor(Math.random() * 6) + 1;
    this.$emit("roll", this.DieOne + this.DieTwo);
  }
}
</script>

<style lang="scss" scoped>
.dice {
  display: block;
  margin-bottom: 20px;
}
</style>
