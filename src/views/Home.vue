<template>
  <section class="section section--home">
    <div class="container">
      <Game />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Game from "@/components/Game.vue";

export default {
  name: "home",
  components: {
    Game
  }
};
</script>
