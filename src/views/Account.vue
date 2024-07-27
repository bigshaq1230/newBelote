<template>
    <label>first name :</label>
    <input type="text" name="" id="" v-model="first_name">

    <label>last name :</label>
    <input type="text" name="" id="" v-model="last_name">

    <input type="file" name="" id="">

    <button @click="updateInfo"></button>
</template>



<script setup>
// the user player should have it's own variable 
import { supabase } from '@/supabase/supabase';
import { useData } from '@/stores/data';
import { storeToRefs } from 'pinia';
const store = useData()
const { session } = storeToRefs(store)
let player = {}
const {err,data} = await supabase.from('player').select().eq('user_id',session.value.user.id)
let first_name = ref("first name")
let last_name = ref("last name")

</script>