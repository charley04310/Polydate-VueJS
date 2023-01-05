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
        const url = `http://localhost:8090/api/user/${authStore.cookieUser?.userId}`;
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
      try {
        const addUser = await axios.post(
          'http://localhost:8090/api/user',
          newUser,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (addUser.status === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
        /*     for (let i = 0; i < error.response.data.length; i++) {
          console.log(error.response.data[i].property);
        } */
      }
    },

    async updateUserInformation(user: ICreateOrEditUser) {
      try {
        const url = 'http://localhost:8090/api/user';
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
      try {
        const url = `http://localhost:8090/api/images/upload/${authStore.cookieUser?.userId}`;
        const formData = new FormData();
        formData.append('image', image);
        await axios.post(url, formData, {
          withCredentials: true,
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });

        // console.log(updateUser);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUserImage(imageLink: string) {
      try {
        const url = imageLink;
        await axios.delete(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        //  console.log(imageUser);
      } catch (error) {
        console.log(error);
      }
    },

    async addOrUpdateProfileImage() {
      try {
        const url = 'http://localhost:8090/api/user/image';
        await axios.put(
          url,
          { userImageLink: 'imageLink' },
          {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
            },
          }
        );
        //  console.log(updateImageUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
