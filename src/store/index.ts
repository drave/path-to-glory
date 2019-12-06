import Vue from "vue";
import Vuex from "vuex";
import { GameState } from "./GameState";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new GameState(),
  mutations: {
    setStarted(state: GameState, started: boolean) {
      state.Started = started;
    },
    setLevel(state: GameState, level: number) {
      state.Level = level;
    },
    setInjured(state: GameState, injured: boolean) {
      state.Injured = injured;
    },
    setBlessed(state: GameState, blessed: boolean) {
      state.Blessed = blessed;
    }
  },
  actions: {},
  getters: {
    started(state: GameState) {
      return state.Started;
    },
    level(state: GameState) {
      return state.Level;
    },
    injured(state: GameState) {
      return state.Injured;
    },
    blessed(state: GameState) {
      return state.Blessed;
    }
  },
  modules: {}
});
