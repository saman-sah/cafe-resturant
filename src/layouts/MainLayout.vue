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

    <q-footer class="bg-dark text-primary" elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

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
    title: 'Register',
    caption: 'Admin',
    icon: 'login',
    link: 'account/register-admin'
  },
  {
    title: 'Gallery',
    caption: '',
    icon: 'view_comfy_alt',
    link: '#'
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
