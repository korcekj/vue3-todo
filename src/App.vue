<template>
  <v-layout>
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
        <v-icon size="large" icon="mdi-check-all"></v-icon>
      </template>

      <v-app-bar-title
        ><v-btn to="/"
          >Vue3 <span class="font-weight-black">ToDo</span></v-btn
        ></v-app-bar-title
      >

      <template v-slot:append> </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>
