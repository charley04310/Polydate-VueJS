import axios from 'axios';
import { defineStore } from 'pinia';
import { Message } from 'src/pages/match/IndexMessagesPage.vue';
import {
  ICreateOrEditUser,
  IMatchWithUser,
  IMessageUser,
  IUserImages,
  useAuthStore,
} from './authStore';

const authStore = useAuthStore();
export interface IMatcheUser {
  matchId: string;
  matchSrcId: IMatchWithUser;
  matchDstId: IMatchWithUser;
  matchStatId: number;
  matchTypeId: number;
  matchDate: Date;
}
export const usePolydateStore = defineStore('Polydate', {
  state: () => ({
    userFeed: undefined as ICreateOrEditUser | undefined,
    userFeedImages: undefined as IUserImages[] | undefined,
    userMatches: undefined as IMatcheUser[] | undefined,
    userTalkToSomeOne: undefined as IMessageUser | undefined,
  }),
  getters: {
    isTalkingToSomeOne(): boolean {
      return this.userTalkToSomeOne !== undefined;
    },
  },
  actions: {
    async getRandomUserBygenre(genre: number) {
      try {
        const url = `http://localhost:8090/api/user/feed/${genre}/${authStore.cookieUser?.userId}`;
        const randomUser = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        this.userFeed = randomUser.data;
        // console.log(randomUser.data.__images__);
        if (randomUser.data.__images__.length > 0) {
          this.userFeedImages = randomUser.data.__images__;
        } else {
          this.userFeedImages = undefined;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async likeUser(type: number) {
      try {
        const url = 'http://localhost:8090/api/match/start';
        const match = await axios.post(
          url,
          { matchDstId: this.userFeed?.userId, matchTypeId: type },
          {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
            },
          }
        );
        return match;
      } catch (error) {
        console.log(error);
      }
    },

    async getAllMatches() {
      const userId = authStore.cookieUser?.userId;
      try {
        const url = `http://localhost:8090/api/match/obtenir/${userId}`;
        const matches = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });

        this.userMatches = matches.data;

        //console.log(this.userMatches);
      } catch (error) {
        console.log(error);
      }
    },
    async valideOrRefuseMatche(matchSrcId: number, valideOrRefused: number) {
      try {
        const url = 'http://localhost:8090/api/match/validation';
        await axios.put(
          url,
          { matchSrcId: matchSrcId, matchStatId: valideOrRefused },
          {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
            },
          }
        );
        // console.log(valideOrRefuse);
      } catch (error) {
        console.log(error);
      }
    },

    async sendMessageToUser(
      message: string,
      matchId: number,
      receiver: number
    ) {
      try {
        const url = 'http://localhost:8090/api/messages/envoyer';
        const messageUser = await axios.post(
          url,
          {
            userId: authStore.cookieUser?.userId,
            userDstId: receiver,
            matchId: matchId,
            message: message,
          },
          {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
            },
          }
        );
        console.log(message);
        return messageUser;
      } catch (error) {
        console.log(error);
      }
    },

    async getAllMessagesByMatchId(
      matchId: number
    ): Promise<Message[] | undefined> {
      try {
        const url = `http://localhost:8090/api/messages/otenir/${matchId}`;
        const messages = await axios.get(url, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        });
        return messages.data;
      } catch (error) {
        return undefined;
      }
    },
  },
});
