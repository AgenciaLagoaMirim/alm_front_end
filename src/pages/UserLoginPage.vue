<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide"></div>
      <div class="col-12 col-sm-7">
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary roboto"
                  >
                    ALM - Data Dash System
                  </div>
                </div>
              </div>
              <q-form class="q-gutter-md" @submit.prevent="submitForm">
                <q-input
                  v-model="email"
                  :rules="[rules.required]"
                  label="email de usuário"
                  name="email"
                  type="email"
                  autocomplete="username"
                />
                <q-input
                  v-model="password"
                  :rules="[rules.required, rules.minLength(6)]"
                  label="Senha"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                />
                <div>
                  <q-btn
                    class="full-width roboto"
                    color="primary"
                    label="Entrar no sistema"
                    rounded
                    type="submit"
                  ></q-btn>
                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Ainda não possui uma conta?
                      <router-link class="text-primary" to="register"
                        >Cadastrar-se</router-link
                      >
                    </div>
                    <div class="q-mt-sm">
                      Esqueceu a senha? Clique
                      <router-link class="text-primary" to="/forgot-password"
                        >aqui!</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/authService";
import rules from "src/support/rules/fieldRules";
import axios from "axios";
import useAuthStore from "src/stores/userAuth"
import { useQuasar } from 'quasar'

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore()
const $q = useQuasar()


const submitForm = async () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  try {
    await api.post("/api/v1/token/login/", formData).then((response) => {
      const token = response.data.auth_token;
      authStore.setToken(token)
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      localStorage.setItem("token", token);
      authStore.fetchUserData()
      router.push({ name: "dash-board" });
    });
  } catch (error) {
    console.error(`Erro ${error}`);
    console.log(error);
    $q.dialog({
      title: 'Erro',
      message: 'Ocorreu um erro durante o login. Verifique suas credenciais e tente novamente.',
    });
  }
};
</script>
