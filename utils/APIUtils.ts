import { type APIRequestContext, expect } from '@playwright/test';
import 'dotenv/config';

export class APIUtils {
    apiContext: APIRequestContext;
    loginPayload: { email: string, password: string };

    constructor(apiContext: APIRequestContext, loginPayload: { email: string, password: string }) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const APIResponse = await this.apiContext.post('https://reqres.in/api/login',
            {
                data: this.loginPayload,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.API_KEY!
                }
            })

        const responseBody = await APIResponse.json();
        return { 
            token: responseBody.token, 
            status: APIResponse.status() 
        };
    }

    async getUserById(userId: number) {
        const APIResponse = await this.apiContext.get(`https://reqres.in/api/users/${userId}`,
            {
                headers: {
                    'x-api-key': process.env.API_KEY!,
                },
            }
        );

        const responseBody = await APIResponse.json();

        return {
            status: APIResponse.status(),
            body: responseBody,
        };
    }
}