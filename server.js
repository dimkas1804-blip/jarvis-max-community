const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: 'Пустое сообщение' });
    }

    const response = await fetch('http://127.0.0.1:8080/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'Ты JARVIS MAX COMMUNITY, дружелюбный умный голосовой помощник. Отвечай на русском языке.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 120
      })
    });

    const data = await response.json();

    res.json({
      answer: data.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка связи с ИИ' });
  }
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('JARVIS MAX COMMUNITY запущен!');
  console.log('Порт: 3000');
});
