/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Brand } from '../models/Brand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BrandService {

    /**
     * Search Brands
     * @param keyword 
     * @returns Brand Successful Response
     * @throws ApiError
     */
    public static searchBrands(
keyword: string,
): CancelablePromise<Array<Brand>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands/search',
            query: {
                'keyword': keyword,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
