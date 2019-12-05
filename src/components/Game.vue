<template>
  <div id="game">
    <template v-if="!started">
      <button @click="startGame">Start game</button>
    </template>
    <template v-else>
      <combat-dice class="combat-dice" v-on:roll="getNewState"></combat-dice>
    </template>
    <div>Result: {{ diceRoll }}</div>
    <div>msg: {{ message }}</div>
    <div>state: {{ currentState }} ({{ state }})</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CombatDice from "./CombatDice.vue";

@Component({ components: { CombatDice } })
export default class Game extends Vue {
  private started: boolean = false;
  private injured: boolean = false;
  private blessed: boolean = false;
  private diceRoll: number | null = null;
  private state: number = 0;
  private message: string = "";

  // Computed properties
  get fail(): number {
    return this.state + 3;
  }

  get injury(): number {
    return this.state + 4;
  }

  get survival(): number {
    return this.state + 5;
  }

  get blessing(): number {
    return this.state + 7;
  }

  get rankup(): number {
    return this.state + 8;
  }

  get currentState(): string {
    return ["Marauder", "Warrior", "Knight", "Varanguard", "Lord"][this.state];
  }

  // methods
  startGame(): void {
    this.reset();
    this.diceRoll = null;
    this.message = "";
    this.started = true;
  }

  reset(): void {
    // this.started = false;
    this.injured = false;
    this.blessed = false;
    this.state = 0;
  }

  getNewState(result: number): void {
    this.diceRoll = result;

    if (this.diceRoll <= this.fail) {
      this.message = "You died";
      this.reset();
      return;
    }

    if (this.diceRoll === this.injury) {
      this.message = "Injured in battle";
      this.injured = true;
      return;
    }

    if (this.diceRoll >= this.rankup) {
      this.state++;
      this.message = "Glory is yours!";
      return;
    }

    if (this.diceRoll === this.blessing) {
      this.message = "Blessed by the gods";
      this.blessed = true;
      return;
    }

    if (this.diceRoll >= this.survival) {
      this.message = "Survived";
      return;
    }
    // eslint-disable-next-line no-console
    console.log(this.diceRoll);
    // eslint-disable-next-line no-console
    console.log(this.survival);
    return;
  }
}
</script>

<style lang="scss" scoped>
.combat-dice {
  margin-bottom: 20px;
}
</style>
