/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentCreate } from '../models/CommentCreate';
import type { CommentResponse } from '../models/CommentResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentService {

    /**
     * Post Comment
     * @param itemId 
     * @param requestBody 
     * @returns CommentResponse Successful Response
     * @throws ApiError
     */
    public static postComment(
itemId: string,
requestBody: CommentCreate,
): CancelablePromise<CommentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/item/{item_id}/comments',
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
     * Get Comments
     * @param itemId 
     * @returns CommentResponse Successful Response
     * @throws ApiError
     */
    public static getComment(
itemId: string,
): CancelablePromise<Array<CommentResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/item/{item_id}/comments',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
