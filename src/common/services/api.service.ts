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
        data: { valid, started },
      } = await this.API.get(`/challenge/session/${id}`);

      if (!valid) {
        throw new Error("Invalid session id provided.");
      }

      return {
        isValid: true,
        sessionId: id,
        isStarted: started,
      };
    } catch (err) {
      return {
        isValid: false,
        error: err,
      };
    }
  }

  async getChallenge(sessionId: string) {
    try {
      if (!sessionId) throw new Error("No challenge id provided.");

      const {
        data: { data },
      } = await this.API.get(`/challenge/session/${sessionId}/start`);

      return {
        isValid: true,
        challenge: data,
      };
    } catch (error) {
      return error;
    }
  }

  async runCode({ sessionId, code }: { sessionId: string; code: string }) {
    try {
      if (!sessionId) throw new Error("No session id provided.");
      if (!code) throw new Error("No code provided.");

      const formData = new FormData();

      formData.append("session_id", sessionId);
      formData.append("source_code", code);

      const {
        data: { data, error },
      } = await this.API.post(`/challenge/session/runcode`, formData);

      if (error) {
        return {
          isValid: true,
          data: error,
        };
      }

      return {
        isValid: true,
        data,
      };
    } catch (error) {
      return error;
    }
  }

  async submitChallenge({
    sessionId,
    code,
  }: {
    sessionId: string;
    code: string;
  }) {
    try {
      if (!sessionId) throw new Error("No session id provided.");
      if (!code) throw new Error("No code provided.");

      const formData = new FormData();

      formData.append("session_id", sessionId);
      formData.append("source_code", code);

      const {
        data: { error },
      } = await this.API.post(`/challenge/session/submit`, formData);

      if (error) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async leaveChallenge(sessionId: string) {
    try {
      if (!sessionId) throw new Error("No session id provided.");

      const {
        data: { error },
      } = await this.API.post(`/challenge/session/${sessionId}/leave`);

      if (error) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService() as ApiServiceClass;
