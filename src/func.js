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
        else {
           player.on_device_url = "https://kdlxtzhasiprakduoeuv.supabase.co/storage/v1/object/public/avatars//"+player.avatar_url
        }

    })
}

