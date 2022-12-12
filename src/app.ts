import express, { Application, NextFunction, Request, Response } from 'express';
import Logging from './library/Logging';
import itemsRoutes from './routes/Items';

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the Request */
    Logging.info(`Incomming => Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the Response */
        Logging.info(`Incomming => Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */

app.use('/api/items', itemsRoutes);

/** HealthCheck */
app.get('/api/health-check', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK' }));

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
});

export default app;
