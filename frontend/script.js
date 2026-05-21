// ============ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ============
const API_BASE = '/api';
let authToken = localStorage.getItem('authToken');
let currentUser = null;
let blackjackGameActive = false;
let currentBlackjackBet = 0;

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('hidden');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('hidden');
}

function showMessage(msg, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `${msg}<button class="notification-close">×</button>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    notification.querySelector('.notification-close')?.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            if (p.y < canvas.height) {
                active = true;
                p.y += p.speed;
                p.x += Math.sin(p.angle) * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        });
        if (active) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

// ============ АУТЕНТИФИКАЦИЯ ============
async function checkAuth() {
    if (!authToken) {
        showAuthPage();
        return false;
    }
    try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (res.ok) {
            const data = await res.json();
            currentUser = data.user;
            updateUIForUser();
            return true;
        } else {
            throw new Error('Token invalid');
        }
    } catch(e) {
        localStorage.removeItem('authToken');
        authToken = null;
        showAuthPage();
        return false;
    }
}

function updateUIForUser() {
    if (!currentUser) return;
    const balanceSpan = document.getElementById('balanceValue');
    if (balanceSpan) balanceSpan.textContent = currentUser.balance;
    
    const usernameSpan = document.getElementById('usernameDisplay');
    if (usernameSpan) usernameSpan.textContent = currentUser.username;
    
    const regDateSpan = document.getElementById('registrationDate');
    if (regDateSpan && currentUser.registrationDate) {
        regDateSpan.textContent = new Date(currentUser.registrationDate).toLocaleDateString('ru-RU');
    }
    
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const homeSection = document.getElementById('homeSection');
    if (homeSection) homeSection.classList.add('active');
    
    const header = document.querySelector('.header');
    if (header) header.style.display = 'block';
    
    const authSection = document.getElementById('authSection');
    if (authSection) authSection.classList.remove('active');
    
    loadLeaderboard();
    loadProfile();
}

function showAuthPage() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const authSection = document.getElementById('authSection');
    if (authSection) authSection.classList.add('active');
    
    const header = document.querySelector('.header');
    if (header) header.style.display = 'none';
}

async function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (!username || !email || !password) {
        showMessage('Заполните все поля', 'error');
        return;
    }
    if (password.length < 6) {
        showMessage('Пароль минимум 6 символов', 'error');
        return;
    }
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            currentUser = data.user;
            updateUIForUser();
            showMessage('Регистрация успешна!', 'success');
        } else {
            showMessage(data.error || 'Ошибка', 'error');
        }
    } catch(e) {
        showMessage('Ошибка сети', 'error');
    }
    hideLoading();
}

async function loginUser(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showMessage('Заполните все поля', 'error');
        return;
    }
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            currentUser = data.user;
            updateUIForUser();
            showMessage('Добро пожаловать!', 'success');
        } else {
            showMessage(data.error || 'Неверные данные', 'error');
        }
    } catch(e) {
        showMessage('Ошибка сети', 'error');
    }
    hideLoading();
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    showAuthPage();
    showMessage('Вы вышли', 'info');
}

// ============ НАВИГАЦИЯ ============
function setActiveSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const map = {
        'homeSection': 'homeBtn',
        'gamesSection': 'gamesBtn', 
        'leaderboardSection': 'leaderboardBtn',
        'profileSection': 'profileBtn'
    };
    if (map[sectionId]) {
        const btn = document.getElementById(map[sectionId]);
        if (btn) btn.classList.add('active');
    }
    
    if (sectionId === 'leaderboardSection') loadLeaderboard();
    if (sectionId === 'profileSection') loadProfile();
}

function switchGame(game) {
    const gameBtns = document.querySelectorAll('.game-btn');
    gameBtns.forEach(btn => btn.classList.remove('active'));
    
    const selectedBtn = document.getElementById(`${game}Btn`);
    if (selectedBtn) selectedBtn.classList.add('active');
    
    const gameAreas = document.querySelectorAll('.game-area');
    gameAreas.forEach(area => area.classList.remove('active'));
    
    const selectedGame = document.getElementById(`${game}Game`);
    if (selectedGame) selectedGame.classList.add('active');
    
    if (game === 'blackjack') {
        resetBlackjack();
    }
}

// ============ СЛОТЫ ============
async function playSlots() {
    if (!currentUser) return;
    const betSelect = document.getElementById('slotsBet');
    if (!betSelect) return;
    
    const bet = parseInt(betSelect.value);
    
    if (bet > currentUser.balance) {
        showMessage('Недостаточно средств!', 'error');
        return;
    }
    
    const reels = document.querySelectorAll('.reel .slot');
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '👑'];
    const spinInterval = setInterval(() => {
        reels.forEach(reel => {
            if (reel) reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });
    }, 50);
    
    try {
        const res = await fetch(`${API_BASE}/games/slots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ bet })
        });
        const data = await res.json();
        
        setTimeout(() => {
            clearInterval(spinInterval);
            if (res.ok) {
                reels.forEach((reel, i) => {
                    if (reel && data.reels[i]) reel.textContent = data.reels[i];
                });
                currentUser.balance = data.newBalance;
                const balanceSpan = document.getElementById('balanceValue');
                if (balanceSpan) balanceSpan.textContent = currentUser.balance;
                
                if (data.win) {
                    showConfetti();
                    showMessage(`🎉 ВЫИГРЫШ! ${data.winAmount} 🪙 (x${data.multiplier})`, 'success');
                } else {
                    showMessage(`😢 Проигрыш: ${bet} 🪙`, 'error');
                }
            } else {
                showMessage(data.error || 'Ошибка', 'error');
            }
        }, 1000);
    } catch(e) {
        clearInterval(spinInterval);
        showMessage('Ошибка сети', 'error');
    }
}

