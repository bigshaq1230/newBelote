<template>
    <table>
        <tr>
            <td><label>Team A name:</label>
            <input type="text" v-model="team_A"></td>
            <td>p1:</td><td><select name="" id="" v-model="p1"><option  v-for="p in players" >{{ p.user_id }}</option></select></td>
            <td>p2:</td><td><select name="" id="" v-model="p2"><option  v-for="p in players" >{{ p.user_id }}</option></select></td>
        </tr>
        <tr>
            <td><label>Team B name:</label>
            <input type="text" v-model="team_B"></td>
            <td>p3:</td><td><select name="" id="" v-model="p3"><option  v-for="p in players" >{{ p.user_id }}</option></select></td>
            <td>p4:</td><td><select name="" id="" v-model="p4"><option  v-for="p in players" >{{ p.user_id }}</option></select></td>
        </tr>
    </table>
    <button @click="start">start match</button>
    </template>

<script setup>
import { handleError } from '@/func';
import router from '@/router';
import { useData } from '@/stores/data';
import { supabase } from '@/supabase/supabase';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useData()
const { players, team_A, team_B, p1,p2,p3,p4,session,changes,matches } = storeToRefs(store)

async function start (){
    // handle form goes here
    const date = Date.now()
    const match = {
        team_A: team_A.value,
        team_B: team_B.value,
        p1:p1.value,
        p2:p2.value,
        p3:p3.value,
        p4:p4.value,
        id : date,
    }
    console.log(match)
    const match2 = JSON.parse(JSON.stringify(match))
    match2.rounds = []
    matches.value.push(match2)
    try {

        if (!session.value) {
            changes.value.matches.edited.push(match)
        }
        else {
            const { error } = await supabase.from('match').insert(match)
            handleError(error)
        }
    }
    catch (error) {handleError(error)}
    finally {
        router.push('/match/'+date)
    }

}

</script>

<style>

</style>