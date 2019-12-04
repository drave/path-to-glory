<template>
    <div id="game">
        <template v-if="!started">
            <button @click="startGame">Start game</button>
        </template>
        <template v-else>
            <combat-dice v-on:roll="getNewState"></combat-dice>
        </template>
        <div>Result: {{ diceRoll }}</div>
        <div>msg: {{ message }}</div>
        <div>state: {{ currentState }} ({{ state }})</div>
    </div>
</template>


<script>
import Vue from 'vue'
import CombatDice from './CombatDice.vue';
export default Vue.extend({
    components: {
        CombatDice
    },
    data() {
        return {
            started: false,
            injured: false,
            blessed: false,
            diceRoll: null,
            state: 0,
            message: '',
        }
    },
    computed: {
        fail() {
            return this.state + 3;
        },
        injury() {
            return this.state + 4;
        },
        survival() {
            return this.state + 5;
        },
        blessing() {
            return this.state + 7;
        },
        rankup() {
            return this.state + 8;
        },
        currentState() {
            return [
                'Marauder',
                'Warrior',
                'Knight',
                'Varanguard',
                'Lord',
            ][this.state];
        },
    },
    methods: {
        startGame() {
            this.reset();
            this.diceRoll = null;
            this.message = '';
            this.started = true;
        },
        reset() {
            // this.started = false;
            this.injured = false;
            this.blessed = false;
            this.state = 0;
        },
        getNewState(result) {
            this.diceRoll = result;
            
            if (this.diceRoll <= this.fail) {
                this.message = 'You died';
                this.reset();
                return;
            }

            if (this.diceRoll === this.injury) {
                this.message = 'Injured in battle';
                this.injured =  true;
                return;
            }

            if (this.diceRoll >= this.rankup) {
                this.state++;
                this.message = 'Glory is yours!';
                return;
            } 
            
            if (this.diceRoll === this.blessing) {
                this.message = 'Blessed by the gods';
                this.blessed = true;
                return;
            } 
            
            if (this.diceRoll >= this.survival) {
                this.message = 'Survived';
                return;
            }
            // eslint-disable-next-line no-console
            console.log(this.diceRoll);
            // eslint-disable-next-line no-console
            console.log(this.survival);
            return;       
        },        
    }
    
})
</script>