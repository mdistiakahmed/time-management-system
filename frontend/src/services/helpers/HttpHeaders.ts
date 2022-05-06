import { AxiosRequestConfig } from 'axios';
import { URLsWithoutAuthorization } from '../../constants/ApiEndpoints';
import { AuthConstants } from '../../constants/GeneralConstants';

const NeedToken = (requestedUrl?: string): boolean => {
    if (!requestedUrl) {
        return false;
    }
    let isAuthTokenNeeded = true;
    for (let i = 0; i < URLsWithoutAuthorization.length; i++) {
        const urlSuffix = URLsWithoutAuthorization[i];
        if (requestedUrl.endsWith(urlSuffix)) {
            isAuthTokenNeeded = false;
            break;
        }
    }
    return isAuthTokenNeeded;
};
const HttpHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers === undefined) {
        config.headers = {};
    }
    if (NeedToken(config.url)) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            AuthConstants.AUTH_TOKEN,
        )}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
};

export default HttpHeaders;
