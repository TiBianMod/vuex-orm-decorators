import { Model } from '@vuex-orm/core';
import { ORMDatabase } from '@/database';

export function OrmModel(entity: string, baseEntity?: string, types?: { [key: string]: typeof Model }) {
    return <Model extends Function>(constructor: Model): Model => {
        // The name that is going be used as module name in Vuex Store.
        (constructor as any).entity = entity;

        // The reference to the base entity name if the class extends a base entity.
        if (baseEntity) {
            (constructor as any).baseEntity = baseEntity;
        }

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
        ORMDatabase.registerEntity(constructor as unknown as typeof Model);

        return constructor;
    };
}
