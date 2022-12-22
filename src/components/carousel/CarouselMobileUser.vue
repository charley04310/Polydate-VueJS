<script lang="ts">
import { defineComponent } from 'vue';
import QItemCard from 'src/components/card/QItemCard.vue';
export default defineComponent({});
</script>

<template>
  <q-card class="my-card" bordered style="border-radius: 30px">
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
      <q-carousel-slide
        name="first"
        img-src="https://cdn.quasar.dev/img/mountains.jpg"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Dua Lipa</div>
          <div class="text-subtitle1">
            <q-icon
              color="white"
              style="padding-right: 3px"
              name="school"
              size="sm"
            />

            Polytech Montpellier
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
import { ref } from 'vue';

const slide = ref('first');
</script>

<style lang="css">
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
}
</style>
