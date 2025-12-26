/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AiSearchRequest } from '../models/AiSearchRequest';
import type { AiSearchResponse } from '../models/AiSearchResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Ai Search Endpoint
     * @param requestBody 
     * @returns AiSearchResponse Successful Response
     * @throws ApiError
     */
    public static aiSearchEndpointAiSearchPost(
requestBody: AiSearchRequest,
): CancelablePromise<AiSearchResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/aiSearch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
