<template>
    <form @submit.prevent="">
        <label>first name :</label>
        <input type="text" name="" id="" v-model="player.first_name">
        <br>
        <label>last name :</label>
        <input type="text" name="" id="" v-model="player.last_name">
        <br>
        <img :src="player.on_device_url" alt="">
        <br>
        <label> change image:</label>
        <input type="file" id="single" accept="image/*" @change="basic_handle" />
        <br>
        <button @click="updateInfo">update info!</button>
    </form>
</template>



<script setup>
// the user player should have it's own variable
import { supabase } from '@/supabase/supabase';
import { useData } from '@/stores/data';
import { storeToRefs } from 'pinia';
import { handleError } from '../func';
import { ref } from 'vue';
const store = useData()
const { session, player, changes } = storeToRefs(store)
let files = ref([]);

async function updateInfo() {
    const player2 = JSON.parse(JSON.stringify(player.value))
    delete player2?.on_device_url
    if (!session.value) {
        changes.value.player = player2
    }
    else {
        player2.user_id = session.value.user.id
        await uploadAvatar()
        const { error } = await supabase.from('player').upsert(player2)
        handleError(error)
    }
}
function basic_handle(evt) {
    files.value = evt.target.files;
    const file = files.value[0]
    player.value.on_device_url = URL.createObjectURL(file)
}
const uploadAvatar = async () => {
    if (files.value.length === 0) {
        return;
    }
    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${player.value.id}.${fileExt}`;

    const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

    handleError(uploadError)
    player.value.avatar_url = filePath
};
</script>
<style>
img {
    width: 100px;
    height: 100px;
}

form {
    border: 2px rgb(79, 52, 52) solid;
}
</style>