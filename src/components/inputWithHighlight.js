import { useState, useEffect } from 'react';
import { getFishText } from '../api/getFishText';

// Компонент для ввода с подсветкой цветом при правильном вводе слова
const InputWithHighlight = () => {
  const [text, setText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [highlightColors, setHighlightColors] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Получение текста для ввода
  const getText = async () => {
    try {
      const fishText = await getFishText();
      setTargetText(fishText);
    } catch (error) {
      // Обработка ошибки, если текст не загружен
    }
  };

  // Загрузка текста при монтировании компонента
  useEffect(() => {
    getText();
  }, []);

  // Обновление подсветки при изменении введенного текста
  useEffect(() => {
    if (!targetText) return;

    const newHighlightColors = targetText.split('').map((char, i) => (text[i] === char ? 'green' : 'red'));
    setHighlightColors(newHighlightColors);

    if (newHighlightColors.every((color) => color === 'green')) {
      setText('');
      setHighlightColors([]);
      setStartTime(null);
      setEndTime(null);
      getText();
    }
  }, [text, targetText]);

  // Обработчик изменения ввода
  const handleInputChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    setText(e.target.value);
  };

  // Обработчик завершения ввода
  const handleFinish = () => {
    setEndTime(Date.now());
  };

  // Вычисление времени решения после завершения ввода
  useEffect(() => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000;
      setElapsedTime(elapsedTime);
    }
  }, [startTime, endTime]);

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} onBlur={handleFinish} />
      <p>
        {targetText.split('').map((char, i) => (
          <span key={i} style={{ color: highlightColors[i] }}>
            {char}
          </span>
        ))}
      </p>
      <p>Время решения: {elapsedTime} секунд</p>
    </div>
  );
};

export default InputWithHighlight;
