import { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
export declare class ORMDatabase {
    private static _ormDatabase;
    private static _installed;
    static install(): Plugin<any>;
    static registerEntity(model: typeof Model): void;
}
