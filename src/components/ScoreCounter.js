import React from 'react';
import styled from 'styled-components';

// Компонент для отображения счета
const ScoreCounter = ({ score }) => {
  // Отображение счета
  return (
    <ScoreContainer>
      <ScoreText>Счет: {score}</ScoreText>
    </ScoreContainer>
  );
};

// Стили для контейнера счета
const ScoreContainer = styled.div`
  margin-bottom: 1rem;
`;

// Стили для текста счета
const ScoreText = styled.h2`
  margin: 0;
`;

export default ScoreCounter;
