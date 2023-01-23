import API from "../configs/api.config";
import { ApiServiceClass } from "../types/types";

class ApiService {
  API: typeof API;

  constructor() {
    this.API = API;
  }

  async authSession(id: string) {
    try {
      if (!id) throw new Error("No session id provided.");

      const {
        data: { data },
      } = await this.API.get(`/challenge/session/${id}`);

      return {
        isValid: true,
        sessionId: data.id,
        userId: data.user_id,
        challengeId: data.challenge_id,
      };
    } catch (err) {
      return {
        isValid: false,
        error: err,
      };
    }
  }
}

export default new ApiService() as ApiServiceClass;
