const express = require('express');
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

router.get('/top', async (req, res) => {
  try {
    const users = await getUsers();
    const topUsers = users
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10)
      .map((user, index) => ({
        rank: index + 1,
        username: user.username,
        balance: user.balance
      }));
    res.json(topUsers);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;