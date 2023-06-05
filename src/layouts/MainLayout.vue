<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="storeFirebase.router.go(-1)"
        />

        <q-toolbar-title>
          <q-item
          clickable
          tag="a"
          to="/"
          class="text-white">
            Resturant - Café
          </q-item>          
        </q-toolbar-title>

        <div>
         <UserButtons />
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-dark text-primary row justify-between" elevated>
      <q-item>
        <q-item-section class="text-overline">
          © 2022 stocksoftheday.
        </q-item-section>
      </q-item>
      <q-item
      v-if="!storeFirebase.user"
      clickable
      tag="a"
      to='/account/register-admin'
      >
        <q-item-section avatar class="q-pa-none">
          <q-item-label>
            <q-icon name="login" class="q-mr-xs" />
            Register Admin
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import UserButtons from '../components/main/UserButtons.vue'
  import { useFirebaseStore } from 'stores/firebase'
  const storeFirebase= useFirebaseStore();
</script>
