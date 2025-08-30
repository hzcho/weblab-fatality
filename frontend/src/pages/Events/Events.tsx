import React, { useState, useEffect } from 'react';
import { listEvents, deleteEvent } from '../../api/eventService';
import EventCard from './components/EventCard/EventCard.tsx';
import CreateEventModal from './components/CreateEventModal/CreateEventModal.tsx';
import type { Event } from '../../types/event.ts';
import styles from './Events.module.scss';
import { getCurrentUser } from '../../api/profileService';
import type {User} from "../../types/user.ts";

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser)
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);

    const eventsData = await listEvents();
    setEvents(eventsData);

    setError(null);
    } catch (err) {
      setError('Ошибка при загрузке мероприятий');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      setError('Ошибка при удалении мероприятия');
      console.error('Error deleting event:', err);
    }
  };

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.eventsContainer}>
      <header className={styles.header}>
        <h1>Мероприятия</h1>
        {user && (
          <div className={styles.userInfo}>
            <span>Добро пожаловать, {user.name}</span>
          </div>
        )}
      </header>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={fetchEvents} className={styles.retryButton}>
            Повторить
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button
          onClick={() => { setEditingEvent(null); setIsCreateModalOpen(true); }}
          className={styles.createButton}
        >
          Создать мероприятие
        </button>
      </div>

      <div className={styles.eventsGrid}>
        {events.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Мероприятий пока нет</p>
          </div>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={handleDeleteEvent}
              onEdit={(event) => {
                setEditingEvent(event);
                setIsCreateModalOpen(true); 
              }}
              canEdit={true}
            />
          ))
        )}
      </div>

      {isCreateModalOpen && (
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateEvent}
          onUpdate={handleUpdateEvent}
          event={editingEvent ?? undefined}
        />
      )}
    </div>
  );
};

export default Events;