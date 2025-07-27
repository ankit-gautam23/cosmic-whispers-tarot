import { useState } from 'react';
import { Card } from '@/components/ui/card';
import tarotCardBack from '@/assets/tarot-card-back.jpg';

interface TarotCardProps {
  message: string;
  isRevealed?: boolean;
  onFlip?: () => void;
}

const TarotCard = ({ message, isRevealed = false, onFlip }: TarotCardProps) => {
  const [flipped, setFlipped] = useState(isRevealed);

  const handleClick = () => {
    setFlipped(!flipped);
    onFlip?.();
  };

  return (
    <div 
      className={`tarot-card w-full aspect-[2/3] cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="tarot-card-inner h-full">
        {/* Card Back */}
        <Card className="tarot-card-front divine-glow bg-gradient-cosmic border-accent/30 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${tarotCardBack})` }}
          >
            <div className="absolute inset-0 bg-gradient-cosmic/60 flex items-center justify-center">
              <div className="text-center">
                <div className="text-primary text-2xl font-divine mb-2">✨</div>
                <p className="text-primary/80 font-mystical text-sm">Cosmic Guidance</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Card Front - Revealed Message */}
        <Card className="tarot-card-back divine-glow bg-gradient-ethereal border-primary/50 p-6">
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-primary text-4xl mb-4 cosmic-pulse">🌙</div>
            <h3 className="font-mystical text-primary text-lg mb-4">Divine Message</h3>
            <p className="font-ethereal text-foreground/90 text-base leading-relaxed">
              {message}
            </p>
            <div className="mt-6 text-primary/70 text-xl">✨</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TarotCard;