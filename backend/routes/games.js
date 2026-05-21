const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '../data/users.json');

const getUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
    return [];
  }
};

const saveUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

// Создание перемешанной колоды
const createShuffledDeck = () => {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  // Перемешивание Фишера-Йетса
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Подсчет очков
const calculateScore = (hand) => {
  if (!hand || !Array.isArray(hand)) return 0;
  let score = 0;
  let aces = 0;
  for (const card of hand) {
    if (!card || !card.value) continue;
    if (card.value === 'A') {
      aces++;
      score += 11;
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
};

// Проверка блэкджека
const isBlackjack = (hand) => {
  return hand && hand.length === 2 && calculateScore(hand) === 21;
};

// ============ СЛОТЫ ============
router.post('/slots', authenticateToken, async (req, res) => {
  try {
    const { bet } = req.body;
    const userId = req.user.id;

    if (!bet || bet <= 0 || !Number.isInteger(bet)) {
      return res.status(400).json({ error: 'Ставка должна быть положительным целым числом' });
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return res.status(404).json({ error: 'Пользователь не найден' });
    if (users[userIndex].balance < bet) return res.status(400).json({ error: 'Недостаточно средств' });

    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '👑'];
    const reels = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    let winAmount = 0;
    let multiplier = 0;
    
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      switch(reels[0]) {
        case '🍒': multiplier = 5; break;
        case '🍋': multiplier = 8; break;
        case '🍊': multiplier = 10; break;
        case '🍇': multiplier = 15; break;
        case '🔔': multiplier = 20; break;
        case '💎': multiplier = 30; break;
        case '7️⃣': multiplier = 50; break;
        case '👑': multiplier = 100; break;
        default: multiplier = 10;
      }
      winAmount = bet * multiplier;
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      multiplier = 2;
      winAmount = bet * 2;
    }

    const balanceChange = winAmount - bet;
    users[userIndex].balance += balanceChange;

    users[userIndex].gamesHistory.push({
      gameType: 'slots',
      betAmount: bet,
      result: winAmount > 0 ? 'win' : 'lose',
      winAmount: winAmount,
      reelResult: reels,
      multiplier: multiplier,
      timestamp: new Date().toISOString()
    });

    await saveUsers(users);

    res.json({
      reels,
      win: winAmount > 0,
      winAmount,
      multiplier,
      newBalance: users[userIndex].balance
    });
  } catch (error) {
    console.error('Slots error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============ БЛЭКДЖЕК - НАЧАЛО ИГРЫ ============
router.post('/blackjack/start', authenticateToken, async (req, res) => {
  console.log('📝 Blackjack start - bet:', req.body.bet);
  try {
    const { bet } = req.body;
    const userId = req.user.id;

    if (!bet || bet <= 0) {
      return res.status(400).json({ error: 'Ставка должна быть положительной' });
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return res.status(404).json({ error: 'Пользователь не найден' });
    if (users[userIndex].balance < bet) return res.status(400).json({ error: 'Недостаточно средств' });

    const deck = createShuffledDeck();
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];
    
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    const playerBlackjack = isBlackjack(playerHand);
    const dealerBlackjack = isBlackjack(dealerHand);
    
    let gameResult = null;
    let winAmount = 0;
    let gameEnded = false;
    
    if (playerBlackjack && dealerBlackjack) {
      gameResult = 'push';
      winAmount = bet;
      gameEnded = true;
    } else if (playerBlackjack) {
      gameResult = 'blackjack';
      winAmount = Math.floor(bet * 2.5);
      gameEnded = true;
    } else if (dealerBlackjack) {
      gameResult = 'lose';
      winAmount = 0;
      gameEnded = true;
    }
    
    if (gameEnded) {
      const balanceChange = winAmount - bet;
      users[userIndex].balance += balanceChange;
      
      users[userIndex].gamesHistory.push({
        gameType: 'blackjack',
        betAmount: bet,
        result: gameResult,
        winAmount: winAmount,
        playerHand: playerHand,
        dealerHand: dealerHand,
        playerScore: playerScore,
        dealerScore: dealerScore,
        timestamp: new Date().toISOString()
      });
      
      await saveUsers(users);
      
      return res.json({
        playerHand: playerHand,
        dealerHand: dealerHand,
        playerScore: playerScore,
        dealerScore: dealerScore,
        gameResult: gameResult,
        winAmount: winAmount - bet,
        newBalance: users[userIndex].balance,
        gameEnded: true,
        deck: deck
      });
    }
    
    res.json({
      playerHand: playerHand,
      dealerHand: [dealerHand[0], { suit: '?', value: '?' }],
      playerScore: playerScore,
      dealerScore: calculateScore([dealerHand[0]]),
      gameResult: null,
      gameEnded: false,
      deck: deck,
      bet: bet
    });
    
  } catch (error) {
    console.error('Blackjack start error:', error);
    res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
  }
});

// ============ БЛЭКДЖЕК - ВЗЯТЬ КАРТУ ============
router.post('/blackjack/hit', authenticateToken, async (req, res) => {
  console.log('📝 Blackjack hit - received:', req.body);
  try {
    const { playerHand, bet } = req.body;
    const userId = req.user.id;
    
    if (!playerHand || !Array.isArray(playerHand)) {
      return res.status(400).json({ error: 'Неверные данные' });
    }
    
    // Создаем новую колоду
    const deck = createShuffledDeck();
    
    // Копируем руку игрока
    const updatedHand = JSON.parse(JSON.stringify(playerHand));
    const newCard = deck.pop();
    updatedHand.push(newCard);
    const playerScore = calculateScore(updatedHand);
    
    console.log('Updated hand:', updatedHand, 'Score:', playerScore);
    
    // Проверка на перебор
    if (playerScore > 21) {
      const users = await getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        const balanceChange = -bet;
        users[userIndex].balance += balanceChange;
        
        users[userIndex].gamesHistory.push({
          gameType: 'blackjack',
          betAmount: bet,
          result: 'bust',
          winAmount: 0,
          playerHand: updatedHand,
          dealerHand: [],
          playerScore: playerScore,
          dealerScore: 0,
          timestamp: new Date().toISOString()
        });
        
        await saveUsers(users);
        
        return res.json({
          playerHand: updatedHand,
          playerScore: playerScore,
          bust: true,
          gameEnded: true,
          newBalance: users[userIndex].balance
        });
      }
    }
    
    res.json({
      playerHand: updatedHand,
      playerScore: playerScore,
      bust: false,
      gameEnded: false
    });
    
  } catch (error) {
    console.error('Blackjack hit error:', error);
    res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
  }
});

// ============ БЛЭКДЖЕК - ХВАТИТ ============
router.post('/blackjack/stand', authenticateToken, async (req, res) => {
  console.log('📝 Blackjack stand - received:', req.body);
  try {
    const { dealerHand, playerHand, playerScore, bet } = req.body;
    const userId = req.user.id;
    
    if (!dealerHand || !playerHand) {
      return res.status(400).json({ error: 'Неверные данные' });
    }
    
    // Создаем новую колоду
    const deck = createShuffledDeck();
    
    // Копируем руку дилера и убираем скрытую карту
    let currentDealerHand = JSON.parse(JSON.stringify(dealerHand));
    currentDealerHand = currentDealerHand.filter(card => card.value !== '?');
    
    let currentDealerScore = calculateScore(currentDealerHand);
    
    console.log('Initial dealer hand:', currentDealerHand, 'Score:', currentDealerScore);
    
    // Дилер берет карты пока не наберет 17 или больше
    while (currentDealerScore < 17) {
      const newCard = deck.pop();
      currentDealerHand.push(newCard);
      currentDealerScore = calculateScore(currentDealerHand);
      console.log('Dealer takes card:', newCard, 'New score:', currentDealerScore);
    }
    
    // Определяем победителя
    let gameResult = '';
    let winAmount = 0;
    
    if (currentDealerScore > 21) {
      gameResult = 'win';
      winAmount = bet * 2;
      console.log('Dealer bust - player wins');
    } else if (playerScore > currentDealerScore) {
      gameResult = 'win';
      winAmount = bet * 2;
      console.log('Player wins - higher score');
    } else if (playerScore < currentDealerScore) {
      gameResult = 'lose';
      winAmount = 0;
      console.log('Dealer wins - higher score');
    } else {
      gameResult = 'push';
      winAmount = bet;
      console.log('Push - tie');
    }
    
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      const balanceChange = winAmount - bet;
      users[userIndex].balance += balanceChange;
      
      users[userIndex].gamesHistory.push({
        gameType: 'blackjack',
        betAmount: bet,
        result: gameResult,
        winAmount: winAmount,
        playerHand: playerHand,
        dealerHand: currentDealerHand,
        playerScore: playerScore,
        dealerScore: currentDealerScore,
        timestamp: new Date().toISOString()
      });
      
      await saveUsers(users);
      
      res.json({
        dealerHand: currentDealerHand,
        dealerScore: currentDealerScore,
        gameResult: gameResult,
        winAmount: winAmount - bet,
        newBalance: users[userIndex].balance,
        gameEnded: true
      });
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
    
  } catch (error) {
    console.error('Blackjack stand error:', error);
    res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
  }
});

// ============ КОСТИ ============
router.post('/dice', authenticateToken, async (req, res) => {
  try {
    const { bet, targetNumber } = req.body;
    const userId = req.user.id;

    if (!bet || bet <= 0) return res.status(400).json({ error: 'Ставка должна быть положительной' });
    if (targetNumber < 2 || targetNumber > 99) return res.status(400).json({ error: 'Цель от 2 до 99' });

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: 'Пользователь не найден' });
    if (users[userIndex].balance < bet) return res.status(400).json({ error: 'Недостаточно средств' });

    const roll = Math.floor(Math.random() * 100) + 1;
    const win = roll < targetNumber;
    const multiplier = 99 / (targetNumber - 1);
    const winAmount = win ? Math.floor(bet * multiplier) : 0;
    const balanceChange = win ? winAmount - bet : -bet;
    
    users[userIndex].balance += balanceChange;

    users[userIndex].gamesHistory.push({
      gameType: 'dice',
      betAmount: bet,
      targetNumber,
      roll,
      result: win ? 'win' : 'lose',
      winAmount: win ? winAmount : 0,
      multiplier: multiplier.toFixed(2),
      timestamp: new Date().toISOString()
    });

    await saveUsers(users);

    res.json({
      roll,
      targetNumber,
      win,
      winAmount: win ? winAmount : 0,
      multiplier: multiplier.toFixed(2),
      newBalance: users[userIndex].balance
    });
  } catch (error) {
    console.error('Dice error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;