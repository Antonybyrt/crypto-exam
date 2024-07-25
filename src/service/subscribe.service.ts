import { APIService } from './api.service';

export const subscribeService = {
  subscribe: async (address: string, name: string) => {
    try {
      const response = await APIService.post('/subscribe', { address, name });
      return response;
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error;
    }
  },
};
