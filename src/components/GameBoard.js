import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generateMonsters, checkPlayerInput } from '../utils/gameLogic';
import InputField from './InputField';
import MonsterDisplay from './MonsterDisplay';
import HealthBar from './HealthBar';
import ScoreCounter from './ScoreCounter';
import ShopMenu from './ShopMenu';
import { saveProgress, loadProgress } from '../utils/progressManager';

const GameBoard = () => {
  const [monsters, setMonsters] = useState([]);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerUpgrades, setPlayerUpgrades] = useState({
    typingSpeed: 1,
    monsterHealth: 1,
    monsterSpawnRate: 1,
    monsterDamageCoefficient: 1,
    monsterScoreCoefficient: 1,
  });

  // Загрузка сохраненного прогресса и генерация монстров
  useEffect(() => {
    const savedProgress = loadProgress();
    const savedMonsters = JSON.parse(localStorage.getItem('savedMonsters'));

    if (savedProgress) {
      setPlayerHealth(savedProgress.health);
      setPlayerScore(savedProgress.score);
      setPlayerUpgrades(savedProgress.upgrades);
      setMonsters(generateMonsters(savedProgress.monsterSpawnRate));
    } else {
      const initialMonsters = savedMonsters || generateMonsters(10);
      setMonsters(initialMonsters);
      localStorage.setItem('savedMonsters', JSON.stringify(initialMonsters));
    }

    const monsterGenerator = setInterval(() => {
      generateNewMonster();
    }, 5000);

    return () => clearInterval(monsterGenerator);
  }, []);

  // Генерация нового монстра
  const generateNewMonster = () => {
    if (monsters.length < 10) {
      const newMonster = generateMonsters(1)[0];
      setMonsters((prevMonsters) => {
        const updatedMonsters = [...prevMonsters, newMonster];
        localStorage.setItem('savedMonsters', JSON.stringify(updatedMonsters));
        return updatedMonsters;
      });
    }
  };

  // Обработка ввода игрока
  const handlePlayerInput = (input) => {
    const { newMonsters, newHealth, newScore } = checkPlayerInput(monsters, input, playerUpgrades);
    setMonsters(newMonsters);
    setPlayerHealth(newHealth);
    setPlayerScore(newScore);
    saveProgress(newScore, newHealth, playerUpgrades);
  };

  // Обработка нажатий на монстра
  const handleMonsterClick = (clickedMonster) => {
    const updatedMonsters = monsters.map((monster) =>
      monster === clickedMonster ? { ...monster, health: Math.max(monster.health - 1, 0) } : monster
    ).filter((monster) => monster.health > 0);

    setMonsters(updatedMonsters);

    if (clickedMonster.health <= 0) {
      const newScore = playerScore + clickedMonster.score * playerUpgrades.monsterScoreCoefficient;
      setPlayerScore(newScore);
      saveProgress(newScore, playerHealth, playerUpgrades);
    }
  };

  // Обновление апгрейдов
  const handleUpgrade = (upgrade, cost) => {
    if (playerScore >= cost) {
      setPlayerUpgrades((prevUpgrades) => {
        const newUpgrades = { ...prevUpgrades, [upgrade]: prevUpgrades[upgrade] + 1 };
        saveProgress(playerScore - cost, playerHealth, newUpgrades);
        return newUpgrades;
      });
    }
  };

  // Отображение игрового поля
  return (
    <GameContainer>
      <InputField onPlayerInput={handlePlayerInput} monsterSentence={monsters[0]?.sentence || ''} />
      <MonsterDisplay monsters={monsters} onMonsterClick={handleMonsterClick} />
      <HealthBar health={playerHealth} />
      <ScoreCounter score={playerScore} />
      <ShopMenu upgrades={playerUpgrades} onUpgrade={handleUpgrade} playerScore={playerScore} />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export default GameBoard;
