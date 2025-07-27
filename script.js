// Cosmic Messages for Tarot Cards
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

// Affirmations by Category
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

// Global State
let userIntention = null;
let currentAffirmationIndex = 0;
let affirmationInterval = null;
let countdownInterval = null;

// DOM Elements
const intentionModal = document.getElementById('intentionModal');
const intentionButtons = document.querySelectorAll('.intention-btn');
const setIntentionBtn = document.getElementById('setIntentionBtn');
const affirmationSection = document.getElementById('affirmationSection');
const resetIntentionSection = document.getElementById('resetIntentionSection');
const resetIntentionBtn = document.getElementById('resetIntentionBtn');
const dailyCard = document.getElementById('dailyCard');
const dailyMessage = document.getElementById('dailyMessage');
const drawNewCardBtn = document.getElementById('drawNewCardBtn');
const tarotGrid = document.getElementById('tarotGrid');
const affirmationCard = document.getElementById('affirmationCard');
const affirmationIcon = document.getElementById('affirmationIcon');
const affirmationCategory = document.getElementById('affirmationCategory');
const affirmationText = document.getElementById('affirmationText');
const nextTime = document.getElementById('nextTime');
const timeRemaining = document.getElementById('timeRemaining');
const subscriptionForm = document.getElementById('subscriptionForm');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Check for saved intention
  const savedIntention = localStorage.getItem('cosmic-intention');
  if (savedIntention) {
    userIntention = savedIntention;
    showMainContent();
  } else {
    showIntentionModal();
  }

  // Initialize daily card
  initializeDailyCard();
  
  // Generate tarot grid
  generateTarotGrid();
  
  // Start countdown
  startCountdown();
  
  // Setup event listeners
  setupEventListeners();
}

function showIntentionModal() {
  intentionModal.classList.remove('hidden');
}

function hideIntentionModal() {
  intentionModal.classList.add('hidden');
}

function showMainContent() {
  affirmationSection.classList.remove('hidden');
  resetIntentionSection.classList.remove('hidden');
  startAffirmationRotation();
}

function setupEventListeners() {
  // Intention selection
  intentionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove selected class from all buttons
      intentionButtons.forEach(b => b.classList.remove('selected'));
      // Add selected class to clicked button
      this.classList.add('selected');
      // Enable set intention button
      setIntentionBtn.disabled = false;
    });
  });

  // Set intention
  setIntentionBtn.addEventListener('click', function() {
    const selectedBtn = document.querySelector('.intention-btn.selected');
    if (selectedBtn) {
      userIntention = selectedBtn.dataset.intention;
      localStorage.setItem('cosmic-intention', userIntention);
      hideIntentionModal();
      showMainContent();
    }
  });

  // Reset intention
  resetIntentionBtn.addEventListener('click', function() {
    showIntentionModal();
    // Reset selection
    intentionButtons.forEach(btn => btn.classList.remove('selected'));
    setIntentionBtn.disabled = true;
  });

  // Draw new card
  drawNewCardBtn.addEventListener('click', function() {
    drawNewCard();
  });

  // Daily card flip
  dailyCard.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });

  // Subscription form
  subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const intention = document.getElementById('userIntention').value;
    
    // In a real app, this would integrate with a payment processor
    console.log('Subscription:', { name, email, intention });
    alert('✨ Welcome to the cosmic family! Your divine guidance begins now. 🌙');
  });
}

function initializeDailyCard() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('cosmic-daily-date');
  
  if (savedDate !== today) {
    // New day, generate new card
    const randomMessage = cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)];
    dailyMessage.textContent = randomMessage;
    localStorage.setItem('cosmic-daily-card', randomMessage);
    localStorage.setItem('cosmic-daily-date', today);
  } else {
    // Use saved card for today
    const savedMessage = localStorage.getItem('cosmic-daily-card') || cosmicMessages[0];
    dailyMessage.textContent = savedMessage;
  }
}

function drawNewCard() {
  const randomMessage = cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)];
  dailyMessage.textContent = randomMessage;
  
  // Reset flip if card is currently flipped
  if (dailyCard.classList.contains('flipped')) {
    dailyCard.classList.remove('flipped');
    // Flip again after a short delay
    setTimeout(() => {
      dailyCard.classList.add('flipped');
    }, 300);
  }
}

function generateTarotGrid() {
  tarotGrid.innerHTML = '';
  
  for (let i = 0; i < 12; i++) {
    const card = createTarotCard(cosmicMessages[Math.floor(Math.random() * cosmicMessages.length)]);
    tarotGrid.appendChild(card);
  }
}

function createTarotCard(message) {
  const card = document.createElement('div');
  card.className = 'tarot-card';
  
  card.innerHTML = `
    <div class="tarot-card-inner">
      <div class="tarot-card-front">
        <div class="card-back-design">
          <div class="card-back-overlay">
            <div class="card-back-content">
              <div class="cosmic-symbol">✨</div>
              <p class="cosmic-text">Cosmic Guidance</p>
            </div>
          </div>
        </div>
      </div>
      <div class="tarot-card-back">
        <div class="card-revealed-content">
          <div class="moon-symbol">🌙</div>
          <h3 class="divine-title">Divine Message</h3>
          <p class="divine-message">${message}</p>
          <div class="sparkle">✨</div>
        </div>
      </div>
    </div>
  `;
  
  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
  
  return card;
}

function startAffirmationRotation() {
  if (!userIntention || !affirmationsByCategory[userIntention]) {
    return;
  }

  updateAffirmation();
  
  // Clear existing interval
  if (affirmationInterval) {
    clearInterval(affirmationInterval);
  }
  
  // Rotate affirmations every 5 seconds
  affirmationInterval = setInterval(() => {
    currentAffirmationIndex = (currentAffirmationIndex + 1) % 3;
    updateAffirmation();
  }, 5000);
}

function updateAffirmation() {
  if (!userIntention || !affirmationsByCategory[userIntention]) {
    return;
  }
  
  const categoryAffirmations = affirmationsByCategory[userIntention];
  const currentAffirmation = categoryAffirmations[currentAffirmationIndex];
  
  affirmationIcon.textContent = currentAffirmation.icon;
  affirmationCategory.textContent = userIntention;
  affirmationText.textContent = `"${currentAffirmation.text}"`;
}

function startCountdown() {
  updateCountdown();
  
  // Clear existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  let targetHour;
  let targetLabel;
  
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
    
    nextTime.textContent = targetLabel;
    timeRemaining.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Handle window unload to clear intervals
window.addEventListener('beforeunload', function() {
  if (affirmationInterval) {
    clearInterval(affirmationInterval);
  }
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});