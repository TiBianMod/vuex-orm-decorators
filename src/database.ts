import VuexORM, { Model, Database } from '@vuex-orm/core';
import { Plugin } from 'vuex';


export class ORMDatabase {

    private static _ormDatabase: Database;
    private static _installed = <typeof Model[]>[];

    public static install(): Plugin<any> {
        ORMDatabase._ormDatabase = new VuexORM.Database();
        return VuexORM.install(ORMDatabase._ormDatabase);
    }

    public static registerEntity(model: typeof Model) {
        if (this._ormDatabase && this._installed.indexOf(model) !== -1) {
            console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
            return;
        }
        this._ormDatabase.register(model);
    }
}