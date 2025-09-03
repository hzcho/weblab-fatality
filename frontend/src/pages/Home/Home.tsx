import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchCurrentUser } from "../../store/slices/profileSlice";
import { logoutUser } from "../../store/slices/authSlice";
import styles from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/localStorage";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
  const token = getToken();
  if (token) {
    dispatch(fetchCurrentUser());
  }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.backgroundAnimation}></div>

      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.logoContainer}>
            <img src="/app.png" alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>
              My<span>Events</span>
            </h1>
          </div>

        {user ? (
          <div className={styles.userMenu}>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Выйти
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/profile")}
            >
              Профиль
            </button>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login">
              <button className={styles.authButton}>Войти</button>
            </Link>
            <Link to="/register">
              <button className={styles.authButton}>Создать аккаунт</button>
            </Link>
          </div>
        )}
        </div>

        <p className={styles.subtitle}>
          Измените подход к управлению мероприятиями. Создавайте, организуйте и
          контролируйте события с непревзойденной простотой и эффективностью.
        </p>
      </header>

      <div className={styles.features}>
        <div className={styles.row}>
          <div
            className={styles.featureCard}
            onClick={() => navigate("/events")}
          >
            <div className={styles.featureIcon}>📝</div>
            <h3>Мои события</h3>
            <p>
              Создавайте и управляйте своими мероприятиями за считанные минуты с
              помощью удобного и понятного интерфейса.
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <h3>Групповые события</h3>
            <p>Организуйте совместные мероприятия с семьей и друзьями.</p>
            <p>(находится в разработке)</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3>Аналитика событий</h3>
            <p>
              Получайте полезные отчеты о результативности ваших мероприятий и
              посещаемости гостей.
            </p>
            <p>(находится в разработке)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;