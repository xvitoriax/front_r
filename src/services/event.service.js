import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 

const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error; // Propaga o erro para ser tratado pelo componente que chamou essa função
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar evento com ID ${id}:`, error);
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
};

const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar evento com ID ${id}:`, error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir evento com ID ${id}:`, error);
    throw error;
  }
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
