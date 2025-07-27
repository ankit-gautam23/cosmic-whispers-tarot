import { Card } from '@/components/ui/card';

interface AffirmationCardProps {
  affirmation: string;
  category: string;
  icon: string;
}

const AffirmationCard = ({ affirmation, category, icon }: AffirmationCardProps) => {
  return (
    <Card className="p-8 bg-gradient-ethereal border-accent/30 divine-glow float">
      <div className="text-center">
        <div className="text-5xl mb-4 cosmic-pulse">{icon}</div>
        <h3 className="font-mystical text-primary text-xl mb-4">{category}</h3>
        <p className="font-ethereal text-foreground/90 text-lg leading-relaxed italic">
          "{affirmation}"
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <span className="text-primary/50">✨</span>
          <span className="text-primary/70">🌟</span>
          <span className="text-primary/50">✨</span>
        </div>
      </div>
    </Card>
  );
};

export default AffirmationCard;