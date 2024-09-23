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

  const [isNewHighscore, setIsNewHighscore] = useState<boolean>(false); // New state for popup
  const [newHighscore, setNewHighscore] = useState<number>(0)


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
    setIsNewHighscore(false);
  };

  useEffect(() => {
    const savedHighscore = localStorage.getItem("highscore");
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
  
      if (totalMoves < highscore || highscore === 0) {
        setNewHighscore(totalMoves); //set new highscore for popup
        setIsNewHighscore(true); // trigger the popup 
      }
    }
  }, [win, moves]);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem("name", name);
    localStorage.setItem("highscore", newHighscore.toString());
    setHighscore(newHighscore); //update the highscore in state
    setIsNewHighscore(false) //close the popup
  }

  return (
    <main className="min-h-screen w-full bg-yellow-100 flex flex-col grow items-center justify-center">
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
      <div className="text-lg font-semibold bg-yellow-200 m-8 p-4 rounded-lg" data-testid="moves">
        <p>Moves: {moves}</p>
        <div data-testid="highscore-display" className='flex space-x-1'>
              <p>Highscore: <span className='text-amber-600'>{localStorage.getItem('name')}</span> -</p>
              <p className='text-amber-600'>{localStorage.getItem('highscore')}</p>
        </div>
        {isNewHighscore && (
          <Highscore
          newHighscore={newHighscore}
          updateNewHighscore={handleNameSubmit}
          />
        )}
        {/* {highscore > 0 && <Highscore updateNewHighscore={() => setHighscore(highscore)} /> } */}
      </div>
      <Footer />
    </main>
  );
}
