import axios from 'axios';
import { defineStore } from 'pinia';
import { ICreateOrEditUser, useAuthStore } from './authStore';

const authStore = useAuthStore();

export const useUserStore = defineStore('User', {
  state: () => ({
    connectedUser: undefined as ICreateOrEditUser | undefined,
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
      } catch (error) {
        console.log(error);
      }
    },

    async updateUserInformation(user: ICreateOrEditUser) {
      try {
        const url = 'http://localhost:8090/api/user';
        const updateUser = await axios.put(url, user, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
            Cookie: authStore.token,
          },
        });

        if (updateUser.status === 200) {
          console.log(updateUser);
          this.getUserInformation;
        } else {
          this.connectedUser = undefined;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addUserImage(image: File) {
      try {
        const url = `http://localhost:8090/images/upload/${authStore.cookieUser?.userId}`;
        const formData = new FormData();
        formData.append('image', image);
        const updateUser = await axios.post(url, formData, {
          withCredentials: true,
          headers: {
            'Content-type': 'multipart/form-data',
            Cookie: authStore.token,
          },
        });

        console.log(updateUser);
      } catch (error) {
        console.log(error);
      }
    },

    async getUserImage() {
      try {
        const url = `http://localhost:8090/images/${authStore.cookieUser?.userId}`;
        const updateUser = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
            Cookie: authStore.token,
          },
        });

        console.log(updateUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
