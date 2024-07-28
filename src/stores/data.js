import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('data', () => {

  let session = ref()
  let player = ref(JSON.parse(localStorage.getItem('player')) || {
    first_name: "first_name here",
    last_name: "last_name here",
    user_id: -1
  })
  let players = ref(JSON.parse(localStorage.getItem('players')) || [])
  players.value.push(player.value)
  let matches = ref(JSON.parse(localStorage.getItem('matches')) || [])


  let changes = ref(JSON.parse(localStorage.getItem('changes')) || {

    player: {},

    rounds: {
      table: 'round',
      edited: [],
      removed: []
    },

    matches: {
      table: 'match',
      edited: [],
      removed: []
    }
  })
  return { changes, players, session, matches, player }
})
