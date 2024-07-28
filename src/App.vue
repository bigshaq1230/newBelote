<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from './supabase/supabase'
import { useData } from './stores/data'
import { storeToRefs } from 'pinia'
import { handleError, resolve_avatar_url } from './func'
const store = useData()
const { session, players, player, changes, matches } = storeToRefs(store)


async function syncProperty(obj) {
  const { edited, removed, table } = obj
  if (edited.length > 0) {
    edited.forEach(async (element) => {
      const { errro } = await supabase.from(table).upsert(element)
      if (errro) {
        console.error(errro)
      }
    });
  }
  if (removed.length > 0) {
    const { error } = await supabase.from(table).delete().in('id', removed)
    handleError(error)
  }
}
async function syncPlayer() {
  if (Object.keys(changes.value.player).length <= 0) {
    return
  }
  player.value.user_id = session.value.user.id
  const { error } = await supabase.from('player').upsert(player.value)
  handleError(error)

}

async function getplayers() {
  const { error, data } = await supabase.from('player').select()
  handleError(error)
  players.value = data
  console.log("players from server", data)

}

function ResolveOwnPlayer() {
  if (session.value) {
    const index = players.value.findIndex((l) => l.user_id === session.value.user.id)
    player.value = players.value[index]
  }
  else {
    const index = players.value.findIndex( (l) => l.user_id === -1)
    player.value = players.value[index]
  }
}

onMounted(async () => {
  await supabase.auth.getSession().then(({ data }) => {
    session.value = data.session

  })
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session

  })
  if (session.value) {
    try {

      const { matches } = changes.value

      await syncProperty(matches)
      await syncPlayer()


      await getplayers()
      await resolve_avatar_url(players)
    }
    catch (error) { handleError(error) }
    finally {
      localStorage.removeItem('changes')
    }
  }
  ResolveOwnPlayer()

})
watch(player, () => {
  localStorage.setItem('player', JSON.stringify(player.value))
}, { deep: true })

watch(changes, () => {
  localStorage.setItem('changes', JSON.stringify(changes.value))
}, { deep: true })

watch(matches, () => {
  localStorage.setItem('matches', JSON.stringify(matches.value))
}, { deep: true })


</script>

<template>
  <ul>
    <li>
      <RouterLink to="/account">Account</RouterLink>
    </li>
    <li v-if="!session">
      <RouterLink to="/auth">Authenticate</RouterLink>
    </li>
    <li>
      <RouterLink to="/">New Match</RouterLink>
    </li>
  </ul>
  <RouterView /><br>
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
