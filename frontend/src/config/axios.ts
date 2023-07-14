// axios config file

import axios from 'axios';
import { DEV_URL } from './url'

let headers: any = {
    'Content-Type': 'application/json',
}

const axiosInstance = axios.create({
    baseURL: DEV_URL,
    headers: headers,
});
// export the instance
export default axiosInstance;