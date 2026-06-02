import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import officerRoutes from './routes/officerRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import companyProfileRoutes from './routes/companyProfileRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'company-recruitment-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/officers', officerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/company-profile', companyProfileRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
