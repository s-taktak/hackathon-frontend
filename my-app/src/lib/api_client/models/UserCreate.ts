/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Gender } from './Gender';

export type UserCreate = {
    username?: (string | null);
    gender?: Gender;
    email: string;
    password: string;
    birth_date?: (string | null);
};
