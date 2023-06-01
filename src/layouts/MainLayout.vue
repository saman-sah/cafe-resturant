<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
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
          <q-btn 
          @click="loginToggle= !loginToggle"
          flat
          >
            Login
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Login Modal Component -->
    <q-dialog v-model="loginToggle">
      <Login />
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Login from '../components/modals/Login.vue'

const linksList = [
  {
    title: 'Login',
    caption: 'Admin',
    icon: 'login',
    link: '#'
  },
  {
    title: 'Gallery',
    caption: '',
    icon: 'view_comfy_alt',
    link: '#'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Login
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const loginToggle= ref(false)
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loginToggle,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
