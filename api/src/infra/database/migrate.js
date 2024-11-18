
import path from 'node:path';

import db from "./connection.js";



try {
  const migrationsDir = path.resolve(`${import.meta.dirname}/migrations`);
  await db.migrate({ table: 'migrations', migrationsPath: migrationsDir });
  console.log('migrated');
} catch (e) {
  console.error('something went wrong with the migrations', e.message);
}