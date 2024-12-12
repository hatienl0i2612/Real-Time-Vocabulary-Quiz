import axios from 'axios';
import { EnvConfig } from '../constants';

export const axiosInstance = axios.create({
    baseURL: EnvConfig.API,
});
