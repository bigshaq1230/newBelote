import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('data', () => {
  let team_A = ref("team_A")
  let team_B = ref("team_B")
  let p1 = ref({user_id:null})
  let p2 = ref({user_id:null})
  let p3 = ref({user_id:null})
  let p4 = ref({user_id:null})
  let session = ref()
  let player = ref(JSON.parse(localStorage.getItem('player')) || {
    first_name: "first_name here",
    last_name: "last_name here",
    user_id: -1
  })
  let players = ref(JSON.parse(localStorage.getItem('players')) || [])
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
  return { changes, players, session, matches, player, team_A, team_B, p1, p2, p3, p4 }
})