// ============ БЛЭКДЖЕК ============
async function startBlackjack() {
    if (!currentUser) return;
    const betSelect = document.getElementById('blackjackBet');
    if (!betSelect) return;
    
    const bet = parseInt(betSelect.value);
    
    if (bet > currentUser.balance) {
        showMessage('Недостаточно средств!', 'error');
        return;
    }
    
    currentBlackjackBet = bet;
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/games/blackjack/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ bet })
        });
        const data = await res.json();
        
        if (res.ok) {
            displayBJHand(data.playerHand, 'playerCards');
            displayBJHand(data.dealerHand, 'dealerCards');
            
            const playerScoreSpan = document.getElementById('playerScore');
            const dealerScoreSpan = document.getElementById('dealerScore');
            if (playerScoreSpan) playerScoreSpan.textContent = data.playerScore;
            if (dealerScoreSpan) dealerScoreSpan.textContent = data.dealerScore;
            
            const hitBtn = document.getElementById('hitBtn');
            const standBtn = document.getElementById('standBtn');
            
            if (data.gameEnded) {
                if (hitBtn) hitBtn.disabled = true;
                if (standBtn) standBtn.disabled = true;
                blackjackGameActive = false;
                currentUser.balance = data.newBalance;
                const balanceSpan = document.getElementById('balanceValue');
                if (balanceSpan) balanceSpan.textContent = currentUser.balance;
                
                if (data.gameResult === 'blackjack') {
                    showConfetti();
                    showMessage(`🃏 БЛЭКДЖЕК! Выигрыш ${data.winAmount} 🪙`, 'success');
                } else if (data.gameResult === 'push') {
                    showMessage('Ничья!', 'info');
                } else if (data.gameResult === 'lose') {
                    showMessage(`😢 У дилера блэкджек! Проигрыш ${bet} 🪙`, 'error');
                }
            } else {
                if (hitBtn) hitBtn.disabled = false;
                if (standBtn) standBtn.disabled = false;
                blackjackGameActive = true;
                showMessage('Игра началась! Ваш ход', 'success');
            }
        } else {
            showMessage(data.error || 'Ошибка', 'error');
        }
    } catch(e) {
        console.error('Start error:', e);
        showMessage('Ошибка сети', 'error');
    }
    hideLoading();
}

