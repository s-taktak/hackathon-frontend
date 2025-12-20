/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChatMessage } from './ChatMessage';
import type { ItemResponse } from './ItemResponse';

export type AiSearchResponse = {
    reply: string;
    history: Array<ChatMessage>;
    items?: (Array<ItemResponse> | null);
};
