import React from 'react';
import type { Event } from '../../../../types/event';
import styles from './EventCard.module.scss';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onEdit?: (event: Event) => void;
  canEdit: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onEdit, canEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить это мероприятие?')) {
      onDelete(event.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
    }
  };

  return (
    <div className={styles.eventCard} onClick={handleEdit}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{event.title}</h3>
        {canEdit && (
          <div className={styles.actions}>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
              title="Удалить мероприятие"
            >
              X
            </button>
          </div>
        )}
      </div>

      {event.description && (
        <p className={styles.description}>{event.description}</p>
      )}

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Дата и время:</span>
          <span className={styles.value}>{formatDate(event.date)}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Место:</span>
          <span className={styles.value}>{event.location}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.createdAt}>
          Создано: {new Date(event.createdAt).toLocaleDateString('ru-RU')}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
