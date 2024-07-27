<template>
    <label>first name :</label>
    <input type="text" name="" id="" v-model="player.first_name">

    <label>last name :</label>
    <input type="text" name="" id="" v-model="player.last_name">

    <input type="file" name="" id="">

    <button @click="updateInfo"></button>
</template>



<script setup>
// the user player should have it's own variable
import { supabase } from '@/supabase/supabase';
import { useData } from '@/stores/data';
import { storeToRefs } from 'pinia';
import { handleError } from 'vue';
const store = useData()
const { session,player,changes } = storeToRefs(store)

async function updateInfo() {
    const player2 = JSON.parse(JSON.stringify(player.value))
    delete player2?.on_device_url
    if (!session.value) {
        changes.value.player = player2
    }
    else {
        player2.user_id = session.value.user.id
        const { error } = await supabase.from('player').upsert(player2)
        handleError(error)
        
    }
}
</script>