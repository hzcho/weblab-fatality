import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authService';
import styles from './Login.module.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Notification from './components/Notification/Notification';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setNotification(null);

    try {
      await login(formData.email, formData.password);
      setNotification({
        type: 'success',
        message: 'Авторизация успешна! Перенаправление на страницу входа...'
      });
      
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Ошибка при авторизации'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Вход в систему</h1>
          <p>введите почту и пароль</p>
        </div>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        <form onSubmit={
          handleSubmit
          } className={styles.form}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Введите ваш email"
            required
          />

          <Input
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Введите пароль"
            required
          />

          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Авторизация...' : 'Войти'}
          </Button>
        </form>

        <div className={styles.loginLink}>
          <p>Еще нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;