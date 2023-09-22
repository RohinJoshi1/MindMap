"use client"
import { Button, Typography } from "antd";
import firebase from "firebase/app";
import Head from "next/head";
import Link from "next/link";
import {Textarea} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import toast from "react-simple-toasts";
import app from "../firebase";
import styles from "./index.module.css";
const { Title, Text } = Typography;
const Notepad = () => {
    // const { user } = UserAuth();
    const [journalEntry, setJournalEntry] = useState("");
    const [result, setResult] = useState();
    const [convo,setConvo] = useState("Tell me about your day")
    const [currEntry, setCurrEntry] = useState([]);
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
        sessionStorage.setItem("Emotions",JSON.stringify(data))
        console.log(data)
        
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
        alert("Saved");
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
                  <main className="ml-6 bg-[#040D12]">
                      <p className="text-4xl text-white mt-[1.5em] mb-[1em] ml-[4em]">{convo}</p>
                      <div className="flex flex-col justify-center items-center">
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
