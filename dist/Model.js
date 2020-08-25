import { ORMDatabase } from './database';
export function OrmModel(entity, baseEntity, types) {
    return function (constructor) {
        // The name that is going be used as module name in Vuex Store.
        constructor.entity = entity;
        // The reference to the base entity name if the class extends a base entity.
        if (baseEntity) {
            constructor.baseEntity = baseEntity;
        }
        // The definition of the fields of the model and its relations.
        constructor.fields = () => {
            var _a, _b;
            const fields = constructor._fields || {};
            return Object.assign(Object.assign({}, (_b = (_a = constructor.prototype) === null || _a === void 0 ? void 0 : _a._super) === null || _b === void 0 ? void 0 : _b.fields()), fields);
        };
        // The 'types mapping' used to dispatch entities based on their discriminator field.
        if (types && baseEntity) {
            ORMDatabase.models().forEach(model => {
                if (model.entity === baseEntity) {
                    const _types = Object.assign(model.types(), types);
                    model.types = () => _types;
                }
            });
        }
        // Register a model to Database.
        ORMDatabase.registerEntity(constructor);
        return constructor;
    };
}
//# sourceMappingURL=model.js.map