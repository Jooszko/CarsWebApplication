import React, { useEffect, useState } from 'react';

export default function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ustawienie timera
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Czyszczenie po demontażu komponentu
    return () => clearInterval(interval);
  }, []); // Efekt uruchomiony raz po montażu

  return <div>Count: {count}</div>;
}