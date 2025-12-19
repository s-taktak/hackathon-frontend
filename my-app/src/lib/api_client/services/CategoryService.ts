/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryService {

    /**
     * Get Categories
     * @param parentId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCategories(
parentId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories',
            query: {
                'parent_id': parentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
