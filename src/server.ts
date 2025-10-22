import app from './app.js';

const PORT = process.env.PORT || 3000;
console.log('Server.ts start');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

