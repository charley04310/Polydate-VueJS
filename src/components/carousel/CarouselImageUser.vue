<script lang="ts">
import { defineComponent } from 'vue';
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
      height="580px"
      class="shadow-14"
      ref="carousel"
    >
      <q-carousel-slide
        name="first"
        img-src="https://cdn.quasar.dev/img/parallax2.jpg"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Dua Lipa</div>
          <div class="text-subtitle1">Polytech Montpellier</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="second"
        img-src="https://cdn.quasar.dev/img/parallax2.jpg"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Dua Lipa</div>
          <div class="text-subtitle1">Polytech Montpellier</div>
        </div>
      </q-carousel-slide>
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

const slide = ref('first');
</script>

<style lang="css">
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