async function hitBlackjack() {
    if (!blackjackGameActive) return;
    
    const playerCards = document.querySelectorAll('#playerCards .card');
    const currentHand = Array.from(playerCards).map(card => {
        const valueElem = card.querySelector('.card-value');
        const suitElem = card.querySelector('.card-suit');
        const value = valueElem ? valueElem.textContent : null;
        const suit = suitElem ? suitElem.textContent : null;
        return { value, suit };
    }).filter(c => c.value && c.value !== '?');
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/games/blackjack/hit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                deck: [],
                playerHand: currentHand,
                bet: currentBlackjackBet
            })
        });
        const data = await res.json();
        
        if (res.ok) {
            displayBJHand(data.playerHand, 'playerCards');
            const playerScoreSpan = document.getElementById('playerScore');
            if (playerScoreSpan) playerScoreSpan.textContent = data.playerScore;
            
            if (data.bust) {
                blackjackGameActive = false;
                const hitBtn = document.getElementById('hitBtn');
                const standBtn = document.getElementById('standBtn');
                if (hitBtn) hitBtn.disabled = true;
                if (standBtn) standBtn.disabled = true;
                currentUser.balance = data.newBalance;
                const balanceSpan = document.getElementById('balanceValue');
                if (balanceSpan) balanceSpan.textContent = currentUser.balance;
                showMessage(`💀 ПЕРЕБОР! Проигрыш ${currentBlackjackBet} 🪙`, 'error');
            }
        }
    } catch(e) {
        console.error('Hit error:', e);
        showMessage('Ошибка', 'error');
    }
    hideLoading();
}

