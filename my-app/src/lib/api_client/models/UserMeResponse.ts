/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';

export type UserMeResponse = {
    username?: (string | null);
    gender?: Gender;
    id: string;
    created_at: string;
    email: string;
    birth_date: (string | null);
};
