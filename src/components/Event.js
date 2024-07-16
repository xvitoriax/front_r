import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } from '../services/event.service';
import { useParams, useNavigate } from 'react-router-dom';
import { CompraDetail } from './Compra';

// EventList component
function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este evento?')) {
        await deleteEvent(eventId);
        const updatedEvents = events.filter(event => event.id_evento !== eventId);
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };
  const handleCompra = async (eventId) => {
    navigate(`/compras/new/${eventId}`);
  };

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <a role="button" href="/events/new">Criar Novo Evento</a>
      <ul>
        {events.map(event => (
          <li key={event.id_evento}>
            <strong>{event.name}</strong>
            <p>{event.descr}</p>
            
            <a role="button" href={`/events/${event.id_evento}/editar`}>Editar</a>
            <button onClick={() => handleDelete(event.id_evento)}>Excluir</button>
            <button onClick={handleCompra}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// EventForm component
function EventForm({ onCreate, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    value: '',
    qntd_total: '',
    qntd_disp: '',
    descr: '',
    local: ''
  });
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(!!eventId);
  const [eventIdToUpdate, setEventIdToUpdate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateEvent(eventIdToUpdate, formData);
        onUpdate();
      } else {
        await createEvent(formData);
        onCreate();
      }
      setFormData({
        name: '',
        date: '',
        value: '',
        qntd_total: '',
        qntd_disp: '',
        descr: '',
        local: ''
      });
      setEditMode(false);
      setEventIdToUpdate(null);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };
  
  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(eventId);
        setFormData(eventData);
        setEditMode(true);
        setEventIdToUpdate(eventId);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
      }
    }
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  

  return (
    <div>
      <h2>{editMode ? 'Editar Evento' : 'Criar Novo Evento'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Data:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <br />
        <label>
          Valor:
          <input type="number" name="value" value={formData.value} onChange={handleChange} />
        </label>
        <br />
        <label>
          Quantidade Total:
          <input type="number" name="qntd_total" value={formData.qntd_total} onChange={handleChange} />
        </label>
        <br />
        <label>
          Quantidade Disponível:
          <input type="number" name="qntd_disp" value={formData.qntd_disp} onChange={handleChange} />
        </label>
        <br />
        <label>
          Descrição:
          <textarea name="descr" value={formData.descr} onChange={handleChange} />
        </label>
        <br />
        <label>
          Local:
          <input type="text" name="local" value={formData.local} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">{editMode ? 'Salvar Edição' : 'Criar Evento'}</button>
      </form>
    </div>
  );
}

// EventDetail component
function EventDetail() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
      }
    }
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!event) {
    return <p>Carregando detalhes do evento...</p>;
  }

  return (
    <div>
      <h2>Detalhes do Evento</h2>
      <p><strong>Nome:</strong> {event.name}</p>
      <p><strong>Data:</strong> {event.date}</p>
      <p><strong>Valor:</strong> {event.value}</p>
      <p><strong>Quantidade Total:</strong> {event.qntd_total}</p>
      <p><strong>Quantidade Disponível:</strong> {event.qntd_disp}</p>
      <p><strong>Descrição:</strong> {event.descr}</p>
      <p><strong>Local:</strong> {event.local}</p>
    </div>
  );
}

export { EventList, EventForm, EventDetail, createEvent };
