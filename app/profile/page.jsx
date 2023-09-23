"use client";
import React from 'react'
import {Button} from 'antd'
import {Image} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const data1 = [
  {
    subject: "Happy",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Sad",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "neutral",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "anger",
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: "confusion",
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: "fear",
    A: 65,
    B: 85,
    fullMark: 150
  }
];

const data2 = [
  {
    name: "1",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "2",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "3",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "4",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "5",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "6",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "7",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const page = () => {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));

  const [emotion, setEmotion] = useState(sessionStorage.getItem("Emotions"));
  const [data, setData] = useState(data1)

  useEffect(() => {
    console.log(emotion)
    const emotionJSON = JSON.parse(emotion)
    if (!emotionJSON){
      setData(data1)
    }
    else{
      const newData = Object.keys(emotionJSON).map(label => ({
        subject: label.charAt(0).toUpperCase() + label.slice(1), // Capitalize the first letter
        A: Math.round(emotionJSON[label] * 100), // Assuming the full mark is 100
        fullMark: 100
      }));
      setData(newData);
    }
    
    setAccessToken(localStorage.getItem('token'));
    console.log(accessToken);
  }, [])

  //new stuff
  const handleLogin = () => {
    const clientID = 'ac7e13fcbc7c4618ae8a92a4709d0fb4';
    const redirectURI = 'http://localhost:3001'; // Must match the one in your Spotify Developer App settings
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

  return (
    <div>
        <div className='flex justify-end mr-[2em] mt-[2em]'>
          <Button className='w-[6em] h-[4.5em]' onClick={handleLogin}>
            <Image
                removeWrapper
                alt="Spotify"
                className="z-0 w-full h-full object-cover rounded-xl"
                src="/images/spotify.png"
              />
          </Button>
        </div>
        <div className="flex flex-row flex-wrap content-center justify-around p2 w-[100]">
        <div >
          <RadarChart
            cx={300}
            cy={250}
            outerRadius={150}
            width={500}
            height={500}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </div>
        <div className="mt-20">
          <LineChart
            width={500}
            height={300}
            data={data2}
            margin={{
              top: 2,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid  />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>


  )
}

export default page