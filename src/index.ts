import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import app from './api/app';

exports.api = onRequest(app);
