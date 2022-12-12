import http from 'http';
import {config} from './config/config';
import Logging from './library/Logging';
import app from './app';

http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Server is running on port ${config.server.port}`);
});
