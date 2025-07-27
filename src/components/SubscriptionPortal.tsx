import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SubscriptionPortal = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [intention, setIntention] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with a payment processor
    console.log('Subscription:', { email, name, intention });
    alert('✨ Welcome to the cosmic family! Your divine guidance begins now. 🌙');
  };

  return (
    <Card className="bg-gradient-cosmic border-primary/30 p-8 divine-glow">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🌙</div>
        <h2 className="font-divine text-4xl text-primary mb-4">
          Unlock Weekly Rituals & Daily Divine Guidance
        </h2>
        <p className="font-ethereal text-foreground/80 text-xl mb-2">
          Join our sacred circle for $5/month
        </p>
        <div className="bg-primary/20 rounded-lg p-4 mt-4">
          <p className="font-mystical text-primary text-lg">
            ✨ Daily Affirmations at 11:11 AM & 12:12 PM
          </p>
          <p className="font-ethereal text-foreground/80 mt-2">
            Aligned with cosmic vibrations • Weekly manifestation rituals • Personalized tarot readings
          </p>
        </div>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-6">
        <div>
          <label className="block font-mystical text-primary mb-2">Sacred Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="bg-secondary/30 border-accent/30 text-foreground"
            required
          />
        </div>

        <div>
          <label className="block font-mystical text-primary mb-2">Cosmic Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@cosmic.com"
            className="bg-secondary/30 border-accent/30 text-foreground"
            required
          />
        </div>

        <div>
          <label className="block font-mystical text-primary mb-2">Primary Intention</label>
          <Select value={intention} onValueChange={setIntention}>
            <SelectTrigger className="bg-secondary/30 border-accent/30 text-foreground">
              <SelectValue placeholder="Choose your heart's desire" />
            </SelectTrigger>
            <SelectContent className="bg-card border-accent/30">
              <SelectItem value="love">💖 Love & Relationships</SelectItem>
              <SelectItem value="wealth">💰 Wealth & Abundance</SelectItem>
              <SelectItem value="career">🌟 Career & Purpose</SelectItem>
              <SelectItem value="health">🌿 Health & Vitality</SelectItem>
              <SelectItem value="peace">☮️ Peace & Balance</SelectItem>
              <SelectItem value="fame">👑 Recognition & Fame</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          variant="divine"
          className="w-full font-mystical text-xl py-4 cosmic-pulse"
        >
          Begin Your Cosmic Journey - $5/month ✨
        </Button>

        <div className="text-center">
          <p className="font-ethereal text-foreground/60 text-sm">
            🔮 Cancel anytime • Secure cosmic connection • Money-back guarantee
          </p>
        </div>
      </form>
    </Card>
  );
};

export default SubscriptionPortal;