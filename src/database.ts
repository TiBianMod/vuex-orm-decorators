import VuexORM, { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
import { Options } from '@vuex-orm/core/lib/store/install';

export class ORMDatabase {

    private static _ormDatabase = new VuexORM.Database();
    private static _installed = <typeof Model[]>[];

    public static install(options?: Options): Plugin<any> {
        return VuexORM.install(ORMDatabase._ormDatabase, options);
    }

    public static registerEntity(model: typeof Model) {
        if (this._installed.indexOf(model) !== -1) {
            console.error(`Unable to register entity ${model.name}.  Entity already registered.`);
            return;
        }
        ORMDatabase._ormDatabase.register(model);
    }
}
