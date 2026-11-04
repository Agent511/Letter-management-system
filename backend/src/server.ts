import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import incomingRoutes from './routes/incomingLetter.routes';
import outgoingRoutes from './routes/outgoingLetter.routes';
import workflowRoutes from './routes/workflow.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'node' }));
app.use('/api/incoming', incomingRoutes);
app.use('/api/outgoing', outgoingRoutes);
app.use('/api/workflow', workflowRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Node backend on http://localhost:${PORT}`));