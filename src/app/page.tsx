"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

interface CardType {
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
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = shuffleCards([...images, ...images]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const shuffleCards = (array: string[]): CardType[] => {
    return array
      .map((image) => ({
        image,
        id: Math.random(),
      }))
      .sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;

    const newFlippedCards = [...flippedCards, index];

    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.image === secondCard.image) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }

      setTimeout(() => setFlippedCards([]), 1100);
    }

    setMoves((prevMoves) => prevMoves + 1);
  };

  return (
    <div className="flex flex-col">
      <main className="min-h-screen bg-yellow-100 flex flex-col grow items-center justify-center">
        <div className="grid grid-cols-4 gap-4 max-w-lg">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              image={card.image}
              isFlipped={
                flippedCards.includes(index) || matchedCards.includes(index)
              }
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <div className="text-lg font-semibold" data-testid="moves">
          Moves: {moves}
        </div>
      </main>
      <Footer />
    </div>
  );
}
