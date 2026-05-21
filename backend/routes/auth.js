const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен быть минимум 6 символов' });
    }

    const users = await getUsers();
    
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      balance: 1000,
      registrationDate: new Date().toISOString(),
      gamesHistory: []
    };

    users.push(newUser);
    await saveUsers(users);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Регистрация успешна',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        balance: newUser.balance
      }
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const users = await getUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ error: 'Неверные учетные данные' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Вход выполнен',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance
      }
    });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение профиля
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Требуется аутентификация' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const users = await getUsers();
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        registrationDate: user.registrationDate,
        gamesHistory: user.gamesHistory.slice(-20).reverse()
      }
    });
  } catch (error) {
    console.error('Ошибка профиля:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;