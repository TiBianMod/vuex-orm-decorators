import { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
import { Options } from '@vuex-orm/core/lib/store/install';
export declare class ORMDatabase {
    private static _ormDatabase;
    private static _models;
    static install(options?: Options): Plugin<any>;
    static registerEntity(model: typeof Model): void;
    static models(): (typeof Model)[];
}
