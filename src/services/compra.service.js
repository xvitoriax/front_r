import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // URL base da sua API

// Função para criar uma nova compra
export const createCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/compras`, compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para obter todas as compras
export const getAllCompras = async () => {
  try {
    const response = await axios.get(`${API_URL}/compras`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para obter uma compra por ID
export const getCompraById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para atualizar uma compra existente
export const updateCompra = async (id, compraData) => {
  try {
    const response = await axios.put(`${API_URL}/compras/${id}`, compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para excluir uma compra
export const deleteCompra = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
