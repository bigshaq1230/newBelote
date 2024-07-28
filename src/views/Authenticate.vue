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
const { session } = storeToRefs(store)
async function callback(response) {
    try {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        })
        handleError(error)
        supabase.auth.onAuthStateChange((_, _session) => {
            session.value = _session
        })

    } catch (error) {
        console.error('Google sign-in error:', error.message)
    }
}
</script>