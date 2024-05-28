import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import routes from './routes/routes';
import { logger } from 'firebase-functions/v1';

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: '*', credentials: true }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
	res.send('Hello from Firebase With Watch!');
});

routes.forEach((route) => {
	logger.info(`Adding route: /${route.name}`);
	app.use(`/${route.name}`, route.routes);
});

export default app;
