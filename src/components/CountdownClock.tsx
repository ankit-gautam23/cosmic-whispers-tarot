import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const CountdownClock = () => {
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [nextTime, setNextTime] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      let targetHour: number;
      let targetLabel: string;

      // Determine next 11:11 or 12:12
      if (currentHour < 11 || (currentHour === 11 && currentMinute < 11)) {
        targetHour = 11;
        targetLabel = '11:11 AM';
      } else if (currentHour < 12 || (currentHour === 12 && currentMinute < 12)) {
        targetHour = 12;
        targetLabel = '12:12 PM';
      } else {
        // Next day 11:11 AM
        targetHour = 11 + 24;
        targetLabel = '11:11 AM';
      }

      const target = new Date(now);
      target.setHours(targetHour % 24, targetHour === 12 ? 12 : 11, 0, 0);
      if (targetHour >= 24) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeUntilNext(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setNextTime(targetLabel);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-ethereal border-primary/30 p-6 divine-glow">
      <div className="text-center">
        <div className="text-3xl mb-2 cosmic-pulse">⏰</div>
        <h3 className="font-mystical text-primary text-lg mb-2">Next Cosmic Alignment</h3>
        <div className="font-divine text-2xl text-primary mb-2">{nextTime}</div>
        <div className="font-mono text-foreground text-xl">{timeUntilNext}</div>
        <p className="font-ethereal text-foreground/70 text-sm mt-3">
          Your next divine affirmation arrives with perfect cosmic timing
        </p>
      </div>
    </Card>
  );
};

export default CountdownClock;