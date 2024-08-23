export function handleError(error) {
    if (error) {
        console.error(error)
    }
}
import { supabase } from "./supabase/supabase";
export async function resolve_avatar_url(players) {
    console.log("players from resolve avatars: ",players)
    players.value.forEach(async (player) => {   
        if (!player.avatar_url) return

        try {
            console.log(`Downloading avatar for player: ${player.avatar_url}`);
            const { error, data } = await supabase.storage.from('avatars').download(player.avatar_url)
            if (error) throw error
            if (!data) throw new Error('No data returned from Supabase')

            const url = URL.createObjectURL(data)
            console.log(`Resolved URL: ${url}`);
            player.on_device_url = url

        } catch (error) {
            console.error('Error downloading avatar:', error)
        }

    })
}

