import { APIService } from './api.service';
import CryptoJS from 'crypto-js';

export const hashService = {
  requestHashChallenge: async (address: string) => {
    return await APIService.get(`/challenge/hash/${address}`);
  },

  submitHashSolution: async (address: string, challengeID: string, phrase: string) => {
    const hash = CryptoJS.SHA256(phrase).toString(CryptoJS.enc.Hex);
    return await APIService.post(`/challenge/hash/${address}/${challengeID}`, { hash });
  },
};
