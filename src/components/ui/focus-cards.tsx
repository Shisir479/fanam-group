"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-[1.5rem] relative bg-white overflow-hidden aspect-square w-full transition-all duration-300 ease-out cursor-pointer",
        "border-[8px] md:border-[12px] border-white shadow-md",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  ),
);

Card.displayName = "Card";

export type FocusCardType = {
  title: string;
  src: string;
  originalData?: any;
};

export function FocusCards({
  cards,
  onCardClick,
}: {
  cards: FocusCardType[];
  onCardClick?: (card: FocusCardType) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title + index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={() => onCardClick && onCardClick(card)}
        />
      ))}
    </div>
  );
}
