<script setup lang="ts">
import { ref } from 'vue';
import TrainingForm from './components/TrainingForm.vue';
import TrainingList from './components/TrainingList.vue';
import type { Training } from './types/Training';

const trainingToEdit = ref<Training | null>(null);
const refreshKey = ref(0);

const handleEditTraining = (training: Training) => {
  trainingToEdit.value = training;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCancelEdit = () => {
  trainingToEdit.value = null;
};

const handleTrainingSaved = () => {
  trainingToEdit.value = null;
  refreshKey.value++;
};
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Registro de Entrenamientos</h1>
      <p>¡Registra tus carreras y sigue tu progreso!</p>
    </header>
    
    <main class="container">
      <TrainingForm
        :training-to-edit="trainingToEdit"
        @cancel-edit="handleCancelEdit"
        @training-saved="handleTrainingSaved"
      />
      
      <TrainingList
        :key="refreshKey"
        @edit-training="handleEditTraining"
      />
    </main>
    
    <footer class="app-footer">
      <p>Desarrollado con Vue 3 + Firebase</p>
    </footer>
  </div>
</template>

<style>
/* Solo estilos mínimos que no están en el CSS global */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>