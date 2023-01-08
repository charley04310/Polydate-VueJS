import axios from 'axios';
import { defineStore } from 'pinia';
import {
  IAddNewUser,
  ICreateOrEditUser,
  IUserImages,
  useAuthStore,
} from './authStore';

const authStore = useAuthStore();

export interface IMtacheCurrentUser {
  userId?: number;
  userFirstname: string;
  userLastname: string;
  userImageLink: string;
}

export const useUserStore = defineStore('User', {
  state: () => ({
    connectedUser: undefined as ICreateOrEditUser | undefined,
    userImages: undefined as IUserImages[] | undefined,
    sexualOrientation: undefined as number | undefined,
  }),
  getters: {},
  actions: {
    async getUserInformationWithCookie() {
      try {
        const url = `https://cluster-2022-5.dopolytech.fr/api/user/${authStore.cookieUser?.userId}`;
        const loginUser = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        this.connectedUser = loginUser.data;
        //  console.log(this.connectedUser);
        // considerant que la majorité est heterosexuel
        if (loginUser.data.userGenreId === 1) {
          this.sexualOrientation = 2;
        } else {
          this.sexualOrientation = 1;
        }

        if (loginUser.data.__images__.length > 0) {
          this.userImages = loginUser.data.__images__;
        }
      } catch (error) {
        this.connectedUser = undefined;
        console.log(error);
      }
    },

    async saveUserToDataBase(newUser: IAddNewUser) {
      await axios.post(
        'https://cluster-2022-5.dopolytech.fr/api/user',
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },

    async updateUserInformation(user: ICreateOrEditUser) {
      try {
        const url = 'https://cluster-2022-5.dopolytech.fr/api/user';
        await axios.put(url, user, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        this.getUserInformationWithCookie;
      } catch (error) {
        this.connectedUser = undefined;

        console.log(error);
      }
    },

    async addUserImage(image: File) {
      const url = `https://cluster-2022-5.dopolytech.fr/api/images/upload/${authStore.cookieUser?.userId}`;
      const formData = new FormData();
      formData.append('image', image);
      await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
    },

    async deleteUserImage(imageLink: string) {
      const url = imageLink;
      await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json',
        },
      });
    },
  },
});
