import React, { useState } from 'react';
import { createEvent, updateEvent } from '../../../../api/eventService';
import type { Event } from '../../../../types/event';
import styles from './CreateEventModal.module.scss';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Event) => void;
  onUpdate?: (event: Event) => void;
  event?: Event;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  event,
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event ? new Date(event.date).toISOString().slice(0,16) : '',
    location: event?.location || ''
  });

  const isEditMode = Boolean(event);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && onUpdate) {
          const updatedEvent = await updateEvent(event!.id, {
            ...event!,
            ...formData,
            date: new Date(formData.date).toISOString(),
            updatedAt: new Date().toISOString()
          });
          onUpdate(updatedEvent);
        } else if (onCreate) {
        const newEvent = await createEvent({
          ...formData,
          date: new Date(formData.date).toISOString()
        });
        onCreate(newEvent);
        setFormData({ title: '', description: '', date: '', location: '' });
      }
      onClose();
    } catch (err) {
      setError(isEditMode ? 'Ошибка при обновлении' : 'Ошибка при создании');
      console.error('Error saving event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{isEditMode ? 'Редактировать мероприятие' : 'Создать мероприятие'}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="title">Название *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Введите название мероприятия"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Опишите ваше мероприятие"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Дата и время *</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Место проведения *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Где будет проходить мероприятие?"
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className={styles.submitButton}
            >
            {loading ? (isEditMode ? 'Сохранение...' : 'Создание...') : (isEditMode ? 'Сохранить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;