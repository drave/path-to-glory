<template>
    <div class="die">
        <template v-if="typeof roll === 'number'">
            {{roll}}
        </template>
        <template v-else>
            ?
        </template>
    </div>
</template>

<script>
export default {
    props: {
        roll: Number
    }
}
</script>