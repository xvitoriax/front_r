import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // URL base da sua API

// Funções de serviço para interagir com a API de compras
const createCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/compras`, compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllCompras = async () => {
  try {
    const response = await axios.get(`${API_URL}/compras`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCompraById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCompra = async (id, compraData) => {
  try {
    const response = await axios.put(`${API_URL}/compras/${id}`, compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCompra = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/compras/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

function CompraList() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    async function fetchCompras() {
      try {
        const comprasData = await getAllCompras();
        setCompras(comprasData);
      } catch (error) {
        console.error('Erro ao buscar compras:', error);
      }
    }
    fetchCompras();
  }, []);

  const handleDelete = async (compraId) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir esta compra?')) {
        await deleteCompra(compraId);
        const updatedCompras = compras.filter(compra => compra.id_compra !== compraId);
        setCompras(updatedCompras);
      }
    } catch (error) {
      console.error('Erro ao excluir compra:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Compras</h2>
      <a role="button" href="/compras/new">Criar Nova Compra</a>
      <ul>
        {compras.map(compra => (
          <li key={compra.id_compra}>
            <strong>ID da Compra: {compra.id_compra}</strong>
            <p>Valor Total: {compra.valor_total}</p>
            <p>Data da Compra: {compra.dt_compra}</p>
            <Link to={`/compras/${compra.id_compra}/editar`}>Editar</Link>
            <button onClick={() => handleDelete(compra.id_compra)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompraForm() {
  const [formData, setFormData] = useState({
    valor_total: '',
    qntd: '',
    dt_compra: ''
  });
  const { compraId } = useParams();
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateCompra(compraId, formData);
      } else {
        await createCompra(formData);
      }
      setFormData({ valor_total: '', qntd: '', dt_compra: '' });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar compra:', error);
    }
  };

  useEffect(() => {
    async function fetchCompra() {
      try {
        const compraData = await getCompraById(compraId);
        setFormData(compraData);
        setEditMode(true);
      } catch (error) {
        console.error('Erro ao buscar detalhes da compra:', error);
      }
    }
    if (compraId) {
      fetchCompra();
    }
  }, [compraId]);

  return (
    <div>
      <h2>{editMode ? 'Editar Compra' : 'Criar Nova Compra'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Valor Total:
          <input type="number" name="valor_total" value={formData.valor_total} onChange={handleChange} />
        </label>
        <br />
        <label>
          Quantidade:
          <input type="number" name="qntd" value={formData.qntd} onChange={handleChange} />
        </label>
        <br />
        <label>
          Data da Compra:
          <input type="date" name="dt_compra" value={formData.dt_compra} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">{editMode ? 'Salvar Edição' : 'Criar Compra'}</button>
      </form>
    </div>
  );
}

function CompraDetail() {
  const [compra, setCompra] = useState(null);
  const { compraId } = useParams();

  useEffect(() => {
    async function fetchCompra() {
      try {
        const compraData = await getCompraById(compraId);
        setCompra(compraData);
      } catch (error) {
        console.error('Erro ao buscar detalhes da compra:', error);
      }
    }
    if (compraId) {
      fetchCompra();
    }
  }, [compraId]);

  if (!compra) {
    return <p>Carregando detalhes da compra...</p>;
  }

  return (
    <div>
      <h2>Detalhes da Compra</h2>
      <p><strong>ID da Compra:</strong> {compra.id_compra}</p>
      <p><strong>Quantidade:</strong> {compra.qntd}</p>
      <p><strong>Valor Total:</strong> {compra.valor_total}</p>
      <p><strong>Data da Compra:</strong> {compra.dt_compra}</p>
    </div>
  );
}

export { CompraList, CompraForm, CompraDetail };
