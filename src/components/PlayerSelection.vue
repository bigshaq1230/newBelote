<template>
    <Player @clicked="show = true" :index="index" :player="currentPlayer" :can_be_unavailable="false"></Player>

    <div class="modal_backdrop" v-if="show">
        <div class="modal">
            <span class="close" @click="show = false">&times;</span>
            <div class="content">
                <Player v-for="player in players "  :greentick="currentPlayer?.user_id === player.user_id"
                :key="player.user_id"
                @click="handleClick(player)"
                :player="player" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import Player from './Player.vue';
const props = defineProps({
    players: {
        type: Array,
        default: () => []
    },
    index: {
        type: Number,
        default: 0
    },
    currentPlayer: {
        type: Object,
        default: null
    }
});
const emit = defineEmits(['selected']);
let { players,index,currentPlayer  } = toRefs(props);
let show = ref(false);

const handleClick = (player) => {
    console.log(currentPlayer.value)
    emit('selected', { player:player, index: props.index,currentPlayer:currentPlayer });
    show.value = false;
};
</script>

<style scoped>
.modal_backdrop {
    top: 0;
    right: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
}
.modal {
    position: fixed;
    background-color: white; /* Light mode background */
    color: black; /* Light mode text color */
    z-index: 2;
    margin: auto;
    padding: 20px;
    width: auto;
    height: auto;
    border: 1px solid #888;
    display: block;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

@media (prefers-color-scheme: dark) {
    .modal {
        background-color: #121212; /* Dark mode background */
        color: #e0e0e0; /* Dark mode text color */
        border-color: #333;
    }
}

.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.title {
    text-align: center;
    padding: 1%;
    margin: 2%;
}

.content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    align-content: center;
    gap: 20px;
}


</style>