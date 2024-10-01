"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Highscore from "@/components/Highscore";
import NewGameButton from "@/components/NewGameBtn";
import Header from "@/components/Header";

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
  const [isNewHighscore, setIsNewHighscore] = useState<boolean>(false);
  const [newHighscore, setNewHighscore] = useState<number>(0)
  const [name, setName] = useState<string>('');

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
    setIsNewHighscore(false);
  };

  useEffect(() => {
    const savedHighscore = localStorage.getItem("highscore");
    const savedName = localStorage.getItem("name");
    if (savedHighscore) {
      setHighscore(parseInt(savedHighscore, 10));
    }
    startGame();

    if (savedName) {
      setName(savedName);
    }
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
        
        if (newMatchedCards.length === 12) {
          setWin(true); 
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
  
      if (totalMoves < highscore || highscore === 0) {
        setNewHighscore(totalMoves);
        setIsNewHighscore(true);
      }
    }
  }, [win, moves]);

  const handleNameSubmit = (submittedName: string) => {
    localStorage.setItem("name", submittedName);
    localStorage.setItem("highscore", newHighscore.toString());
    setHighscore(newHighscore);
    setName(submittedName);
    setIsNewHighscore(false);
  }

  return (
    <main className="w-full bg-yellow-100 flex flex-col items-center">
      <div className="min-h-screen">
        <Header />
        <div className="grid grid-cols-4 gap-2 w-sm m-4 md:w-lg md:gap-4">
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
        <div className="flex flex-col justify-evenly w-sm md:w-lg">
          <div className="text-lg font-semibold bg-yellow-200 m-4 p-4 rounded-lg">
            <p>Moves: <span data-testid="moves">{moves}</span></p>
            <div data-testid="highscore-display" className='flex space-x-1'>
                  <p>Highscore: <span  data-testid="highscore-name" className='text-amber-600'>{name}</span> -</p>
                  <p data-testid="highscore" className='text-amber-600'>{highscore}</p>
            </div>
            {isNewHighscore && (
              <Highscore
              newHighscore={newHighscore}
              updateNewHighscore={handleNameSubmit}
              />
            )}
          </div>
            <NewGameButton newRound={startGame}/>
        </div>
      </div>
      <Footer />
    </main>
  );
}
