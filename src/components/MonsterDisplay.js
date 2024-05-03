import React from 'react';
import styled from 'styled-components';

// Компонент для отображения монстров на экране
const MonsterDisplay = ({ monsters, onMonsterClick }) => {
  // Обработчик клика по монстру
  const handleMonsterClick = (monster) => {
    onMonsterClick(monster);
  };

  // Отображение монстров
  return (
    <MonsterContainer>
      {monsters.map((monster, index) => (
        <MonsterCard key={index} onClick={() => handleMonsterClick(monster)}>
          <MonsterName>{monster.name}</MonsterName>
          <MonsterHealth>Здоровье: {monster.health}</MonsterHealth>
        </MonsterCard>
      ))}
    </MonsterContainer>
  );
};

// Стили для контейнера монстров
const MonsterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

// Стили для карточки монстра
const MonsterCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin: 0.5rem;
  width: 200px;
  cursor: pointer;
`;

// Стили для имени монстра
const MonsterName = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

// Стили для здоровья монстра
const MonsterHealth = styled.p`
  margin: 0;
`;

export default MonsterDisplay;
