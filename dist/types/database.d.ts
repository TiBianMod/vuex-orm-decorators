import { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
import { Options } from '@vuex-orm/core/lib/store/install';
export declare class ORMDatabase {
    private static _ormDatabase;
    private static _installed;
    static install(options?: Options): Plugin<any>;
    static registerEntity(model: typeof Model): void;
}
