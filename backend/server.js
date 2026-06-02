import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

connectDatabase().then(() => {
  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
});
