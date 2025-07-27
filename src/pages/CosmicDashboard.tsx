import { useState, useEffect } from 'react';
import TarotCard from '@/components/TarotCard';
import AffirmationCard from '@/components/AffirmationCard';
import IntentionSetter from '@/components/IntentionSetter';
import SubscriptionPortal from '@/components/SubscriptionPortal';
import CountdownClock from '@/components/CountdownClock';
import { Button } from '@/components/ui/button';
import cosmicBg from '@/assets/cosmic-bg.jpg';

const cosmicMessages = [
  "Trust your path. The stars are aligning to bring you exactly what you need.",
  "Your intuition is your superpower. Listen to the whispers of your soul.",
  "Abundance flows to you from all directions. You are worthy of all good things.",
  "Love surrounds you in ways you cannot yet see. Open your heart to receive.",
  "Your dreams are not too big. The universe conspires to help those who believe.",
  "This moment of challenge is preparing you for your greatest breakthrough.",
  "You are exactly where you need to be. Trust the divine timing of your life.",
  "Your authentic self is your greatest gift. Shine your light without fear.",
  "What you seek is seeking you. Stay open to magic and miracles.",
  "Your journey is sacred. Every step leads you closer to your highest self.",
];

const affirmationsByCategory = {
  Love: [
    { text: "I am worthy of deep, unconditional love and attract it effortlessly", icon: "💖" },
    { text: "My heart is open to receiving all the love the universe has for me", icon: "💖" },
    { text: "I radiate love and attract loving relationships into my life", icon: "💖" },
  ],
  Wealth: [
    { text: "Abundance flows to me from multiple sources in surprising ways", icon: "💰" },
    { text: "I am a magnet for financial opportunities and prosperity", icon: "💰" },
    { text: "Money comes to me easily and frequently through divine channels", icon: "💰" },
  ],
  Career: [
    { text: "I am aligned with my highest purpose and it brings me joy and abundance", icon: "🌟" },
    { text: "Opportunities for growth and success present themselves to me daily", icon: "🌟" },
    { text: "My unique talents are recognized and rewarded abundantly", icon: "🌟" },
  ],
  Health: [
    { text: "My body is a temple of divine energy, vibrant and strong", icon: "🌿" },
    { text: "Every cell in my body radiates perfect health and vitality", icon: "🌿" },
    { text: "I honor my body and it responds with wellness and energy", icon: "🌿" },
  ],
  Peace: [
    { text: "I am surrounded by divine peace and tranquility in all moments", icon: "☮️" },
    { text: "My mind is calm, my heart is peaceful, my spirit is free", icon: "☮️" },
    { text: "I release all that no longer serves me and embrace inner harmony", icon: "☮️" },
  ],
  Fame: [
    { text: "I step into my power and share my gifts with the world fearlessly", icon: "👑" },
    { text: "My authentic self attracts recognition and opportunities for impact", icon: "👑" },
    { text: "I am ready to shine my light and inspire others through my example", icon: "👑" },
  ],
};

const CosmicDashboard = () => {
  const [intention, setIntention] = useState<string | null>(null);
  const [showIntentionSetter, setShowIntentionSetter] = useState(false);
  const [dailyCard, setDailyCard] = useState<string>('');
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  useEffect(() => {
    const savedIntention = localStorage.getItem('cosmic-intention');
    if (savedIntention) {
      setIntention(savedIntention);
    } else {
      setShowIntentionSetter(true);
    }

    // Set daily card based on date
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('cosmic-daily-date');
    if (savedDate !== today) {
      const randomMessage = cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)];
      setDailyCard(randomMessage);
      localStorage.setItem('cosmic-daily-card', randomMessage);
      localStorage.setItem('cosmic-daily-date', today);
    } else {
      setDailyCard(localStorage.getItem('cosmic-daily-card') || cosmicMessages[0]);
    }

    // Rotate affirmations every 5 seconds
    const interval = setInterval(() => {
      setCurrentAffirmation(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleIntentionSet = (newIntention: string) => {
    setIntention(newIntention);
    setShowIntentionSetter(false);
  };

  const getCurrentAffirmation = () => {
    if (!intention || !affirmationsByCategory[intention as keyof typeof affirmationsByCategory]) {
      return affirmationsByCategory.Love[0];
    }
    const categoryAffirmations = affirmationsByCategory[intention as keyof typeof affirmationsByCategory];
    return categoryAffirmations[currentAffirmation];
  };

  const drawNewCard = () => {
    const randomMessage = cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)];
    setDailyCard(randomMessage);
  };

  return (
    <div 
      className="min-h-screen cosmic-bg relative"
      style={{ 
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10">
        {showIntentionSetter && (
          <IntentionSetter onIntentionSet={handleIntentionSet} />
        )}

        {/* Header */}
        <header className="text-center py-16 px-4">
          <h1 className="font-divine text-6xl md:text-8xl text-gradient-divine mb-4 float">
            Cosmic Tarot
          </h1>
          <p className="font-ethereal text-xl md:text-2xl text-foreground/80">
            ✨ Where the Universe Speaks Directly to Your Soul ✨
          </p>
        </header>

        <div className="container mx-auto px-4 pb-16">
          {/* Daily Card Section */}
          <section className="mb-16">
            <h2 className="font-mystical text-3xl text-primary text-center mb-8">
              Your Daily Cosmic Guidance
            </h2>
            <div className="max-w-md mx-auto mb-8">
              <TarotCard message={dailyCard} />
            </div>
            <div className="text-center">
              <Button 
                onClick={drawNewCard}
                variant="divine"
                className="font-mystical px-6 py-3"
              >
                Draw New Guidance ✨
              </Button>
            </div>
          </section>

          {/* Affirmation Section */}
          {intention && (
            <section className="mb-16">
              <h2 className="font-mystical text-3xl text-primary text-center mb-8">
                Your Sacred Affirmations
              </h2>
              <div className="max-w-2xl mx-auto">
                <AffirmationCard 
                  affirmation={getCurrentAffirmation().text}
                  category={intention}
                  icon={getCurrentAffirmation().icon}
                />
              </div>
            </section>
          )}

          {/* Tarot Grid */}
          <section className="mb-16">
            <h2 className="font-mystical text-3xl text-primary text-center mb-8">
              The Mystic Deck Awaits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {Array.from({ length: 12 }, (_, i) => (
                <TarotCard 
                  key={i}
                  message={cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)]}
                />
              ))}
            </div>
          </section>

          {/* Countdown and Subscription */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <CountdownClock />
            </div>
            <div>
              <SubscriptionPortal />
            </div>
          </div>

          {/* Reset Intention Button */}
          {intention && (
            <div className="text-center mt-12">
              <Button 
                onClick={() => setShowIntentionSetter(true)}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/20"
              >
                🔮 Change Your Sacred Intention
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CosmicDashboard;