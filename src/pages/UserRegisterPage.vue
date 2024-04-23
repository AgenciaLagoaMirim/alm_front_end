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
                    Registre-se !
                  </div>
                </div>
              </div>
              <q-form
                class="q-gutter-md"
                @submit.prevent="submitForm"
                ref="myForm"
              >
                <q-input
                  v-model="email"
                  :rules="[rules.required]"
                  label="Email de usuário"
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
                  autocomplete="new-password"
                />
                <q-input
                  v-model="password2"
                  :rules="[
                    rules.required,
                    rules.minLength(6),
                    rules.confirmPassword(password),
                  ]"
                  label="Repetir Senha"
                  name="password2"
                  type="password"
                  autocomplete="new-password"
                />
                <div>
                  <q-btn
                    class="full-width roboto"
                    color="primary"
                    label="Criar conta"
                    rounded
                    type="submit"
                  ></q-btn>
                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Esqueceu a senha? Clique
                      <router-link class="text-primary" to="/forgot-password"
                        >aqui!</router-link
                      >
                    </div>
                    <div class="q-mt-sm">
                      Já possui cadastro? Clique
                      <router-link class="text-primary" to="/"
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

const email = ref("");
const password = ref("");
const password2 = ref("");
const router = useRouter();
const myForm = ref(null);

const submitForm = async () => {
  myForm.value.validate().then(async (success) => {
    if (success) {
      console.log("Teste de envio");
      const formData = {
        email: email.value,
        password: password.value,
      };
      try {
        await api.post("/api/v1/users/", formData);
        router.push({ name: "login" });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Formulário inválido");
    }
  });
};

</script>
