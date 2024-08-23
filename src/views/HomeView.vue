<template>
    <table>
        <tr>
            <td><label>Team A name:</label>
                <input type="text" v-model="team_A">
            </td>
            <td>
                <PlayerSelection :players="list[0]" :index="0" @selected="handleSelect" />
            </td>
            <td>
                <PlayerSelection :players="list[1]" :index="1" @selected="handleSelect" />
            </td>
        </tr>
        <tr>
            <td><label>Team B name:</label>
                <input type="text" v-model="team_B">
            </td>
            <td>
                <PlayerSelection :players="list[2]" :index="2" @selected="handleSelect" />
            </td>
            <td>
                <PlayerSelection :players="list[3]" :index="3" @selected="handleSelect" />
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
const list = ref(Array(4).fill().map(() => [...players.value]));

let Plist = [p1,p2,p3,p4]
watch(players, () => {
    list.value = Array(4).fill().map(() => [...players.value]);
    console.log(list.value);
});

const handleSelect = ({ id, index }) => {

    Plist[index].value = id
    list.value = list.value.map((playerList, i) => {
        if (i !== index) {
            return playerList.filter(player => player.user_id !== id);
        }
        return playerList;
    });
};

async function start() {
    const date = Date.now();
    const match = {
        team_A: team_A.value,
        team_B: team_B.value,
        p1: p1.value,
        p2: p2.value,
        p3: p3.value,
        p4: p4.value,
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