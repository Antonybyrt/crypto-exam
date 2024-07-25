"use client"
import { useState, useEffect } from 'react';
import { subscribeService } from '../service/subscribe.service';
import { APIService } from '../service/api.service';
import { hashService } from '../service/hash.service';
import { encryptService } from '../service/encrypt.service';
import CryptoJS from 'crypto-js';

const address = '0x1D1479C185d32EB90533a08b36B3CFa5F84A0E6B';

const Home = () => {
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  useEffect(()=> {
    const fetchScore = async () => {
      try {
        const data = await APIService.get(`/info/${address}`);
        setScore(data.Score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, [])
  const fetchScore = async () => {
    try {
      const data = await APIService.get(`/info/${address}`);
      setScore(data.score);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await subscribeService.subscribe(address, name);
      setMessage(response.message || 'Subscribed successfully!');
    } catch (error) {
      setMessage('Subscription failed');
    }
  };

  const handleHashChallenge = async () => {
    try {
      const challenge = await hashService.requestHashChallenge(address);
      const { challenge_id, sentence } = challenge;
      const hash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(sentence)).toString(CryptoJS.enc.Hex);
      const result = await hashService.submitHashSolution(address, challenge_id, sentence);
      setMessage(result.message);
      fetchScore();
    } catch (error) {
      console.error('Error solving hash challenge:', error);
      setMessage('Failed to solve hash challenge');
    }
  };

  const handleEncryptChallenge = async () => {
    try {
      const challenge = await encryptService.requestEncryptChallenge(address);
      const { sentence, public_key: publicKey, challenge_id: challengeID } = challenge;
      const result = await encryptService.submitEncryptSolution(address, challengeID, sentence, publicKey);
      setMessage(result.message);
      fetchScore();
    } catch (error) {
      console.error('Error solving encrypt challenge:', error);
      setMessage('Failed to solve encrypt challenge');
    }
  };

  return (
    <div>
      <h1>Crypto Challenge Client</h1>
      <p>Score: {score !== null ? score : 'Loading...'}</p>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={fetchScore}>Refresh Score</button>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleHashChallenge}>Solve Hash Challenge</button>
      <button onClick={handleEncryptChallenge}>Solve Encrypt Challenge</button>
      <p>{message}</p>
    </div>
  );
};

export default Home;
