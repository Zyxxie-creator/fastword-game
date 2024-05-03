const PROGRESS_COOKIE_KEY = 'gameProgress';

// Функция для сохранения прогресса с учетом подсчета очков
export const saveProgress = (playerScore, playerHealth, playerUpgrades, killedMonster) => {
  // Создание объекта прогресса с учетом очков за убитого монстра
  const progressData = {
    score: playerScore + killedMonster.score,
    health: playerHealth,
    upgrades: playerUpgrades,
  };

  // Перевод прогресса в JSON
  const progressJson = JSON.stringify(progressData);

  // Установка куки для сохранения прогресса
  document.cookie = `${PROGRESS_COOKIE_KEY}=${progressJson}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
};

// Функция для загрузки прогресса
export const loadProgress = () => {
  // Получение куки для загрузки прогресса
  const cookieValue = document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${PROGRESS_COOKIE_KEY}\s*\=\s*([^;]*).*$)|^.*$`),
    '$1'
  );

  if (cookieValue) {
    try {
      // Парсинг прогресса из куки
      const progressData = JSON.parse(cookieValue);
      return progressData;
    } catch (error) {
      console.error('Error parsing progress data from cookie:', error);
    }
  }

  return null;
};
