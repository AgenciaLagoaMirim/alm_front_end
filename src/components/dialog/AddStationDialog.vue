<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn flat label="+ estação" color="primary" @click="prompt = true" />

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Adicionar Estação</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-input
              dense
              v-model="stationName"
              label="Nome da Estação"
              type="text"
              autofocus
              @keyup.enter="prompt = false"
            />
            <q-input
              dense
              v-model="location"
              label="Coordenadas"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "AddStationDialog",
});

const prompt = ref(false)
const stationName = ref("")
const location = ref("")


</script>
