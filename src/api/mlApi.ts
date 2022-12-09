import axios from 'axios';
import { config } from '../config/config';

const mlApi = axios.create({
    baseURL: config.externalApi.url
});

export default mlApi;
