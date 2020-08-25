import { Model } from '@vuex-orm/core';
export declare function OrmModel(entity: string, baseEntity?: string, types?: {
    [key: string]: typeof Model;
}): <Model_1 extends Function>(constructor: Model_1) => Model_1;
