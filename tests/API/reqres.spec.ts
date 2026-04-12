import { test, expect, request, type APIRequestContext } from '@playwright/test';
import { APIUtils } from '../../utils/APIUtils';

test.describe('Reqres API tests', () => {

    let tokenResponse: { token: string, status: number };
    let userResponse: { status: number, body: any };
    let apiContext: APIRequestContext;

    interface loginPayload {
        email: string;
        password: string;
    }

    const loginPayload: loginPayload = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }

    test.beforeAll('Should run once before all tests', async () => {
        apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload);
        tokenResponse = await apiUtils.getToken();
        userResponse = await apiUtils.getUserById(2);
    });

    test('should generate auth token via POST API', async () => {
        expect(tokenResponse.status).toBe(200);
        expect(tokenResponse.token).toBeDefined();
        expect(typeof tokenResponse.token).toBe('string');
        expect(tokenResponse.token.length).toBeGreaterThan(0);
    });

    test('should fetch user details successfully via GET API', async () => {

        expect(userResponse.status).toBe(200);

        const data = userResponse.body.data;

        expect(data.id).toBe(2);
        expect(data.email).toContain('@reqres.in');
        expect(data.first_name).toBeTruthy();
    });

    test('should fail login with invalid credentials', async () => {
        const invalidPayload = {
            email: 'invalid@test.com',
            password: '',
        };

        const invalidApiUtils = new APIUtils(apiContext, invalidPayload);

        const response = await invalidApiUtils.getToken();

        expect(response.status).toBe(400);
        expect(response.token).toBeUndefined();
    });
});