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
import {app} from "../firebase";
import styles from "./index.module.css";
const { Title, Text } = Typography;
const Notepad = () => {
    const { user } = UserAuth();
    const [journalEntry, setJournalEntry] = useState("");
    const [result, setResult] = useState();
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
      const submitJournal = (event)=>{
        //Create entry id 
        const id = user;
        const date = new Date()
        const time = date.getTime()
        const sesh = 
        {   
            date: date,
            time:time,
            entry:currEntry
        }
        const reference = app.database().ref("users").child(id).child("sessions")
        const append = reference.push()
        append.set(sesh)
        alert("Saved");
        console.log(event)
        //Get db ref 
        


      }
      //Feed this to LLM + (Summarizer + Roberta)
      const submitEntry = async () =>{
        currEntry.push(journalEntry)
        try {
            const res = await fetch ("/api/getVector",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({message:journalEntry})
            });
        const data = await response.json();
        setResult(data.result);
        setJournalEntry("");
        //Check if it's 200
        } catch (error) {
            console.log(error)
        }
      }
        return (
            <>
              <Head>
                <title>Enhanced Journal</title>
              </Head>
        
              <main className={styles.main}>
                  <Title level={2}>How are you feeling today?</Title>
                <textarea
                  className={styles.focused}

                  placeholder="Enter journal entry"
                  value={journalEntry}
                  onChange={(e) => handleTextareaChange(e)}
                  name="journalEntry"
                  onKeyDown={handlePressEnter}
                />
                <Button className={styles.save} onClick={(e) => submitJournal(e)}>
                  Save Entry
                </Button>
              </main>
            </>
          );

}

export default Notepad
