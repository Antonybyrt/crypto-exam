import { APIService } from './api.service';
import forge from 'node-forge';

export const encryptService = {
  requestEncryptChallenge: async (address: string) => {
    return await APIService.get(`/challenge/encrypt/${address}`);
  },

  submitEncryptSolution: async (address: string, challengeID: string, sentence: string, publicKey: string) => {
    const encrypted = rsaEncrypt(publicKey, sentence);

    return await APIService.post(`/challenge/encrypt/${address}/${challengeID}`, {
      sentence,
      ciphertext: encrypted,
    });
  },
};

const rsaEncrypt = (publicKeyPem: string, message: string) => {
  const cleanedPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyPem
    .replace('-----BEGIN RSA PUBLIC KEY-----', '')
    .replace('-----END RSA PUBLIC KEY-----', '')
    .replace(/\s+/g, '')}\n-----END PUBLIC KEY-----`;

  const publicKey = forge.pki.publicKeyFromPem(cleanedPublicKey);
  
  const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf.mgf1.create(forge.md.sha1.create()),
  });
  
  const encodedEncryptedMessage = forge.util.encode64(encryptedMessage);
  
  return encodedEncryptedMessage;
};
