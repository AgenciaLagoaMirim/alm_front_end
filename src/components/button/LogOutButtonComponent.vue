<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="primary" :label="props.label">
      <q-list>
        <q-item clickable v-close-popup @click="logOutUser">
          <q-item-section>
            <q-item-label>Log-out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { api } from "src/boot/authService";
import axios from "axios";
import useAuthStore from "src/stores/userAuth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

defineOptions({
  name: "LogOutButtonComponent",
});

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const logOutUser = async () => {
  await api.post('/api/v1/token/logout/').then(response => {
    console.log("Logget out")
  }).catch(error => {
    console.log(JSON.stringify(error))
  })
  axios.defaults.headers.common["Authorization"] = ""
  localStorage.removeItem('token')
  authStore.removeToken()
  router.push({ name: "login" });
}
</script>
