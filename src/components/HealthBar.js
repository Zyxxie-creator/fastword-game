import React from 'react';
import styled from 'styled-components';

// Здоровье игрока
const HealthBar = ({ health }) => {
  // Отображение здоровья игрока
  return (
    <HealthBarContainer>
      <HealthBarFill width={`${health}%`} />
      <HealthBarText>{health}%</HealthBarText>
    </HealthBarContainer>
  );
};


// Стили для контейнера здоровья
const HealthBarContainer = styled.div`
  width: 300px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

// Стили для заполнения здоровья
const HealthBarFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.width};
  transition: width 0.5s ease-in-out;
`;

// Стили для текста здоровья
const HealthBarText = styled.div`
  position: absolute;
  width: 300px;
  text-align: center;
  font-weight: bold;
  color: #333;
`;

export default HealthBar;
