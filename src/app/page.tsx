"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Highscore from "@/components/Highscore";

type CardType = {
  id: number;
  image: string;
}

const images: string[] = [
  "cabin.svg",
  "car.svg",
  "cow.svg",
  "flower.svg",
  "guitar.svg",
  "pineapple.svg",
];

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [solved, setSolved] = useState<number[]>([])
  const [win, setWin] = useState<boolean>(false);
  const [highscore, setHighscore] = useState<number>(0);


  const shuffleCards = (array: string[]): CardType[] => {
      return array
        .map((image) => ({
          image,
          id: Math.random(),
        }))
        .sort(() => Math.random() - 0.5);
    };

  const startGame = () => {
    const shuffledCards = shuffleCards([...images, ...images]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setSolved([]);
    setMoves(0);
    setWin(false); 
    console.log(localStorage.highscore);
  };

  useEffect(() => {
    const savedHighscore = localStorage.getItem('highscore');
    if(savedHighscore) {
      setHighscore(parseInt(savedHighscore, 10));
    }
    startGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 || flippedCards.includes(index) || solved.includes(index)
    ) return; 

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
    
      if (firstCard.image === secondCard.image) {
        const newMatchedCards = [...solved, firstIndex, secondIndex];
        setSolved(newMatchedCards);
        console.log(solved)
        
        if (newMatchedCards.length === 12) {
          setWin(true); 
          console.log("game won")
        }
      }
      setTimeout(() => 
        setFlippedCards([]), 1100);
    };
    
    setMoves((prevMoves) => prevMoves + 1);
  };

  useEffect(() => {
    if (win) {
      const totalMoves = moves;
      console.log(totalMoves) // blir rätt!!!
  
      if (totalMoves < highscore || highscore === 0) {
        const newHighscore = totalMoves;
        setHighscore(newHighscore);
        localStorage.setItem("highscore", newHighscore.toString());
        console.log("New highscore set: " + newHighscore);
      }
    }
  }, [win, moves]);

  return (
    <main className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center pt-24">
      <div className="grid grid-cols-4 gap-4 max-w-lg">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            isFlipped={
              flippedCards.includes(index) || solved.includes(index)
            }
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div className="text-lg font-semibold" data-testid="moves">
        Moves: {moves}
        {highscore > 0 && <Highscore updateNewHighscore={() => setHighscore(highscore)} /> }
      </div>
      <Footer />
    </main>
  );
}
