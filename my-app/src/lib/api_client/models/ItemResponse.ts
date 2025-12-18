/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Brand } from './Brand';
import type { Category } from './Category';
import type { Condition } from './Condition';
import type { ImageResponse } from './ImageResponse';
import type { ItemStatus } from './ItemStatus';
import type { UserResponse } from './UserResponse';

export type ItemResponse = {
    title?: (string | null);
    price?: number;
    description?: (string | null);
    id: string;
    seller: UserResponse;
    status: ItemStatus;
    brand?: (Brand | null);
    category?: (Category | null);
    condition?: (Condition | null);
    images: Array<ImageResponse>;
    created_at: string;
    updated_at: string;
};
