import axios from 'axios';

export class APIService {
  static readonly baseURL: string = '/api'; 

  static async post(url: string, data: any) {
    try {
      const response = await axios.post(`${this.baseURL}${url}`, data);
      return response.data;
    } catch (error:any) {
      console.error('API POST Error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      throw error;
    }
  }

  static async get(url: string) {
    try {
      const response = await axios.get(`${this.baseURL}${url}`);
      return response.data;
    } catch (error:any) {
      console.error('API GET Error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
      throw error;
    }
  }
}
