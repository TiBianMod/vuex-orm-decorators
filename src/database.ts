import VuexORM, { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
import { Options } from '@vuex-orm/core/lib/store/install';

export class ORMDatabase {

    private static _ormDatabase = new VuexORM.Database();

    private static _models = <typeof Model[]>[];

    public static install(options?: Options): Plugin<any> {
        this._models.forEach(model => this._ormDatabase.register(model));

        return VuexORM.install(ORMDatabase._ormDatabase, options);
    }

    public static registerEntity(model: typeof Model) {
        if (this._models.includes(model)) {
            console.error(`Unable to register entity '${model.name}'. Entity '${model.name}' is already registered.`);

            return;
        }

        this._models.push(model);
    }

    public static models() {
        return this._models;
    }

}
