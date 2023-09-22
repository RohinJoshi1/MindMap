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
              <main className="ml-6 bg-[#040D12]">
                  <p className="text-4xl text-white mt-[1.5em] mb-[1em] ml-[4em]">Tell me about your day</p>
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
