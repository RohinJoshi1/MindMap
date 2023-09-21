"use client"
import { Button, Typography } from "antd";
import firebase from "firebase/app";
import Head from "next/head";
import Link from "next/link";
import { Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import app from "../firebase";
import styles from "./index.module.css";

//new
import queryString from 'query-string';


const { Title, Text } = Typography;
const Notepad = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [result, setResult] = useState();
  const [currEntry, setCurrEntry] = useState([]);

  //new
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));

  useEffect(() => {

    if (!accessToken) {
      const { access_token } = queryString.parse(window.location.hash);
      localStorage.setItem('token', access_token);
    }
    var token = localStorage.getItem('token')
    setAccessToken(token)
    console.log(accessToken);
  }, []);

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
  const submitJournal = (event) => {
    console.log(event)
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
          maxW
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
