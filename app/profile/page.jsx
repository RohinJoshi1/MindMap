'use client';
import React from 'react'
import { useEffect, useState } from 'react';

//new
import queryString from 'query-string';

const page = () => {
  const [frequencyUri, setFrequencyUri] = useState({
    "432": '37i9dQZF1DX3DRt77Ekehy',
    "528": '37i9dQZF1DWTvEFX6xtoQd',
    "639": '37i9dQZF1DXdsUypiO3RNF',
    "741": '37i9dQZF1DX9t48dpVo99H',
    "852": '37i9dQZF1DX10jlupqH0Bt',
    "396": '37i9dQZF1DX9JGJTJ2WFXi'
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  // const [finalTracks, setFinalTracks] = useState([]);

  useEffect(() => {
    setAccessToken(localStorage.getItem('token'));
    console.log(accessToken);
    console.log(frequencyUri["432"]);
  }, [])


  //new stuff
  const handleLogin = () => {
    const clientID = 'ac7e13fcbc7c4618ae8a92a4709d0fb4';
    const redirectURI = 'http://localhost:3000'; // Must match the one in your Spotify Developer App settings
    const scope = 'user-read-private user-read-email playlist-modify-public'; // Add any required scopes
    const clientSecret = "aba1bdbe2dc548aa99a38068ca83a38b"

    const queryParams = queryString.stringify({
      client_id: clientID,
      redirect_uri: redirectURI,
      clientSecret: clientSecret,
      scope: scope,
      response_type: 'token',
    });

    // Redirect the user to Spotify's authorization page
    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  const getPlaylistSongsById = async (id, limit) => {
    // const { accessToken } = localStorage.getItem('token');
    console.log("Entered GetPLaylist function");
    console.log(id, "Nop");

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
      console.log(data);
      console.log("data")
      data = data['tracks']['items']
      console.log(data);

      var i = 0
      var tracks = []
      console.log(tracks)
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

      console.log(tracks)
      console.log("Exited GetPLaylist function");
      return tracks
      // setFinalTracks(tracks)

    }
    catch (error) {
      // Handle any errors
      console.log("Exited GetPLaylist function with errors");
      console.error('Error:', error);
    }
  }

  const createPlaylist = async (name, finalTracks) => {

    try {
      var resp = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      let data = await resp.json();
      console.log(data);
      const userId = data.id;
      console.log(userId);


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
      const playlistId = resp.id;
      console.log(playlistId);

      addSongsToPlaylist(accessToken, playlistId, finalTracks);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addSongsToPlaylist = async (accessToken, playlistId, tracks) => {
    console.log("Yes another", tracks)
    const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`; // Endpoint for adding tracks to a playlist
    console.log(tracks);
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

      console.log(resp);
      resp = await resp.json();
      if (resp.status === 201) {
        console.log('Tracks added to the playlist successfully.');
      } else {
        console.error('Failed to add tracks to the playlist.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const TestInput = async (input) => {
    try {
      console.log(input)
      let finalTracks = []
      var frequencies = Object.keys(input)
      for (var i = 0; i < frequencies.length; i++) {
        console.log(frequencies[i], "frequency")
        let tracks = await getPlaylistSongsById(frequencyUri[frequencies[i]], input[frequencies[i]])
        console.log(tracks, "tracks inside TestInput")
        finalTracks = finalTracks.concat(tracks)
      };

      console.log(finalTracks, "FINAL PLAYLIST")
      createPlaylist("TestPlaylist", finalTracks)
      console.log("done")
    }
    catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <>
      <div>Profile</div>
      <button onClick={handleLogin}>Login with Spotify</button>
      <br />
      <button onClick={() => { getPlaylistSongsById("37i9dQZF1DX3DRt77Ekehy", 10) }}>Get playlist</button>
      <br />
      <button onClick={() => { createPlaylist("TestPlaylist", []) }}>create playlist</button>
      <br />
      <button onClick={() => {
        TestInput(
          { '432': 10, '639': 6, '852': 4 }
        )
      }}>Process Input and generate Playlist</button>
    </>
  )
}

export default page