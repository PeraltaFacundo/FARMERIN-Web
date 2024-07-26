// src/components/NotificationsList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification, clearNotifications } from '../redux/notificacionSlice';
import { Button } from 'react-bootstrap';

const NotificationsList = () => {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginTop: '10px' }}>
      <h4>Notificaciones</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map(notification => (
          <li key={notification.id} style={{ marginBottom: '5px' }}>
            {notification.mensaje} - {notification.fecha}
            <Button
              variant="danger"
              size="sm"
              style={{ marginLeft: '10px' }}
              onClick={() => dispatch(removeNotification(notification.id))}
            >
              Eliminar
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => dispatch(clearNotifications())}
      >
        Limpiar todas las notificaciones
      </Button>
    </div>
  );
};

export default NotificationsList;
