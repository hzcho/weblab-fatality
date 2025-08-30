import React from "react";

const NotFound: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "20px" }}>
      <h1>404 - Страница не найденаddddddddddddddddddddddddddddddddddddddddddddddddddd</h1>
      <p>Это тестовая страница для проверки ширины отображения.</p>
      <p>Если элементы отображаются узкой полоской — значит проблема в глобальных стилях.</p>
    </div>
  );
};

export default NotFound;
