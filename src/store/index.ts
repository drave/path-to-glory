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
    },
    addBlessing(state: GameState, blessing: number) {
      state.Blessings.push(blessing);
    },
    addInjury(state: GameState, injury: number) {
      state.Injuries.push(injury);
    }
  },
  actions: {},
  getters: {
    started(state: GameState): boolean {
      return state.Started;
    },
    level(state: GameState): number {
      return state.Level;
    },
    injured(state: GameState): boolean {
      return state.Injured;
    },
    blessed(state: GameState): boolean {
      return state.Blessed;
    },
    blessings(state: GameState): Array<number> {
      return state.Blessings;
    },
    injuries(state: GameState): Array<number> {
      return state.Injuries;
    }
  },
  modules: {}
});
