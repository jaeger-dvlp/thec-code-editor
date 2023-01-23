import API from "../configs/api.config";

class ApiService {
  API: typeof API;

  constructor() {
    this.API = API;
  }

  async getChallenge() {
    try {
      const {
        data: { data, error },
      } = await this.API.get("/challenge");

      if (error) {
        throw new Error(error);
      }

      return data;
    } catch (err) {
      return console.log(err);
    }
  }
}

export default new ApiService();
