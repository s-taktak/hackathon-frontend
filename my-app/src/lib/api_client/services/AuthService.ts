/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login } from '../models/Body_login';
import type { Token } from '../models/Token';
import type { UserCreate } from '../models/UserCreate';
import type { UserMeResponse } from '../models/UserMeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Register User
     * @param requestBody 
     * @returns UserMeResponse Successful Response
     * @throws ApiError
     */
    public static signUp(
requestBody: UserCreate,
): CancelablePromise<UserMeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login
     * @param formData 
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static login(
formData: Body_login,
): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
