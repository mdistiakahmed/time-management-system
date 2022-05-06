import { AxiosRequestConfig } from 'axios';
import { ApiEndpoints } from '../../../constants/ApiEndpoints';
import HttpHeaders from '../HttpHeaders';

test('Contains required properties', async () => {
    const config: AxiosRequestConfig = { url: '/test' };
    const resultantConfig = HttpHeaders(config);

    expect(resultantConfig).toHaveProperty('headers');
    expect(resultantConfig.headers).toHaveProperty('Authorization');
    expect(resultantConfig.headers).toHaveProperty(
        'Access-Control-Allow-Origin',
        '*',
    );
    expect(resultantConfig.headers).toHaveProperty(
        'Accept',
        'application/json',
    );
    expect(resultantConfig.headers).toHaveProperty(
        'Content-Type',
        'application/json',
    );
});

test('Does not contain authorization header for whitelisted urls', async () => {
    const config: AxiosRequestConfig = { url: ApiEndpoints.auth.signIn };
    const resultantConfig = HttpHeaders(config);

    expect(resultantConfig).toHaveProperty('headers');
    expect(resultantConfig.headers).not.toHaveProperty('Authorization');
});

test('Overwrites header', async () => {
    const config: AxiosRequestConfig = {
        url: '/test',
        headers: { Accept: 'text/plain', 'Content-Type': ' text/plain' },
    };
    const resultantConfig = HttpHeaders(config);

    expect(resultantConfig.headers).toHaveProperty(
        'Accept',
        'application/json',
    );
    expect(resultantConfig.headers).toHaveProperty(
        'Content-Type',
        'application/json',
    );
});

test('Does not add authorization token if url is empty', async () => {
    const config: AxiosRequestConfig = {};
    const resultantConfig = HttpHeaders(config);

    expect(resultantConfig).not.toHaveProperty('url');
    expect(resultantConfig.headers).not.toHaveProperty('Authorization');
    expect(resultantConfig.headers).toHaveProperty(
        'Access-Control-Allow-Origin',
        '*',
    );
    expect(resultantConfig.headers).toHaveProperty(
        'Accept',
        'application/json',
    );
    expect(resultantConfig.headers).toHaveProperty(
        'Content-Type',
        'application/json',
    );
});
