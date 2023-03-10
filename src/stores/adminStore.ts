import axios from 'axios';
import { defineStore } from 'pinia';
export const useAdminStore = defineStore('Admin', {
  state: () => ({}),
  getters: {},
  actions: {
    async banOrUnBanUser(
      userId: number,
      userStatId: {
        userStatId: number;
      }
    ) {
      try {
        await axios.put(
          `https://cluster-2022-5.dopolytech.fr/api/user/state/${userId}`,
          userStatId,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getAllUserQtable() {
      try {
        const url = 'https://cluster-2022-5.dopolytech.fr/api/user';
        const allUsers = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        return allUsers.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
