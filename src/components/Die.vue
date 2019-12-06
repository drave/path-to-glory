<template>
  <div class="die">
    <template v-if="typeof roll === 'number'">
      {{ roll }}
    </template>
    <template v-else>
      ?
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Die extends Vue {
  @Prop() private roll!: number;
}
</script>

<style lang="scss" scoped>
.die {
  border: 1px solid black;
  display: inline-block;
  padding: 15px 20px;

  & + .die {
    margin-left: 20px;
  }
}
</style>
