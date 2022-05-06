import HttpClient from './HttpClient';

export const ApiHandler = () => {
    const { api } = HttpClient();

    const _get = async (url: string, param: any): Promise<any> => {
        const response = api.get(url, { ...param });
        const res = await Promise.all([response, _delay()]);
        return await Promise.resolve(res[0].data);
    };

    const _post = async (url: string, data: any): Promise<any> => {
        const response = await api.post(url, data);
        const res = await Promise.all([response, _delay()]);
        return await Promise.resolve(res[0].data);
    };

    const _put = async (url: string, data: any): Promise<any> => {
        const response = await api.put(url, data);
        const res = await Promise.all([response, _delay()]);
        return await Promise.resolve(res[0].data);
    };

    const _delete = async (url: string): Promise<any> => {
        const response = await api.delete(url);
        const res = await Promise.all([response, _delay()]);
        return await Promise.resolve(res[0].data);
    };

    const _delay = () => {
        return new Promise((resolve) => setTimeout(resolve, 500));
    };

    return { _get, _post, _put, _delete };
};
