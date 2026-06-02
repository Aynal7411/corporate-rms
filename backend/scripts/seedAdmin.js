import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const admin = {
  name: process.env.ADMIN_NAME || 'Super Admin',
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'Admin12345',
  role: process.env.ADMIN_ROLE || 'super-admin'
};

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/company_recruitment';

try {
  await mongoose.connect(mongoUri);

  const existing = await User.findOne({ email: admin.email });

  if (existing) {
    existing.name = admin.name;
    existing.role = admin.role;
    existing.isActive = true;

    if (process.env.ADMIN_PASSWORD) {
      existing.password = admin.password;
    }

    await existing.save();
    console.log(`Admin user updated: ${admin.email}`);
  } else {
    await User.create({
      ...admin,
      isEmailVerified: true,
      isActive: true
    });
    console.log(`Admin user created: ${admin.email}`);
  }
} catch (error) {
  console.error(`Admin seed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
