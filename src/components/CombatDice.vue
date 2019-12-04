<template>
  <div>
    <Die :roll="DieOne"></Die>
    <Die :roll="DieTwo"></Die>
    <button @click="roll">Roll dice</button>
  </div>
</template>


<script>
import Die from './Die'

export default {
  name: 'Dice',
  components: {
    Die
  },
  props: {
    result: Number
  },
  data: function () {
    return { 
      DieOne: null,
      DieTwo: null,
    }
  },
  methods: {
    roll () {
      this.DieOne = Math.floor(Math.random() * 6) + 1;
      this.DieTwo = Math.floor(Math.random() * 6) + 1;
      this.$emit('roll', this.DieOne + this.DieTwo);
    }
  }
}
</script>

<style lang="scss" scoped>
  .die {

  }
</style>