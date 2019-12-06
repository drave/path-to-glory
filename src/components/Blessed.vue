<template>
  <div class="blessed-dice">
    <div class="dice">
      <Die :roll="DieOne"></Die>
    </div>
    <button @click="roll">Roll dice</button>
  </div>
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
  margin-bottom: 20px;
}
</style>
