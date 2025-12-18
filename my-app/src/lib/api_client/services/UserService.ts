/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemResponse } from '../models/ItemResponse';
import type { UserResponse } from '../models/UserResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get User Profile
     * @param userId 
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static getProfile(
userId: string,
): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Users Listings
     * @param userId 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static getListing(
userId: string,
): CancelablePromise<Array<ItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{user_id}/items',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
