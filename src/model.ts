import { Model } from '@vuex-orm/core';

/**
 * Creates an vuex-orm Model
 * @param entityName The name of the entity to be used as the key for the state
 */
export function OrmModel(entityName: string, parentEntity?: string) {
    return function <Model extends Function>(constructor: Model): Model | void {
        const model: Function = constructor;

        (constructor as any).entity = entityName;
        (constructor as any).baseEntity = parentEntity;
        (constructor as any).fields = () => (constructor as any)._fields || {};

        return constructor;
    };
}