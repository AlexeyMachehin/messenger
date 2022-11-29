import {AuthorizationAPI} from "../api/auth";
import { storeCurrentUser } from "../store/storeCurrentUser";
import { store } from "../store/store";

const authorizationAPI = new AuthorizationAPI();

export default class UserController {
  async signIn(data: { login: string; password: string }): Promise<boolean> {
    try {
      await authorizationAPI.signIn(data);
      store.set("isAuth", true);
      return true;
    } catch {
      store.set("isAuth", false);
      return false;
    }
  }

  async signUp(data: { login: string; password: string }): Promise<boolean> {
    try {
      await authorizationAPI.signUp(data);
      store.set("isAuth", true);
      return true;
    } catch (error) {
      alert(`Server error ${error}`);
      store.set("isAuth", false);
      return false;
    }
  }

  async getUser(): Promise<boolean> {
    try {
      const data = await authorizationAPI.getUser();
      store.set("isAuth", true);
      storeCurrentUser.set("currentUser", data);
      return true;
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    await authorizationAPI.logout();
    store.set("isAuth", false);
    store.set("currentUser", null);
  }
}
