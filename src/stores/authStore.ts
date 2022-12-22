import axios from 'axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IConnectedUser extends ICreateOrEditUser {
  userId: number;
  userRoleId: USER_ROLE;
}

export interface ICreateOrEditUser {
  userId?: number;
  userFirstname: string;
  userLastname: string;
  userCity: string;
  userSchoolId: number | string;
  userGenreId: number;
  userEmail: string;
  userPassword?: string;
  userIciPourId: number | string;
  userDescription: string;
}

export interface ICookieUser {
  userId: number;
  userFirstname: string;
  userEmail: string;
}

export interface ILoginUser {
  userEmail: string;
  userPassword: string;
}

export type IAddNewUser = ICreateOrEditUser;

export interface IToken {
  value: string;
  cookieExpiration: string;
}

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    isNewUser: false,
    connectedUser: undefined as ICreateOrEditUser | undefined,
    cookieUser: undefined as ICookieUser | undefined,
    token: undefined as IToken | undefined,
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.cookieUser !== undefined;
    },
  },
  actions: {
    async tryToConnectWithCookies() {
      this.cookieUser = Cookies.get('user_polydate')
        ? (Cookies.get('user_polydate') as ICookieUser)
        : undefined;
      this.token = Cookies.get('token_polydate')
        ? (Cookies.get('token_polydate') as IToken)
        : undefined;

      console.log(this.cookieUser);
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
          this.isNewUser = true;
        }
      } catch (error: any) {
        for (let i = 0; i < error.response.data.length; i++) {
          console.log(error.response.data[i].property);
        }
      }
    },

    async loginUser(user: ILoginUser) {
      try {
        const loginUser = await axios.post(
          'http://localhost:8090/auth/login',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        this.cookieUser = {
          userId: loginUser.data.user.userId,
          userFirstname: loginUser.data.user.userFirstname,
          userEmail: loginUser.data.user.userEmail,
        };

        if (loginUser.status === 200) {
          Cookies.set('token', loginUser.data.token, {
            secure: false,
            sameSite: 'Lax',
            expires: '3h 5m',
          });

          Cookies.set('user_polydate', JSON.stringify(this.cookieUser), {
            secure: false,
            sameSite: 'Lax',
            expires: '3h 5m',
          });

          this.router.push({ path: '/home' });
        }
      } catch (error: any) {
        console.log(error);
      }
    },

    async logoutUser() {
      try {
        Cookies.remove('token_polydate');
        Cookies.remove('user_polydate');
        this.cookieUser = undefined;
        this.token = undefined;
        this.router.push({ path: '/login' });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
