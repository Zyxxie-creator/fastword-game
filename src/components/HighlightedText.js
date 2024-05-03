import React from 'react';
import styled from 'styled-components';

// Компонент для подсветки текста
const HighlightedText = ({ text, playerInput }) => {
  // Создание подсвеченного текста
  const highlightedText = text.split('').map((char, index) => {
    const isMatch = playerInput.toLowerCase().includes(char.toLowerCase());
    return (
      <span key={index} style={{ backgroundColor: isMatch ? '#ffff00' : 'transparent' }}>
        {char}
      </span>
    );
  });

  return <HighlightedTextContainer>{highlightedText}</HighlightedTextContainer>;
};

const HighlightedTextContainer = styled.div`
  display: inline;
`;

export default HighlightedText;
