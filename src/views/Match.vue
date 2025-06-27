<template>
    <table v-if="index !== -1">
        <tr>
            <td>
                {{match.team_A}}: {{ totalA }}
            </td>
            <td>
                 {{ match.team_B }}: {{ totalB }}</td>
        </tr>
        <tr>
            <td><Player :player="p1" :can_be_unavailable="false"/>
                <Player :player="p2":can_be_unavailable="false"/>
                </td>
                <td>
                <Player :player="p3" :can_be_unavailable="false"/>
                <Player :player="p4":can_be_unavailable="false"/>

                </td>
        </tr>
        <tr v-for="round in match.rounds" :key="round.id">
            <td>{{ round.scoreA }}</td>
            <td>{{ round.scoreB }}</td>
        </tr>
        <tr>
            <td><input type="number" id="scoreA" v-model="scoreA"></td>
            <td><input type="number" id="scoreB" v-model="scoreB"></td>
            <td><button @click="add">add!</button></td>
        </tr>
    </table>
    <div v-else>
        <p>Match not found</p>
    </div>
</template>

<script setup>
import { useData } from '@/stores/data';
import { supabase } from '@/supabase/supabase';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Player from '@/components/Player.vue';
const route = useRoute();
const scoreA = ref(0);
const scoreB = ref(0);
const store = useData();
const { session, changes, matches,p1,p3,p2,p4,players } = storeToRefs(store);
let index = matches.value.findIndex((l) => l.id == route.params.id)
let match = ref(matches.value[index])
if (index.value === -1) {
    console.error(`Match with id ${route.params.id} not found`);
}
console.log(index)
console.log(match.value)
console.log(matches.value)
p1.value = players.value.find( (e) => e.user_id === match.value.p1)
p2.value = players.value.find( (e) => e.user_id === match.value.p2)
p3.value = players.value.find( (e) => e.user_id === match.value.p3)
p4.value = players.value.find( (e) => e.user_id === match.value.p4)


async function add() {
    const round = {
        scoreA: scoreA.value,
        scoreB: scoreB.value,
        match_id: route.params.id,
        id: Date.now()
    };
    if (!session.value) {
        changes.value.rounds.edited.push(round);
    } else {
        const { error } = await supabase.from('round').upsert(round);
        if (error) console.error(error);
    }
    match.value.rounds.push(round);
    scoreA.value = 0;
    scoreB.value = 0;
}

const totalA = computed(() => match.value?.rounds.reduce((sum, round) => sum + round.scoreA, 0) || 0);
const totalB = computed(() => match.value?.rounds.reduce((sum, round) => sum + round.scoreB, 0) || 0);


</script>