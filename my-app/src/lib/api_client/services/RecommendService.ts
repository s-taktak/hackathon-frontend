/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemResponse } from '../models/ItemResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecommendService {

    /**
     * Recommend Items
     * @param itemId 
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static recommend(
itemId: string,
): CancelablePromise<Array<ItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recommend',
            query: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
