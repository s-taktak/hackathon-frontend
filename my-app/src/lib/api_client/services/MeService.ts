/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HistoryResponse } from '../models/HistoryResponse';
import type { ItemResponse } from '../models/ItemResponse';
import type { UserMeResponse } from '../models/UserMeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MeService {

    /**
     * Get My Profile
     * @returns UserMeResponse Successful Response
     * @throws ApiError
     */
    public static getMyProfile(): CancelablePromise<UserMeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * Get My Listings
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static getMyListing(): CancelablePromise<Array<ItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/items',
        });
    }

    /**
     * Get Browsing History
     * @returns HistoryResponse Successful Response
     * @throws ApiError
     */
    public static getHistory(): CancelablePromise<Array<HistoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/history',
        });
    }

    /**
     * Record Browsing History
     * @param itemId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static postHistory(
itemId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/history/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
