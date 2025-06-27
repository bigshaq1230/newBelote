<template >
    <div
        @click="handleClick"
        class="player"
        :class="{
            unavailable: isUnavailable,
            'has-green-tick': greentick
        }"
        :title="playerTooltip"
    >
        <div class="player-content">
            <img
                :src="playerAvatar"
                :alt="playerName"
                class="player-avatar"
            >
            <p class="player-name">{{ playerName }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

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
        default: true
    },
    greentick: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['clicked']);

const { player, index, can_be_unavailable, greentick } = toRefs(props);

const playerAvatar = computed(() =>
    player.value?.on_device_url || 'https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png'
);

const playerName = computed(() =>
    player.value?.first_name || 'Player'
);

const isUnavailable = computed(() =>
    can_be_unavailable.value && player.value?.selected
);

const playerTooltip = computed(() =>
    isUnavailable.value ? `${playerName.value} is unavailable` : playerName.value
);

const handleClick = () => {
    if (!isUnavailable.value) {
        emit('clicked');
    }
};
</script>

<style scoped>
.player {
    width: 150px;
    height: 150px;
    border: 1px solid wheat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    cursor: pointer;

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

.player-avatar {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid transparent;
}

.player.has-green-tick .player-avatar {
    border-color: green;
}

.player-name {
    margin: 0;
    text-align: center;
    font-weight: 500;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.green-tick {
    position: absolute;
    top: 10px;
    right: 10px;
    color: green;
    font-weight: bold;
    font-size: 1.2rem;
    background: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.player.unavailable {
    background-color: rgba(128, 128, 128, 0.5);
    opacity: 0.7;
    cursor: not-allowed;
}

.player.unavailable .player-avatar {
    filter: grayscale(80%);

}

.player:not(.unavailable):hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.player img {

    object-fit: contain;
    border-radius: 100%;
}
</style>