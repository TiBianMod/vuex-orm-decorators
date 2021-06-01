import { Attribute, Model } from '@vuex-orm/core';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';

/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
    return (target: Object, propertyName: string | symbol): void => {
        (target.constructor as any).primaryKey = propertyName;
    };
}

/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType: Attribute) {
    return (target: Object, propertyName: string | symbol): void => {
        const constructor = (target.constructor as any);

        if (constructor.entity) {
            constructor._fields = constructor.fields() || {};

            constructor.fields = () => {
                const fields = constructor._fields || {};

                return {
                    ...constructor.prototype?._super?.fields(),
                    ...fields,
                };
            };
        } else {
            constructor._fields = constructor._fields || {};
        }

        constructor._fields[propertyName] = fieldType;
    };
}

/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 * @param mutator Mutate the given value
 */
export function StringField(defaultValue?: string | null, mutator?: Mutator<string>) {
    return Field(Model.string(defaultValue || '', mutator as any));
}

/**
 * Adds the property as a uid field
 * @param value optional function that makes a custom a uid
 */
export function UidField(value?: () => string | number) {
    return Field(Model.uid(value));
}

/**
 * Adds the property as an incremental field
 * @deprecated Use `UidField` decorator instead.
 */
export function IncrementField() {
    return Field(Model.increment());
}

/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 * @param mutator Mutate the given value
 */
export function AttrField(defaultValue?: any, mutator?: Mutator<any>) {
    return Field(Model.attr(defaultValue || '', mutator));
}

/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 * @param mutator Mutate the given value
 */
export function NumberField(defaultValue?: number | null, mutator?: Mutator<number>) {
    return Field(Model.number(defaultValue || 0, mutator as any));
}

/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 * @param mutator Mutate the given value
 */
export function BooleanField(defaultValue?: boolean | null, mutator?: Mutator<boolean>) {
    return Field(Model.boolean(defaultValue || false, mutator as any));
}

/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(related: typeof Model | string, foreignKey: string, localKey?: string) {
    return Field(Model.hasMany(related, foreignKey, localKey));
}

/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(related: typeof Model | string, foreignKey: string, localKey?: string) {
    return Field(Model.hasOne(related, foreignKey, localKey));
}

/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(parent: typeof Model | string, foreignKey: string, ownerKey?: string) {
    return Field(Model.belongsTo(parent, foreignKey, ownerKey));
}

export function HasManyByField(parent: typeof Model | string, foreignKey: string, ownerKey?: string) {
    return Field(Model.hasManyBy(parent, foreignKey, ownerKey));
}

export function HasManyThroughField(related: typeof Model | string, through: typeof Model | string, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string) {
    return Field(Model.hasManyThrough(related, through, firstKey, secondKey, localKey, secondLocalKey));
}

export function BelongsToManyField(related: typeof Model | string, pivot: typeof Model | string, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.belongsToMany(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey));
}

export function MorphToField(id: string, type: string) {
    return Field(Model.morphTo(id, type));
}

export function MorphOneField(related: typeof Model | string, id: string, type: string, localKey?: string) {
    return Field(Model.morphOne(related, id, type, localKey));
}

export function MorphManyField(related: typeof Model | string, id: string, type: string, localKey?: string) {
    return Field(Model.morphMany(related, id, type, localKey));
}

export function MorphToManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.morphToMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}

export function MorphedByManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.morphedByMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}
