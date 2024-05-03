import React from 'react';
import styled from 'styled-components';

// Компонент меню магазина для улучшений
const ShopMenu = ({ upgrades, onUpgrade }) => {
  // Отображение меню магазина с доступными улучшениями
  return (
    <ShopContainer>
      <ShopTitle>Магазин</ShopTitle>
      <UpgradeContainer>
        {/* Улучшение скорости печати */}
        <UpgradeCard>
          <UpgradeTitle>Скорость печати</UpgradeTitle>
          <UpgradeDescription>Увеличивает скорость печати.</UpgradeDescription>
          <UpgradePrice>Стоимость: {upgrades.typingSpeed * 100} очков</UpgradePrice>
          <UpgradeButton onClick={() => onUpgrade('typingSpeed')}>
            Улучшить ({upgrades.typingSpeed})
          </UpgradeButton>
        </UpgradeCard>
        {/* Улучшение здоровья монстров */}
        <UpgradeCard>
          <UpgradeTitle>Здоровье монстров</UpgradeTitle>
          <UpgradeDescription>Увеличивает здоровье монстров.</UpgradeDescription>
          <UpgradePrice>Стоимость: {upgrades.monsterHealth * 100} очков</UpgradePrice>
          <UpgradeButton onClick={() => onUpgrade('monsterHealth')}>
            Улучшить ({upgrades.monsterHealth})
          </UpgradeButton>
        </UpgradeCard>
        {/* Улучшение скорости спавна монстров */}
        <UpgradeCard>
          <UpgradeTitle>Скорость спавна монстров</UpgradeTitle>
          <UpgradeDescription>Уменьшает скорость спавна монстров.</UpgradeDescription>
          <UpgradePrice>Стоимость: {upgrades.monsterSpawnRate * 100} очков</UpgradePrice>
          <UpgradeButton onClick={() => onUpgrade('monsterSpawnRate')}>
            Улучшить ({upgrades.monsterSpawnRate})
          </UpgradeButton>
        </UpgradeCard>
      </UpgradeContainer>
    </ShopContainer>
  );
};

// Стили для контейнера магазина
const ShopContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  width: 400px;
`;

// Стили для заголовка магазина
const ShopTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`;

// Стили для контейнера улучшений
const UpgradeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
`;

// Стили для карточки улучшения
const UpgradeCard = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
`;

// Стили для заголовка улучшения
const UpgradeTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

// Стили для описания улучшения
const UpgradeDescription = styled.p`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

// Стили для цены улучшения
const UpgradePrice = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

// Стили для кнопки улучшения
const UpgradeButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export default ShopMenu;
