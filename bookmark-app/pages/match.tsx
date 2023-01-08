import React from "react";
import VideoCall from "../components/match/VideoCall";
import axios from 'axios';

export default function Match() {

  const fetchNftsOwned = () => axios.get('/api/nftsowned');

  console.log('fetchNftsOwned', fetchNftsOwned);

  return (
    <div className="flex h-screen w-screen">
        <VideoCall />
    </div>
  );
}
