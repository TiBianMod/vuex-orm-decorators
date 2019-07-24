import VuexORM from '@vuex-orm/core';
var ORMDatabase = /** @class */ (function () {
    function ORMDatabase() {
    }
    ORMDatabase.install = function () {
        ORMDatabase._ormDatabase = new VuexORM.Database();
        return VuexORM.install(ORMDatabase._ormDatabase);
    };
    ORMDatabase.registerEntity = function (model) {
        if (this._ormDatabase && this._installed.indexOf(model) !== -1) {
            console.error("Unable to register entity " + model.name + ".  Entity already registered.");
            return;
        }
        this._ormDatabase.register(model);
    };
    ORMDatabase._installed = [];
    return ORMDatabase;
}());
export default ORMDatabase;
//# sourceMappingURL=database.js.map