import axios from 'axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { ICreateUser, useAuthStore } from './authStore';

export const useUserStore = defineStore('User', {
  state: () => ({
    connectedUser: undefined as ICreateUser | undefined,
  }),
  getters: {},
  actions: {
    async getUserInformation() {
      const authStore = useAuthStore();

      try {
        const url = `http://localhost:8090/api/user/${authStore.cookieUser?.userId}`;
        const loginUser = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
            Cookie: authStore.token,
          },
        });

        if (loginUser.status === 200) {
          console.log(loginUser.data);
          this.connectedUser = loginUser.data;
        } else {
          this.connectedUser = undefined;
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  },
});
