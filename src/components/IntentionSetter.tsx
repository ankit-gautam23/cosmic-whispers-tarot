import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const intentions = [
  { name: 'Love', icon: '💖', description: 'Attract deep, meaningful connections' },
  { name: 'Wealth', icon: '💰', description: 'Manifest abundance and prosperity' },
  { name: 'Career', icon: '🌟', description: 'Align with your true calling' },
  { name: 'Health', icon: '🌿', description: 'Cultivate vitality and wellbeing' },
  { name: 'Peace', icon: '☮️', description: 'Find inner harmony and balance' },
  { name: 'Fame', icon: '👑', description: 'Step into your divine purpose' },
];

interface IntentionSetterProps {
  onIntentionSet: (intention: string) => void;
}

const IntentionSetter = ({ onIntentionSet }: IntentionSetterProps) => {
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);

  const handleSetIntention = () => {
    if (selectedIntention) {
      localStorage.setItem('cosmic-intention', selectedIntention);
      onIntentionSet(selectedIntention);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="bg-gradient-cosmic border-primary/30 p-8 max-w-2xl w-full divine-glow">
        <div className="text-center mb-8">
          <h2 className="font-divine text-4xl text-primary mb-4">What is your soul calling in right now?</h2>
          <p className="font-ethereal text-foreground/80 text-lg">
            Choose your sacred intention to receive personalized cosmic guidance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {intentions.map((intention) => (
            <button
              key={intention.name}
              onClick={() => setSelectedIntention(intention.name)}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedIntention === intention.name
                  ? 'border-primary bg-primary/20 shadow-divine'
                  : 'border-accent/30 bg-secondary/30 hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">{intention.icon}</div>
              <h3 className="font-mystical text-primary text-lg">{intention.name}</h3>
              <p className="font-ethereal text-foreground/70 text-sm mt-1">
                {intention.description}
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSetIntention}
            disabled={!selectedIntention}
            variant="divine"
            className="font-mystical text-lg px-8 py-3 disabled:opacity-50"
          >
            Set Sacred Intention ✨
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IntentionSetter;