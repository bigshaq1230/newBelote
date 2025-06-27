<template>
    <div
        @click="$emit('clicked')"
        class="player">
        <div v-if="can_be_unavailable && player?.selected">red mark !!</div>
        <div v-else class="player-content">
            <img
                :src="player?.on_device_url || 'https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png'"
                :alt="player?.first_name || 'Player avatar'"
            >
            <p>{{ player?.first_name || 'Player' }}</p>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    player: {
        type: Object,
        default: () => null
    },
    index: {
        type: Number,
        default: 0
    },
    can_be_unavailable: {
        type: Boolean,
        default: false
    }
});

const { player, index, can_be_unavailable } = toRefs(props);
</script>

<style scoped>
.player {
    cursor: pointer;
    width: 150px;
    height: 150px;
    border: 1px solid wheat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
}

.player-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 8px;
}

.player img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 50%;
}

.player.unavailable {
    display: none;
    cursor: default;
}

.player:not(.unavailable):hover {
    transform: scale(1.05);
}
</style>