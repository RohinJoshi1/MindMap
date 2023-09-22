const getPlaylistSongsById = async (id, limit, accessToken) => {

    // Define the Spotify API endpoint for searching for playlists
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`;

    // Make a GET request to the Spotify API
    try {
        const resp = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
        let data = await resp.json();

        data = data['tracks']['items']

        var i = 0
        var tracks = []
        var visited = []
        while (i < limit) {
        let rand = Math.floor((Math.random() * limit) + 1);
        let current_track = data[rand]['track']
        tracks.push(current_track['uri'])
        if (rand in visited) {
            continue
        }
        visited.push(rand)
        i++;
        }
        return tracks

    }
    catch (error) {
        // Handle any errors
        console.log("Exited GetPLaylist function with errors");
        console.error('Error:', error);
    }
}

const createPlaylist = async (name, finalTracks, accessToken) => {

    try {
        var resp = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
        let data = await resp.json();
        const userId = data.id;
        const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`; // Endpoint for creating a playlist

        const playlistData = {
        "name": name,
        "public": true,
        "description": 'New playlist description',
        };


        resp = await fetch(createPlaylistEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData),
        })

        resp = await resp.json();
        console.log(resp, "RESPONSE")
        const playlistId = resp.id;
        console.log(playlistId, "PLAYLIST ID")
        addSongsToPlaylist(accessToken, playlistId, finalTracks);
        return resp.external_urls.spotify
    } catch (error) {
        console.error('Error:', error);
    }
    }

    const addSongsToPlaylist = async (accessToken, playlistId, tracks) => {
    const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`; // Endpoint for adding tracks to a playlist
    try {
        var resp = await fetch(addTracksEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "uris": tracks,
            "position": 0
        }),
        })

        resp = await resp.json();
        if (resp.status === 201) {
        } else {
        console.error('Failed to add tracks to the playlist.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default async function GenerateSpotifyPlaylist (input, accessToken) {
    try {
        const frequencyUri ={
            "432": '37i9dQZF1DX3DRt77Ekehy',
            "528": '37i9dQZF1DWTvEFX6xtoQd',
            "639": '37i9dQZF1DXdsUypiO3RNF',
            "741": '37i9dQZF1DX9t48dpVo99H',
            "852": '37i9dQZF1DX10jlupqH0Bt',
            "396": '37i9dQZF1DX9JGJTJ2WFXi'
        };
        console.log(input)
        let finalTracks = []
        var frequencies = Object.keys(input)
        for (var i = 0; i < frequencies.length; i++) {
            console.log(frequencies[i], "frequency")
            let tracks = await getPlaylistSongsById(frequencyUri[frequencies[i]], input[frequencies[i]], accessToken)
            finalTracks = finalTracks.concat(tracks)
        };

        console.log(finalTracks, "FINAL PLAYLIST")
        const playlistUrl = createPlaylist("Memoirs - Playlist", finalTracks, accessToken)
        console.log("done")
        return playlistUrl
    }
    catch (error) {
        console.error('Error:', error);
    }

}