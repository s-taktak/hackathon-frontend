/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Brand } from './Brand';
import type { Category } from './Category';

export type PredictResponse = {
    category_id?: (number | null);
    brand_id?: (number | null);
    category_path?: (Array<Category> | null);
    brand?: (Brand | null);
};
