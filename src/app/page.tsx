"use client";

import { use, useEffect, useState } from "react";
import Card from "@/components/Card";
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
  // const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [solved, setSolved] = useState<number[]>([])
  const [win, setWin] = useState<boolean>(false);
  const [highscore, setHighscore] = useState<number>(0);
  // const [newHighscore, setNewHighscore] = useState<boolean>(false);


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
  };

  useEffect(() => {
    const savedHighscore = localStorage.getItem('highscore');
    if(savedHighscore) {
      setHighscore(parseInt(savedHighscore, 10));
      console.log(highscore)
    }
    startGame();
  }, []);

  // useEffect(() => {
  //   if (solved.length === 10 ) {
  //         setWin(true);
  //         if(moves < highscore || highscore === 0) {
  //           console.log("game won")
  //           setHighscore(moves + 2);
  //           localStorage.setItem("highscore", highscore.toString());
  //           console.log("new highscore: "+ highscore);
  //         }
  //       }
  // }, [solved, moves]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 || flippedCards.includes(index) || solved.includes(index)
    ) return; // exit if above is true ie if flipped cards are 2, or if the clicked card is already flipped or if a matchedcard is flipped

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
    
      if (firstCard.image === secondCard.image) {
        const newMatchedCards = [...solved, firstIndex, secondIndex];
        setSolved(newMatchedCards);
        console.log("new matched cards: " + newMatchedCards);
        
        if (newMatchedCards.length === 12) {
          setWin(true); 
          console.log("game won!")
          if (moves < highscore || highscore === 0) {
            console.log("Game won with new highscore");
            const newHighscore = moves + 2; // Add 2 to match your logic
            setHighscore(newHighscore);
            localStorage.setItem("highscore", newHighscore.toString());
            console.log("New highscore: " + newHighscore);
          }
        //
      }
    }
    setTimeout(() => 
      setFlippedCards([]), 1100);
  };

    setMoves((prevMoves) => prevMoves + 1);
  };

  return (
    <main className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center">
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
        {/* {newHighscore && <Highscore updateNewHighscore={() => setNewHighscore(false)} /> } */}
      </div>
    </main>
  );
}
