/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CategorySearchResponse } from '../models/CategorySearchResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryService {

    /**
     * Get Categories
     * @param parentId 
     * @returns Category Successful Response
     * @throws ApiError
     */
    public static getCategories(
parentId?: number,
): CancelablePromise<Array<Category>> {
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

    /**
     * Search Categories
     * @param keyword 
     * @returns CategorySearchResponse Successful Response
     * @throws ApiError
     */
    public static searchCategories(
keyword: string,
): CancelablePromise<Array<CategorySearchResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/search',
            query: {
                'keyword': keyword,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
