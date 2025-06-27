<template>
    <table>
        <tr>
            <td><label>Team A name:</label>
                <input type="text" v-model="team_A">
            </td>
            <td>
                <PlayerSelection :players="players" :index="0" @selected="handleSelect" :current-player="p1" />
            </td>
            <td>
                <PlayerSelection :players="players" :index="1" @selected="handleSelect" :current-player="p2" />
            </td>
        </tr>
        <tr>
            <td><label>Team B name:</label>
                <input type="text" v-model="team_B">
            </td>
            <td>
                <PlayerSelection :players="players" :index="2" @selected="handleSelect" :current-player="p3" />
            </td>
            <td>
                <PlayerSelection :players="players" :index="3" @selected="handleSelect" :current-player="p4"/>
            </td>
        </tr>
    </table>
    <button @click="start">start match</button>

    <ul>
        <li v-for="match in matches" >
            <RouterLink :to="`/match/${match.id}`">{{ new Date(match.id).toUTCString() }}</RouterLink>
        </li>
    </ul>

</template>


<script setup>
import { handleError } from '@/func';
import router from '@/router';
import { useData } from '@/stores/data';
import { supabase } from '@/supabase/supabase';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import PlayerSelection from '@/components/PlayerSelection.vue';

const store = useData();
const { players, team_A, team_B, p1, p2, p3, p4, session, changes, matches } = storeToRefs(store);

let Plist = [p1,p2,p3,p4]

// TODO FIX THIS FUCKING PIECE OF SHIT
// I DON'T CARE ANYMORE
const handleSelect = ({ player, index, currentPlayer }) => {
    // Check if the player is not selected and the slot is empty
    console.log(index)
    console.log(Plist[index].value.user_id)
    console.log(player)
    if (!player.selected &&( Plist[index].value.user_id == null)) {
        player.selected = true;
        Plist[index].value = player;
    }
    // Check if the player is selected and matches the current player
    else if (player.selected && currentPlayer.value.user_id === player.user_id) {
        player.selected = false;
        Plist[index].value = { user_id: null };
    }
    // Otherwise, swap the selection
    else {
        if (currentPlayer.value) {
            currentPlayer.value.selected = false;
        }
        player.selected = true;
        Plist[index].value = player;
    }
};

async function start() {
    for (let index = 0; index < Plist.length; index++) {
        const element = Plist[index];
        if (element.value.user_id == null) {
            return
        }
    }
    const date = Date.now();
    const match = {
        team_A: team_A.value,
        team_B: team_B.value,
        p1: p1.value.user_id,
        p2: p2.value.user_id,
        p3: p3.value.user_id,
        p4: p4.value.user_id,
        id: date,
    };
    const match2 = JSON.parse(JSON.stringify(match));
    match2.rounds = [];
    matches.value.push(match2);
    try {
        if (!session.value) {
            changes.value.matches.edited.push(match);
        } else {
            const { error } = await supabase.from('match').insert(match);
            handleError(error);
        }
    } catch (error) {
        handleError(error);
    } finally {
        router.push('/match/' + date);
    }
}
</script>

<style scoped></style>