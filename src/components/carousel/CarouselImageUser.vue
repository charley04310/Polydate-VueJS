<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePolydateStore } from 'src/stores/polydateStore';
import { useQuasar } from 'quasar';

export default defineComponent({});
</script>

<template>
  <q-card class="my-card" bordered v-if="$q.screen.gt.sm">
    <q-carousel
      swipeable
      infinite
      control-type="push"
      animated
      v-model="slide"
      height="580px"
      class="shadow-14"
      ref="carousel"
    >
      <slot v-if="userImage !== undefined">
        <q-carousel-slide
          v-for="(image, index) in userImage"
          :key="index"
          :name="index"
          :img-src="`http://localhost:8090/images/user/${image.imageLink}`"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h5">
              {{ user?.userFirstname }} {{ user?.userLastname }}
            </div>
            <div class="text-subtitle1">{{ userSchool }}</div>
          </div>
        </q-carousel-slide>
      </slot>

      <slot v-else>
        <q-carousel-slide
          :name="slide"
          img-src="https://placeimg.com/500/300/nature"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h5">
              {{ user?.userFirstname }} {{ user?.userLastname }}
            </div>
            <div class="text-subtitle1">{{ userSchool }}</div>
          </div>
        </q-carousel-slide>
      </slot>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn
            push
            round
            dense
            color="secondary"
            text-color="white"
            icon="arrow_left"
            @click="($refs.carousel as any).previous()"
          />
          <q-btn
            push
            round
            dense
            color="secondary"
            text-color="white"
            icon="arrow_right"
            @click="($refs.carousel as any).next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const polydateStore = usePolydateStore();
const $q = useQuasar();

const user = computed(() => {
  return polydateStore.userFeed;
});
const userImage = computed(() => {
  console.log(polydateStore.userFeedImages);
  return polydateStore.userFeedImages;
});
const userSchool = computed(() => {
  switch (polydateStore.userFeed?.userSchoolId) {
    case 1:
      return 'Université Paul Valéry III Montpellier';
    case 2:
      return 'Universite des sciences Montpellier';

    case 3:
      return 'Université de Medcine Montpellier';

    default:
      return 'Ecole maternelle';
  }
});

const slide = ref(0);
</script>

<style lang="css">
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
