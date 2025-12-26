/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemResponse } from '../models/ItemResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Search Items
     * AIベクトル検索を行うエンドポイント
     * @param q 検索キーワード
     * @returns ItemResponse Successful Response
     * @throws ApiError
     */
    public static search(
q: string,
): CancelablePromise<Array<ItemResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search',
            query: {
                'q': q,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Sync Vectors
     * 【管理用】既存アイテムのベクトルを強制的に再生成する
     * @returns any Successful Response
     * @throws ApiError
     */
    public static syncVectors(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/search/sync',
        });
    }

}
