"use client"
import { Button, Typography } from "antd";
import firebase from "firebase/app";
import Head from "next/head";
import Link from "next/link";
import {Textarea} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-simple-toasts";
import app from "../firebase";
import styles from "./index.module.css";
const { Title, Text } = Typography;
const Notepad = () => {
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
          console.log("do")
        }
      };
      const submitJournal = (event)=>{
        console.log(event)
      }

        return (
            <>
              <Head>
                <title>Enhanced Journal</title>
              </Head>
              <main className="h-screen ml-6">
                  <Title className="text-3xl mt-4">Tell me about your day</Title>
                  <div className="flex flex-col justify-center">
                    <textarea
                    className="w-3/4 h-[15em] p-2 border rounded-md text-base text-gray-700 focus:ring focus:border-blue-500 resize-y"                  placeholder="Enter journal entry"
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
