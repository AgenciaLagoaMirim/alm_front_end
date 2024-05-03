<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
          ALM - Data Dash System
        </q-toolbar-title>

        <div>
          <log-out-button-component :label="userLabel"></log-out-button-component>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import LogOutButtonComponent from 'src/components/button/LogOutButtonComponent.vue'
import useAuthStore from "src/stores/userAuth";
defineOptions({
  name: 'MainLayout'
})

const authStore = useAuthStore();
const userLabel = authStore.userEmail


const linksList = [
  {
    title: 'Data-Dash',
    icon: 'dashboard',
    to: 'data-dash'

  },
  {
    title: 'Stamvi',
    icon: 'insert_chart',
    to: 'stamvi'

  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
