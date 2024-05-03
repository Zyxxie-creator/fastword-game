import React, { useState } from 'react';
import styled from 'styled-components';
import HighlightedText from './HighlightedText';

// Компонент для поля ввода текста для уничтожения монстра
const InputField = ({ onPlayerInput, monsterSentence }) => {
  const [playerInput, setPlayerInput] = useState('');

  // Обработчик изменения ввода игрока
  const handleInputChange = (event) => {
    setPlayerInput(event.target.value);
    if (event.target.value.trim() === monsterSentence) {
      onPlayerInput(event.target.value.trim());
      setPlayerInput('');
    }
  };

  return (
    <InputContainer>
      <MonsterSentence>
        <HighlightedText text={monsterSentence} playerInput={playerInput} />
      </MonsterSentence>
      <StyledInput
        type="text"
        value={playerInput}
        onChange={handleInputChange}
        placeholder="Введите текст для победы над монстрами!"
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const MonsterSentence = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 400px;
`;

export default InputField;
