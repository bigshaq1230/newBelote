
<template>
    <div @click="show = true" class="player">
        p{{ index + 1 }}
        <img :src="p.on_device_url" alt="" v-if="p?.on_device_url">
        <span v-else>{{ p?.first_name }}</span>
    </div>
    
    <div class="modal_backdrop" v-if="show">
        <div class="modal">
            <div class="title">player {{ index + 1  }}</div>
            <span class="close" @click="show = false">&times;</span>
            <div class="content">
                <div class="player" v-for="p in players" :key="p.user_id" @click="handleClick(p)">
                    <img :src="p.on_device_url" alt="" v-if="p?.on_device_url">
                    <span v-else>{{ p.first_name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';
const props = defineProps(['players', 'index']);
const emit = defineEmits(['selected']);
let { players,index } = toRefs(props);
let show = ref(false);
let p = ref()
const handleClick = (player) => {
    p.value = player
    emit('selected', { id:player.user_id, index: props.index });
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

/*.modal {
    position: fixed;
    background-color: white;
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
}*/
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

.player {
    min-width: 50px;
    min-height: 50px;
    width: 20%;
    height: 20%;
    border: wheat 1px solid;
}

img {
    width: 100%;
    height: 100%;
}
</style>