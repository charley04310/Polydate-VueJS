import axios from 'axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IConnectedUser extends ICreateUser {
  userId: number;
  userRoleId: USER_ROLE;
}

export interface ICreateUser {
  userFirstname: string;
  userLastname: string;
  userCity: string;
  userGenreId: number;
  userEmail: string;
  userPassword: string;
  userIciPourId: number | string;
  userDescription: string;
}

export interface ILoginUser {
  userEmail: string;
  userId?: number;
  userPassword: string;
}

export type IAddNewUser = ICreateUser;

export interface IToken {
  value: string;
  cookieExpiration: string;
}

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    isNewUser: false,
    connectedUser: undefined as ICreateUser | undefined | ILoginUser,
    token: undefined as IToken | undefined,
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.connectedUser !== undefined;
    },
  },
  actions: {
    async tryToConnectWithCookies() {
      this.connectedUser = Cookies.get('user_polydate')
        ? (Cookies.get('user_polydate') as ILoginUser)
        : undefined;

      console.log(this.connectedUser);
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
      const loginUser = await axios.post(
        'http://localhost:8090/auth/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (loginUser.status === 200) {
        Cookies.set('token_polydate', loginUser.data.token, {
          secure: true,
          sameSite: 'Strict',
          expires: '3h 5m',
        });

        Cookies.set('user_polydate', loginUser.data.user, {
          secure: true,
          sameSite: 'Strict',
          expires: '3h 5m',
        });

        this.connectedUser = loginUser.data.token;

        this.router.push({ path: '/home' });
      }
    },
  },
});
