require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Функция для добавления флоу
const addFlow = (path, json) => {
  app.post(path, (req, res) => {
    // Подстановка ключей из переменных окружения
    const modifiedJson = JSON.parse(JSON.stringify(json), (key, value) => {
      if (typeof value === 'string' && value.startsWith('env:')) {
        return process.env[value.substring(4)];
      }
      return value;
    });
    res.json(modifiedJson);
  });
};

// Загрузка флоу
const flows = [
  { path: '/initialScope', file: 'InitialScope Chatflow.json' },
  { path: '/milestonesModuleNotSet', file: 'milestonesModuleNotSet Chatflow.json' },
  { path: '/milestonesModuleSet', file: 'milestonesModuleSet Chatflow.json' },
  { path: '/risksModuleNotSet', file: 'risksModuleNotSet Chatflow.json' },
  { path: '/risksModuleSet', file: 'risksModuleSet Chatflow.json' },
  { path: '/scopeFinalization', file: 'scopeFinalization Chatflow.json' },
  { path: '/stackModuleNotSet', file: 'stackModuleNotSet Chatflow.json' },
  { path: '/stackModuleSet', file: 'stackModuleSet Chatflow.json' },
  { path: '/stakeholdersModuleNotSet', file: 'StakeholdersModuleNotSet Chatflow.json' },
  { path: '/stakeholdersModuleSet', file: 'StakeholdersModuleSet Chatflow.json' },
  { path: '/usersModuleNotSet', file: 'UsersModuleNotSet Chatflow.json' },
  { path: '/usersModuleSet', file: 'UsersModuleSet Chatflow.json' }
];

// Инициализация всех флоу
flows.forEach(flow => {
  const flowData = require(`./flows/${flow.file}`);
  addFlow(flow.path, flowData);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

});
