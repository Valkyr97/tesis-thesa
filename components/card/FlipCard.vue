<script setup lang="ts"></script>

<template>
  <div class="flex w-[550px] h-52 flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <slot name="front-card" />
      </div>
      <div class="flip-card-back">
        <slot name="back-card" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 600px; 
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transition: transform 1.0s;
  transform-style: preserve-3d; /* Permite la transformación 3D */
}

.flip-card:hover .flip-card-inner {
  transform: rotateX(
    180deg
  ); /* Hace la rotación de la tarjeta al pasar el cursor sobre ella */
}

.flip-card-front,
.flip-card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden; /* Oculta la parte trasera de la tarjeta */
}

.flip-card-back {
  transform: rotateX(
    180deg
  ); /* Inicialmente muestra la parte trasera de la tarjeta */
}
</style>
