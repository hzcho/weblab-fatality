import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../api/profileService";
import type { User } from "../../types/user";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
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

          {loading ? (
            <div className={styles.loaderMini}>
              <div className={styles.spinner}></div>
            </div>
          ) : user ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>{user.name}</span>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Выйти
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => navigate("/events")}
              >
                Панель
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
