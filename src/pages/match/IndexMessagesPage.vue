<script lang="ts">
import io from 'socket.io-client';
import { getRelativeTime } from 'src/utils/date/composable';
import { useRoute } from 'vue-router';
import { IMessageUser, useAuthStore } from 'src/stores/authStore';
import { usePolydateStore } from 'src/stores/polydateStore';

export interface Message {
  messageContent: string;
  messageDate: number;
  messageId?: number;
  messageMatchId: number;
  messageUserId: number;
}
</script>

<template>
  <q-page class="column justify-end q-pa-none q-ml-lg">
    <div class="column q-pr-xl reverse">
      <q-chat-message
        v-for="message in messages"
        :key="message.messageMatchId"
        :text="[message.messageContent]"
        :stamp="getRelativeTime(new Date(message.messageDate))"
        :sent="isSent(message.messageUserId)"
        text-color="white"
        :bg-color="isSent(message.messageUserId) ? 'blue-5' : 'primary'"
        size="12"
      />
    </div>
    <q-input
      bottom-slots
      filled
      v-model="inputMessage"
      bg-color="white"
      label="Label"
    >
      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          @click="sendMessage(inputMessage)"
          color="primary"
          icon="send"
        />
      </template>
    </q-input>
  </q-page>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
const socket = io('https://cluster-2022-5.dopolytech.fr:3000');
const inputMessage = ref('');
const messages = ref<Message[]>([]);

const authStore = useAuthStore();
const polydateStore = usePolydateStore();

const isSent = (sender: number) => {
  return authStore.cookieUser?.userId === sender;
};

onBeforeMount(async () => {
  const route = useRoute();
  const urlId = parseInt(route.path.split('/')[2]);
  let allMessages: Message[] = [];

  const msgs = await polydateStore.getAllMessagesByMatchId(urlId);

  if (msgs === undefined) return;
  allMessages = msgs;

  const userId = authStore.cookieUser?.userId;
  const matchId = polydateStore.userTalkToSomeOne?.matchId;

  messages.value = allMessages;

  console.log({ msg: messages.value });
});

socket.on('message', (data: IMessageUser) => {
  console.log('Message received: ' + data.message);
  if (data.message === undefined) return;
  messages.value.push({
    messageContent: data.message,
    messageDate: Date.now(),
    messageMatchId: data.matchId,
    messageUserId: data.sender,
  });
});

const sendMessage = (message: string) => {
  if (!polydateStore.userTalkToSomeOne) return;

  const matchId = polydateStore.userTalkToSomeOne?.matchId;
  const receiver = polydateStore.userTalkToSomeOne?.receiver;
  const sender = polydateStore.userTalkToSomeOne?.sender;
  const newMessage = polydateStore.sendMessageToUser(
    message,
    matchId,
    receiver
  );

  if (!newMessage) return;

  const messageUser: IMessageUser = {
    matchId: matchId,
    receiver: receiver,
    sender: sender,
    message: message,
  };

  socket.emit('message', messageUser);
  messages.value.push({
    messageContent: message,
    messageDate: Date.now(),
    messageMatchId: matchId,
    messageUserId: sender,
  });
  inputMessage.value = '';
};
// define a function to send messages
</script>
