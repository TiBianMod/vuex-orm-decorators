/**
 * Creates an vuex-orm Model
 * @param entityName The name of the entity to be used as the key for the state
 */
export declare function OrmModel(entityName: string, parentEntity?: string): <Model_1 extends Function>(constructor: Model_1) => void | Model_1;
