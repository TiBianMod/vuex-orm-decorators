import VuexORM from '@vuex-orm/core';
export class ORMDatabase {
    static install(options) {
        this._models.forEach(model => this._ormDatabase.register(model));
        return VuexORM.install(ORMDatabase._ormDatabase, options);
    }
    static registerEntity(model) {
        if (this._models.includes(model)) {
            console.error(`Unable to register entity '${model.name}'. Entity '${model.name}' is already registered.`);
            return;
        }
        this._models.push(model);
    }
    static models() {
        return this._models;
    }
}
ORMDatabase._ormDatabase = new VuexORM.Database();
ORMDatabase._models = [];
//# sourceMappingURL=database.js.map