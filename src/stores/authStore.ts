import axios from 'axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';

export enum USER_ROLE {
  USER = 1,
  ADMIN = 2,
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
  userRoleId?: USER_ROLE;
  userSchoolId: number;
  userGenreId: number;
  userEmail: string;
  userPassword?: string;
  userIciPourId: number | string;
  userDescription: string;
}
export interface IMatchWithUser {
  userId: number;
  userFirstname: string;
  userLastname: string;
  userImage?: IUserImages[];
}

export interface IMessageUser {
  matchId: number;
  sender: number;
  receiver: number;
  message?: string;
  messageDate?: string;
}

export interface IUserMatch {
  userId?: number;
  userFirstname: string;
  userLastname: string;
  userCity: string;
  userSchoolId?: number;
  userGenreId: number;
  userIciPourId: number | string;
  userDescription: string;
}

export interface IUserImages {
  imageId: number;
  imageDate: string;
  imageUserId: number;
  imageLink: string;
}

export interface ICookieUser {
  userId: number;
  userRoleId: USER_ROLE;
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
}

export const useAuthStore = defineStore('Auth', {
  state: () => ({
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
        ? Cookies.get('user_polydate')
        : undefined;
    },

    async loginUser(user: ILoginUser) {
      const loginUser = await axios.post(
        'https://cluster-2022-5.dopolytech.fr/api/auth/login',
        user,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.cookieUser = {
        userId: loginUser.data.user.userId,
        userRoleId: loginUser.data.user.userRoleId,
        userFirstname: loginUser.data.user.userFirstname,
        userEmail: loginUser.data.user.userEmail,
      };

      Cookies.set('user_polydate', JSON.stringify(this.cookieUser), {
        secure: true,
        sameSite: 'Lax',
        expires: '4h 5m',
      });

      this.router.push({ path: '/polydate' });
    },

    async logoutUser() {
      try {
        await axios.post(
          'https://cluster-2022-5.dopolytech.fr/api/auth/logout',
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
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