async function standBlackjack() {
    if (!blackjackGameActive) return;
    
    const playerCards = document.querySelectorAll('#playerCards .card');
    const currentPlayerHand = Array.from(playerCards).map(card => {
        const valueElem = card.querySelector('.card-value');
        const suitElem = card.querySelector('.card-suit');
        const value = valueElem ? valueElem.textContent : null;
        const suit = suitElem ? suitElem.textContent : null;
        return { value, suit };
    }).filter(c => c.value && c.value !== '?');
    
    const dealerCards = document.querySelectorAll('#dealerCards .card');
    const currentDealerHand = Array.from(dealerCards).map(card => {
        const valueElem = card.querySelector('.card-value');
        const suitElem = card.querySelector('.card-suit');
        const value = valueElem ? valueElem.textContent : null;
        const suit = suitElem ? suitElem.textContent : null;
        return { value, suit };
    }).filter(c => c.value && c.value !== '?');
    
    const playerScoreSpan = document.getElementById('playerScore');
    const playerScore = playerScoreSpan ? parseInt(playerScoreSpan.textContent) : 0;
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/games/blackjack/stand`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                deck: [],
                dealerHand: currentDealerHand,
                playerHand: currentPlayerHand,
                playerScore: playerScore,
                bet: currentBlackjackBet
            })
        });
        const data = await res.json();
        
        if (res.ok) {
            displayBJHand(data.dealerHand, 'dealerCards');
            const dealerScoreSpan = document.getElementById('dealerScore');
            if (dealerScoreSpan) dealerScoreSpan.textContent = data.dealerScore;
            
            currentUser.balance = data.newBalance;
            const balanceSpan = document.getElementById('balanceValue');
            if (balanceSpan) balanceSpan.textContent = currentUser.balance;
            
            blackjackGameActive = false;
            const hitBtn = document.getElementById('hitBtn');
            const standBtn = document.getElementById('standBtn');
            if (hitBtn) hitBtn.disabled = true;
            if (standBtn) standBtn.disabled = true;
            
            if (data.gameResult === 'win') {
                showConfetti();
                showMessage(`🎉 ПОБЕДА! +${data.winAmount} 🪙`, 'success');
            } else if (data.gameResult === 'lose') {
                showMessage(`😢 ПРОИГРЫШ! -${currentBlackjackBet} 🪙`, 'error');
            } else if (data.gameResult === 'push') {
                showMessage('Ничья!', 'info');
            }
        }
    } catch(e) {
        console.error('Stand error:', e);
        showMessage('Ошибка', 'error');
    }
    hideLoading();
}

function resetBlackjack() {
    blackjackGameActive = false;
    currentBlackjackBet = 0;
    
    const playerCards = document.getElementById('playerCards');
    const dealerCards = document.getElementById('dealerCards');
    const playerScore = document.getElementById('playerScore');
    const dealerScore = document.getElementById('dealerScore');
    const hitBtn = document.getElementById('hitBtn');
    const standBtn = document.getElementById('standBtn');
    
    if (playerCards) playerCards.innerHTML = '';
    if (dealerCards) dealerCards.innerHTML = '';
    if (playerScore) playerScore.textContent = '0';
    if (dealerScore) dealerScore.textContent = '?';
    if (hitBtn) hitBtn.disabled = true;
    if (standBtn) standBtn.disabled = true;
}

function displayBJHand(hand, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    if (!hand || !Array.isArray(hand)) return;
    
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        const isRed = card.suit === '♥' || card.suit === '♦';
        cardDiv.className = `card ${isRed ? 'red' : ''}`;
        
        if (card.value === '?') {
            cardDiv.innerHTML = `<div class="card-value">?</div><div class="card-suit">?</div>`;
            cardDiv.style.background = '#2c2c2c';
            cardDiv.style.color = '#fff';
        } else {
            cardDiv.innerHTML = `<div class="card-value">${card.value}</div><div class="card-suit">${card.suit}</div>`;
        }
        
        container.appendChild(cardDiv);
    });
}

// ============ КОСТИ ============
async function playDice() {
    if (!currentUser) return;
    const betSelect = document.getElementById('diceBet');
    const targetInput = document.getElementById('targetNumber');
    
    if (!betSelect || !targetInput) return;
    
    const bet = parseInt(betSelect.value);
    const target = parseInt(targetInput.value);
    
    if (bet > currentUser.balance) {
        showMessage('Недостаточно средств!', 'error');
        return;
    }
    if (target < 2 || target > 99) {
        showMessage('Цель от 2 до 99', 'error');
        return;
    }
    
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/games/dice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ bet, targetNumber: target })
        });
        const data = await res.json();
        
        if (res.ok) {
            const diceResult = document.getElementById('diceResult');
            let count = 0;
            const interval = setInterval(() => {
                if (diceResult) diceResult.textContent = Math.floor(Math.random() * 100) + 1;
                count++;
                if (count > 15) {
                    clearInterval(interval);
                    if (diceResult) {
                        diceResult.textContent = data.roll;
                        diceResult.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            if (diceResult) diceResult.style.transform = '';
                        }, 300);
                    }
                    
                    currentUser.balance = data.newBalance;
                    const balanceSpan = document.getElementById('balanceValue');
                    if (balanceSpan) balanceSpan.textContent = currentUser.balance;
                    
                    if (data.win) {
                        showConfetti();
                        showMessage(`🎲 ВЫИГРЫШ! ${data.roll} < ${target} → +${data.winAmount} 🪙 (x${data.multiplier})`, 'success');
                    } else {
                        showMessage(`🎲 ПРОИГРЫШ! ${data.roll} >= ${target} → -${bet} 🪙`, 'error');
                    }
                }
            }, 50);
        } else {
            showMessage(data.error || 'Ошибка', 'error');
        }
    } catch(e) {
        showMessage('Ошибка сети', 'error');
    }
    hideLoading();
}

// ============ РЕЙТИНГ ============
async function loadLeaderboard() {
    try {
        const res = await fetch(`${API_BASE}/leaderboard/top`);
        const data = await res.json();
        const tbody = document.getElementById('leaderboardBody');
        if (tbody) {
            tbody.innerHTML = data.map(user => `
                <td>
                    <td>${user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}</td>
                    <td>${user.username}</td>
                    <td>${user.balance} 🪙</td>
                </tr>
            `).join('');
        }
    } catch(e) {
        console.error('Leaderboard error:', e);
    }
}

// ============ ПРОФИЛЬ ============
async function loadProfile() {
    if (!authToken) return;
    try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (res.ok) {
            const data = await res.json();
            currentUser = data.user;
            const balanceSpan = document.getElementById('balanceValue');
            if (balanceSpan) balanceSpan.textContent = currentUser.balance;
            
            const historyContainer = document.getElementById('gamesHistory');
            if (historyContainer && currentUser.gamesHistory) {
                historyContainer.innerHTML = currentUser.gamesHistory.slice(0, 20).map(game => `
                    <div class="history-item ${game.result}">
                        <div>
                            <strong>${game.gameType === 'slots' ? '🎰 Слоты' : game.gameType === 'blackjack' ? '🃏 Блэкджек' : '🎲 Кости'}</strong>
                            <div>Ставка: ${game.betAmount} 🪙</div>
                        </div>
                        <div class="${game.result === 'win' ? 'win-amount' : 'lose-amount'}">
                            ${game.result === 'win' ? `+${game.winAmount || game.betAmount * 2}` : game.result === 'lose' ? `-${game.betAmount}` : '0'} 🪙
                        </div>
                    </div>
                `).join('');
                if (currentUser.gamesHistory.length === 0) historyContainer.innerHTML = '<p>Нет игр</p>';
            }
        }
    } catch(e) {
        console.error('Profile error:', e);
    }
}

// ============ ТЕМА ============
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
    const savedColor = localStorage.getItem('accentColor') || '#d4af37';
    document.documentElement.style.setProperty('--primary-color', savedColor);
    const colorPicker = document.getElementById('accent-color');
    if (colorPicker) colorPicker.value = savedColor;
}

// ============ НАСТРОЙКА СОБЫТИЙ ============
function setupEventListeners() {
    // Навигация
    const homeBtn = document.getElementById('homeBtn');
    const gamesBtn = document.getElementById('gamesBtn');
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const playNowBtn = document.getElementById('playNowBtn');
    
    if (homeBtn) homeBtn.addEventListener('click', () => setActiveSection('homeSection'));
    if (gamesBtn) gamesBtn.addEventListener('click', () => setActiveSection('gamesSection'));
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', () => setActiveSection('leaderboardSection'));
    if (profileBtn) profileBtn.addEventListener('click', () => setActiveSection('profileSection'));
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (playNowBtn) playNowBtn.addEventListener('click', () => setActiveSection('gamesSection'));
    
    // Переключение игр
    const slotsBtn = document.getElementById('slotsBtn');
    const blackjackBtn = document.getElementById('blackjackBtn');
    const diceBtn = document.getElementById('diceBtn');
    
    if (slotsBtn) slotsBtn.addEventListener('click', () => switchGame('slots'));
    if (blackjackBtn) blackjackBtn.addEventListener('click', () => switchGame('blackjack'));
    if (diceBtn) diceBtn.addEventListener('click', () => switchGame('dice'));
    
    // Игровые кнопки
    const spinBtn = document.getElementById('spinBtn');
    const dealBtn = document.getElementById('dealBtn');
    const hitBtn = document.getElementById('hitBtn');
    const standBtn = document.getElementById('standBtn');
    const rollBtn = document.getElementById('rollBtn');
    
    if (spinBtn) spinBtn.addEventListener('click', playSlots);
    if (dealBtn) dealBtn.addEventListener('click', startBlackjack);
    if (hitBtn) hitBtn.addEventListener('click', hitBlackjack);
    if (standBtn) standBtn.addEventListener('click', standBlackjack);
    if (rollBtn) rollBtn.addEventListener('click', playDice);
    
    // Авторизация
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    
    if (registerForm) registerForm.addEventListener('submit', registerUser);
    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            const regForm = document.getElementById('registerForm');
            const logForm = document.getElementById('loginForm');
            if (regForm) regForm.classList.add('hidden');
            if (logForm) logForm.classList.remove('hidden');
        });
    }
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            const logForm = document.getElementById('loginForm');
            const regForm = document.getElementById('registerForm');
            if (logForm) logForm.classList.add('hidden');
            if (regForm) regForm.classList.remove('hidden');
        });
    }
    
    // Тема
    const themeToggle = document.getElementById('theme-toggle');
    const accentColor = document.getElementById('accent-color');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
    if (accentColor) {
        accentColor.addEventListener('input', (e) => {
            const color = e.target.value;
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('accentColor', color);
        });
    }
}

// ============ ЗАПУСК ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('App starting...');
    initTheme();
    setupEventListeners();
    checkAuth();
    hideLoading();
});