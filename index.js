const express = require('express');
const app = express();
const port = 3000;

// Добавьте ваши флоу сюда
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
