"use client"
import { Button, Typography } from "antd";
import Head from "next/head";
import { useState, useEffect } from "react";
import app from "../firebase";
import queryString from 'query-string';
import getFrequencies from "../helper/spotifyRecom";
import GenerateSpotifyPlaylist from "../helper/spotifyHelper"

const { Title, Text } = Typography;
const Notepad = () => {
    // const { user } = UserAuth();
    const [journalEntry, setJournalEntry] = useState("");
    const [result, setResult] = useState();
    const [convo,setConvo] = useState("Tell Me About Your Day")
    const [currEntry, setCurrEntry] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
      console.log("local", localStorage.getItem('token'))
      console.log("Hash", queryString.parse(window.location.hash))
      const { access_token } = queryString.parse(window.location.hash);
      // if (accessToken===undefined || localStorage.getItem('token')===undefined) {
      //   // console.log(window.location.hash, "HASH")
      //   // const { access_token } = queryString.parse(window.location.hash);
      //   console.log(access_token)
      //   localStorage.setItem('token', access_token);
      // }
      if(access_token){
        localStorage.setItem('token', access_token);
      }
      // var token = localStorage.getItem('token')
      setAccessToken(access_token)
      console.log(accessToken);
    }, []);


    const handleTextareaChange = (event) => {
        setJournalEntry(event.target.value);
      };
    
      const handlePressEnter = (event) => {
        if (event.keyCode === 13) {
          // Enter key
          event.preventDefault();
          submitEntry()
        }
      };
      //Submit journal will push data to db
      const submitJournal = async (event)=>{
        //Create entry id 
        const id = sessionStorage.getItem("email").replace(/\./g, "");;
        const date = new Date()
        const time = date.getTime()
        
        try {
            const response = await fetch ("/api/getVector",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({messages:journalEntry})
            });
        const data = await response.json();
        // setResult(data.result);
        console.log("NOTEPAD")
        sessionStorage.setItem("Emotions", JSON.stringify(data))
        const frequencyMappings = getFrequencies(data, 20)
        
        console.log(data)
        console.log(frequencyMappings)

        const playlistUrl = await GenerateSpotifyPlaylist(frequencyMappings, accessToken)
        sessionStorage.setItem("playlistUrl", playlistUrl)
        
        //Check if it's 200
        } catch (error) {
            console.log(error)
        }
        const sesh = 
        {   
            date: date,
            time:time,
            entry:currEntry,

        }
        const reference = app.database().ref("users").child(id).child("sessions")
        const append = reference.push()
        append.set(sesh)
        setJournalEntry("");
        console.log(event)
        //Get db ref 
        
      }
      //Feed this to LLM + (Summarizer + Roberta)
      const submitEntry = async () =>{
        currEntry.push(journalEntry)
        console.log("ENtry submission")
        console.log(journalEntry)
        
        try {
            const response = await fetch ("/api/generate",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({ messages: journalEntry})
            });
        const data = await response.json();
        if(response.status!=200){
            throw(new Error(`${response.status}`))

        }
        // setResult(data.result);
        sessionStorage.setItem("emotion",data.result)
        
        //Check if it's 200
        } catch (error) {
            console.log(error)
        }
      }
    return (
        <>
          <Head>
            <title>MindMap</title>
          </Head>
          <main className="bg-[#040D12]  h-screen m-0 w-full">
              
              <div className="flex flex-col justify-items-center items-center">
                <p className="text-4xl justify-self-start text-white mt-[0.04em] pt-8 mb-[1em] self-start ml-[5em]">{convo}</p>
                <textarea
                className="w-3/4 h-[15em] p-2 border-[0.02em] rounded-md text-base text-white focus:ring focus:border-blue-500 resize-y bg-neutral-900"                  placeholder="Enter journal entry"
                value={journalEntry}
                onChange={(e) => handleTextareaChange(e)}
                name="journalEntry"
                onKeyDown={handlePressEnter}
                />
              <Button className="w-[8em] mt-5 bg-gray-800 text-white" onClick={(e) => submitJournal(e)}>
                Save Entry
              </Button>
              </div>
            
          </main>
        </>
      );

}

export default Notepad
