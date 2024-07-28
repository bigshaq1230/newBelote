export function handleError(error) {
    if (error) {
        console.error(error)
    }
}
export async function resolve_avatar_url(players) {
    function isValidFormat(str) {
        const pattern = /^\d+\.\w+$/
        return pattern.test(str)
    }

    players.value.forEach(async (player) => {
        if (!player.avatar_url) return

        if (isValidFormat(player.avatar_url)) {
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
        } else {
            player.on_device_url = player.avatar_url
        }
    })
}

