import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useData = defineStore('counter', () => {
  let session = ref()
  let players = ref(JSON.parse(localStorage.getItem('players')) || [])
  let matches = ref(JSON.parse(localStorage.getItem('matches')) || [])
  let changes = ref(JSON.parse(localStorage.getItem('changes')) || {
    player: {},

    rounds: {
      edited: [],
      removed: []
    },

    matches: {
      edited: [],
      removed: []
    }
  })
  return { changes, players, session, matches }
})
