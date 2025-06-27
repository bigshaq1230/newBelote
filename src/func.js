export function handleError(error) {
    if (error) {
        console.error(error)
    }
}
import { supabase } from "./supabase/supabase";
export async function resolve_avatar_url(players) {
    players.value.forEach(async (player) => {
        player.selected = false;
        if (!player.avatar_url){player.on_device_url = null; return}

        try {
            const { error, data } = await supabase.storage.from('avatars').download(player.avatar_url)
            if (error) throw error
            if (!data) throw new Error('No data returned from Supabase')

            const url = URL.createObjectURL(data)
            player.on_device_url = url

        } catch (error) {
            console.error('Error downloading avatar:', error)
        }

    })
}

