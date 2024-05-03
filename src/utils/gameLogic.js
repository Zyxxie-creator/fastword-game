import { sampleSize } from 'lodash';
import { monsterData } from './monsterData';

// Функция для генерации новых монстров
export const generateMonsters = (spawnRate) => {
  // Комментарий: Генерирует случайное количество новых монстров в зависимости от коэффициента спавна
  const newMonsters = sampleSize(monsterData, Math.floor(Math.random() * (5 * spawnRate) + 1)).map((monster) => ({
    ...monster,
    health: monster.health * spawnRate,
  }));
  return newMonsters;
};

// Функция для обновления монстров после ввода игрока
export const updateMonsters = (monsters, playerInput) => {
  // Комментарий: Обходит список монстров и уменьшает их здоровье, если ввод игрока не соответствует
  return monsters.map((monster) => {
    if (playerInput.toLowerCase() === monster.sentence.toLowerCase()) {
      return null; // Возвращает null, чтобы удалить монстра
    } else {
      return { ...monster, health: Math.max(monster.health - 1, 0) }; 
    }
  }).filter(Boolean);
};

// Функция для проверки ввода игрока и обновления игры
export const checkPlayerInput = (monsters, playerInput, upgrades) => {
  // Комментарий: Обходит список монстров и уменьшает их здоровье, если ввод игрока не соответствует
  const newMonsters = monsters.map((monster) => {
    if (playerInput.toLowerCase() === monster.sentence.toLowerCase()) {
      return null; // Возвращает null, чтобы удалить монстра
    } else {
      return { ...monster, health: Math.max(monster.health - 1, 0) };
    }
  }).filter(Boolean); // Фильтрует null

  // Комментарий: Вычисляет новое здоровье и новый счет игрока
  const newHealth = newMonsters.reduce((total, monster) => total - (monster.health > 0 ? 1 : 0), 100);
  const newScore = monsters.reduce((total, monster) => total + (monster.health <= 0 ? monster.score : 0), 0) * upgrades.typingSpeed;

  return { newMonsters, newHealth, newScore };
}
