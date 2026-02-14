<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Training } from '../types/Training';

const props = defineProps<{
  trainingToEdit?: Training | null;
}>();

const emit = defineEmits<{
  (e: 'cancel-edit'): void;
  (e: 'training-saved'): void;
}>();

const formData = reactive({
  fecha: '',
  duracion: 0,
  distancia: 0
});

const isEditing = ref(false);

const resetForm = () => {
  formData.fecha = '';
  formData.duracion = 0;
  formData.distancia = 0;
  isEditing.value = false;
};

watch(() => props.trainingToEdit, (newVal) => {
  if (newVal) {
    isEditing.value = true;
    if (newVal.fecha) {
      const fecha = new Date(newVal.fecha);
      if (!isNaN(fecha.getTime())) {
        const fechaStr = fecha.toISOString().split('T')[0];
        formData.fecha = fechaStr || '';
      }
    }
    formData.duracion = newVal.duracion || 0;
    formData.distancia = newVal.distancia || 0;
  } else {
    resetForm();
  }
}, { immediate: true });

const handleSubmit = async () => {
  try {
    if (!formData.fecha || !formData.duracion || !formData.distancia) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const trainingData = {
      fecha: new Date(formData.fecha + 'T12:00:00'),
      duracion: Number(formData.duracion),
      distancia: Number(formData.distancia)
    };

    if (isEditing.value && props.trainingToEdit?.id) {
      const trainingRef = doc(db, 'entrenamientos', props.trainingToEdit.id);
      await updateDoc(trainingRef, trainingData);
      alert('Entrenamiento actualizado');
    } else {
      const trainingsRef = collection(db, 'entrenamientos');
      await addDoc(trainingsRef, trainingData);
      alert('Entrenamiento guardado');
    }

    resetForm();
    emit('training-saved');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar');
  }
};

const cancelEdit = () => {
  resetForm();
  emit('cancel-edit');
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEditing ? 'Editar Entrenamiento' : 'Nuevo Entrenamiento' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input id="fecha" type="date" v-model="formData.fecha" required />
      </div>

      <div class="form-group">
        <label for="duracion">Duración (minutos):</label>
        <input id="duracion" type="number" v-model="formData.duracion" min="1" required />
      </div>

      <div class="form-group">
        <label for="distancia">Distancia (km):</label>
        <input id="distancia" type="number" v-model="formData.distancia" min="0.1" step="0.1" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Actualizar' : 'Guardar' }}
        </button>
        <button v-if="isEditing" type="button" class="btn btn-secondary" @click="cancelEdit">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Vacío - usamos el CSS global */
</style>