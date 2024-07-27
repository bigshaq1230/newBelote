<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink,RouterView } from 'vue-router'
import { supabase } from './supabase/supabase'
import { useData } from './stores/data'
import { storeToRefs } from 'pinia'
const store = useData()
const { session,players,player,changes,matches } = storeToRefs(store)


async function getplayers() {
  const { error , data } = await supabase.from('player').select()
  if (error) {
    console.error(error)
  }
  players.value = data
  console.log("players from server",data)
}

onMounted(async() => {
  await supabase.auth.getSession().then(({ data }) => {
    session.value = data.session

  })
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session

  })
  console.log(session.value)
  if(session.value) {
    // here will be also sync the changes made offline
    await getplayers()
  }

})
watch (player,()=> {
  localStorage.setItem('player',player.value)
},{deep:true})

watch (changes,()=> {
  localStorage.setItem('changes',changes.value)
},{deep:true})
watch (matches,()=> {
  localStorage.setItem('matches',matches.value)
},{deep:true})
const index = players.value.findIndex( (l) => l?.user_id == player.value?.user_id)
if (index === -1) {
  players.value.push(player.value)
}
</script>

<template>
  <ul>
    <li ><RouterLink to="/account">Account</RouterLink></li>
    <li v-if="!session"><RouterLink to="/auth">Authenticate</RouterLink></li>
    <li><RouterLink to="/">New Match</RouterLink></li>
  </ul>
  <RouterView />
  <button @click="supabase.auth.signOut()">Sign Out!</button>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
