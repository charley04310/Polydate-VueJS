<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePolydateStore } from 'src/stores/polydateStore';
import { ref } from 'vue';
import QItemCard from 'src/components/card/QItemCard.vue';
export default defineComponent({});
</script>

<template>
  <q-card class="my-card" bordered>
    <q-carousel
      swipeable
      infinite
      control-type="push"
      animated
      v-model="slide"
      height="400px"
      class="shadow-14"
      ref="carousel"
    >
      <slot v-if="userImage !== undefined && userImage.length >= 0">
        <q-carousel-slide
          v-for="(image, index) in userImage"
          :key="index"
          :name="index"
          :img-src="`https://cluster-2022-5.dopolytech.fr/api/images/user/${image.imageLink}`"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h5">
              {{ user?.userFirstname }} {{ user?.userLastname }}
            </div>
            <div class="text-subtitle1">
              <q-icon
                color="white"
                style="padding-right: 3px"
                name="school"
                size="sm"
              />
              {{ userSchool }}
            </div>
          </div>
        </q-carousel-slide>
      </slot>

      <q-carousel-slide
        :name="0"
        :img-src="`https://ui-avatars.com/api/?name=${user?.userFirstname}+${user?.userLastname}&background=0D8ABC&color=ff0000&size=90`"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">
            {{ user?.userFirstname }} {{ user?.userLastname }}
          </div>
          <div class="text-subtitle1">
            <q-icon
              color="white"
              style="padding-right: 3px"
              name="school"
              size="sm"
            />
            {{ userSchool }}
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-card-section>
      <q-avatar
        fab
        color="cyant-10"
        icon="verified"
        size="lg"
        text-color="white"
        class="absolute q-pa-none"
        style="top: -30px; right: 12px; transform: translateY(-50%)"
      />

      <QItemCard />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
const usePolydate = usePolydateStore();

const user = computed(() => {
  return usePolydate.userFeed;
});
const userImage = computed(() => {
  return usePolydate.userFeedImages;
});

const userSchool = computed(() => {
  switch (usePolydate.userFeed?.userSchoolId) {
    case 1:
      return 'Universit?? Paul Val??ry III Montpellier';
    case 2:
      return 'Universite des sciences Montpellier';

    case 3:
      return 'Universit?? de Medcine Montpellier';

    default:
      return 'Utilisateur non inscrit';
  }
});
const slide = ref(0);
</script>

<style lang="css">
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
}
</style>
