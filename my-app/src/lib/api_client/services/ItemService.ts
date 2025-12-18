/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_postItem } from '../models/Body_postItem';
import type { ItemResponse } from '../models/ItemResponse';
import type { ItemUpdate } from '../models/ItemUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemService {

    /**
     * Post Item
     * @param formData 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static postItem(
formData: Body_postItem,
): CancelablePromise<ItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/item',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Items List
     * @param skip 
     * @param limit 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static getItemsList(
skip?: number,
limit: number = 20,
): CancelablePromise<Array<ItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/item',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Item
     * @param itemId 
     * @param requestBody 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static updateItem(
itemId: string,
requestBody: ItemUpdate,
): CancelablePromise<ItemResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/item/{item_id}',
            path: {
                'item_id': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Item Detail
     * @param itemId 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static getItemDetail(
itemId: string,
): CancelablePromise<ItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/item/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Item
     * @param itemId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteItem(
itemId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/item/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Purchase Item
     * @param itemId 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static purchaseItem(
itemId: string,
): CancelablePromise<ItemResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/item/{item_id}/purchase',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
