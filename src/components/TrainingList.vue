<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Training } from '../types/Training';

const emit = defineEmits<{
  (e: 'edit-training', training: Training): void;
}>();

const trainings = ref<Training[]>([]);
const loading = ref(true);
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  const trainingsRef = collection(db, 'entrenamientos');
  const q = query(trainingsRef, orderBy('fecha', 'desc'));
  
  unsubscribe = onSnapshot(q, (snapshot) => {
    trainings.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Training[];
    loading.value = false;
  }, (error) => {
    console.error('Error:', error);
    loading.value = false;
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const deleteTraining = async (id: string) => {
  if (confirm('¿Estás seguro de eliminar este entrenamiento?')) {
    try {
      await deleteDoc(doc(db, 'entrenamientos', id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  }
};

const editTraining = (training: Training) => {
  emit('edit-training', training);
};

const formatDate = (date: any) => {
  if (!date) return 'Fecha no disponible';
  try {
    // Si es un objeto Firestore Timestamp
    if (date && typeof date === 'object' && date.seconds) {
      const d = new Date(date.seconds * 1000);
      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' // Forzar UTC para evitar desfase
      });
    }
    
    // Si es string o Date
    const fecha = new Date(date);
    if (isNaN(fecha.getTime())) return 'Fecha inválida';
    
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Forzar UTC
    });
  } catch (error) {
    return 'Error en fecha';
  }
};

const calculatePace = (minutes: number, km: number) => {
  if (km === 0) return '0';
  return (minutes / km).toFixed(2);
};
</script>

<template>
  <div>
    <h2>Historial de Entrenamientos</h2>
    
    <div v-if="loading" class="loading-state">Cargando entrenamientos...</div>
    
    <div v-else-if="trainings.length === 0" class="empty-state">
      No hay entrenamientos registrados. ¡Comienza a correr!
    </div>
    
    <div v-else class="cards-container">
      <div v-for="training in trainings" :key="training.id" class="card">
        <div class="card-header">
          <h3>{{ formatDate(training.fecha) }}</h3>
          <div class="card-actions">
            <button @click="editTraining(training)" class="btn-icon edit" title="Editar">Editar</button>
            <button @click="deleteTraining(training.id!)" class="btn-icon delete" title="Eliminar">Eliminar</button>
          </div>
        </div>
        
        <div class="card-body">
          <div class="card-stat">
            <span class="stat-label">Duración:</span>
            <span class="stat-value">{{ training.duracion }} min</span>
          </div>
          <div class="card-stat">
            <span class="stat-label">Distancia:</span>
            <span class="stat-value">{{ training.distancia }} km</span>
          </div>
          <div class="card-stat">
            <span class="stat-label">Ritmo:</span>
            <span class="stat-value">{{ calculatePace(training.duracion, training.distancia) }} min/km</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
