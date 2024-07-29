<template>
    <GoogleLogin :callback="callback" />
</template>
<script setup>
import { useData } from '@/stores/data';
import { storeToRefs } from 'pinia';
import { supabase } from '@/supabase/supabase';
import router from '@/router';
import { handleError } from '../func';
const store = useData()
const { session, player } = storeToRefs(store)
async function callback(response) {
    let state = true
    try {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        })
        handleError(error)
        supabase.auth.onAuthStateChange((_, _session) => {
            session.value = _session
        })
        const { error:playerError, data:PlayerData, count} = await supabase.from('player').select('*',{count:'exact'}).eq('user_id',session.value.user.id)
        handleError(playerError)
        if(count !== 0 ) {
            player.value = PlayerData[0]
        }
        else {
            player.value.user_id = session.value.user.id
            const { error } = await supabase.from('player').upsert(player)
            handleError(error)
        }

    } catch (error) {
        state = false
        console.error('Google sign-in error:', error.message)
    }
    if (state) {
        location.reload()
        router.replace('/')
        
    }
}
</script>