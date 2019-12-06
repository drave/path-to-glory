<template>
  <div id="game">
    <template v-if="!started">
      <button @click="startGame">Start game</button>
    </template>
    <template v-else>
      <injured v-if="injured" class="injured-dice" v-on:roll="setInjuryState" />
      <blessed
        v-if="blessed"
        class="blessed-dice"
        v-on:roll="setBlessedState"
      />
      <combat-dice
        v-if="!injured && !blessed"
        class="combat-dice"
        v-on:roll="setNewState"
      />
    </template>
    <div>Result: {{ diceRoll }}</div>
    <div>msg: {{ message }}</div>
    <div>state: {{ currentLevel }} ({{ level }})</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Blessed from "./Blessed.vue";
import CombatDice from "./CombatDice.vue";
import Injured from "./Injured.vue";
import { State, Action, Getter } from "vuex-class";
import store from "@/store";

@Component({ components: { Blessed, CombatDice, Injured } })
export default class Game extends Vue {
  get started(): boolean {
    return this.$store.getters["started"];
  }
  get level(): number {
    return this.$store.getters["level"];
  }
  get injured(): boolean {
    return this.$store.getters["injured"];
  }
  get blessed(): boolean {
    return this.$store.getters["blessed"];
  }
  private diceRoll: number | null = null;
  private message: string = "";

  // Computed properties
  get fail(): number {
    return this.level + 3;
  }

  get injury(): number {
    return this.level + 4;
  }

  get survival(): number {
    return this.level + 5;
  }

  get blessing(): number {
    return this.level + 7;
  }

  get rankup(): number {
    return this.level + 8;
  }

  get currentLevel(): string {
    return ["Marauder", "Warrior", "Knight", "Varanguard", "Lord"][this.level];
  }

  // methods
  startGame(): void {
    this.reset();
    this.diceRoll = null;
    this.message = "";
    store.commit("setStarted", true);
  }

  reset(): void {
    // store.commit("setStarted", false);
    store.commit("setInjured", false);
    store.commit("setBlessed", false);
    store.commit("setLevel", 0);
  }

  setNewState(result: number): void {
    this.diceRoll = result;

    if (this.diceRoll <= this.fail) {
      this.message = "You died";
      this.reset();
      return;
    }

    if (this.diceRoll === this.injury) {
      this.message = "Injured in battle";
      store.commit("setInjured", true);
      return;
    }

    if (this.diceRoll >= this.rankup) {
      store.commit("setLevel", this.level + 1);
      this.message = "Glory is yours!";
      return;
    }

    if (this.diceRoll === this.blessing) {
      this.message = "Blessed by the gods";
      store.commit("setBlessed", true);
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

  setInjuryState(result: number): void {
    // @todo set injury
    // 1 = dead
    // 2 = mortal injury (next roll !== double = dead)
    // 3 = severed leg (all combatRolls -1, second time = dead)
    // 4 = severed arm (all double combatRolls -1 except double 6-s, second time = dead)
    // 5 = serious concussion (next combatRoll -1)
    // 6 = fearsome scars (next combatRoll +1)
    this.$store.commit("addInjury", result);
    this.$store.commit("setInjured", false);
  }

  setBlessedState(result: number): void {
    // @todo set blessing
    // Second time = spawn / dead
    // 1 = random mutation (no benefits)
    // 2 = quicksilver reflexes (combatRoll double = dead => survived)
    // 3 = regeneration (all injured => survived)
    // 4 = third eye (re-roll a single 1-result die in combatRolls)
    // 5 = weapon limb (all combatRolls +1)
    // 6 = one boon too many? (roll blessing twice, ignore 6-s)
    this.$store.commit("addBlessing", result);
    this.$store.commit("setBlessed", false);
  }
}
</script>

<style lang="scss" scoped>
.combat-dice {
  margin-bottom: 20px;
}
</style>
