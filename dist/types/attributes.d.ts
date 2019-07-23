import { Model, Attribute } from '@vuex-orm/core';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';
/**
 * Sets the property as the primary key of the model
 */
export declare function PrimaryKey(): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export declare function Field(fieldType: Attribute): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export declare function StringField(defaultValue?: string): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as an incremental field
 */
export declare function IncrementField(): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undiefine dthe default will be '')
 */
export declare function AttrField(defaultValue?: any): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export declare function NumberField(defaultValue?: number): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export declare function BooleanField(value: any, mutator?: Mutator<boolean | null>): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export declare function HasManyField(related: typeof Model | string, foreignKey: string, localKey?: string): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export declare function HasOneField(related: typeof Model | string, foreignKey: string, localKey?: string): (target: Object, propertyName: string | symbol) => void;
/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export declare function BelongsToField(parent: typeof Model | string, foreignKey: string, ownerKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function HasManyByField(parent: typeof Model | string, foreignKey: string, ownerKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function HasManyThroughField(related: typeof Model | string, through: typeof Model | string, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function BelongsToManyField(related: typeof Model | string, pivot: typeof Model | string, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function MorphToField(id: string, type: string): (target: Object, propertyName: string | symbol) => void;
export declare function MorphOneField(related: typeof Model | string, id: string, type: string, localKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function MorphManyField(related: typeof Model | string, id: string, type: string, localKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function MorphToManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string): (target: Object, propertyName: string | symbol) => void;
export declare function MorphedByManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string): (target: Object, propertyName: string | symbol) => void;
