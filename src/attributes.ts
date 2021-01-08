import { Attribute, Model } from '@vuex-orm/core';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';

/**
 * Adds the property as a model field
 */
function Field(fieldType: Attribute) {
    return (target: Object, propertyName: string | symbol): void => {
        const constructor = (target.constructor as any);

        constructor._fields = Object.assign(constructor.fields(), constructor._fields);

        if (! (fieldType as any).mutator && fieldType.value === null) {
            (fieldType as any).isNullable = true;
        }

        constructor._fields[propertyName] = fieldType;

        constructor.fields = () => {
            return { ...constructor._fields };
        };
    };
}

function nullable(value: any, defaultValue: any) {
    if (value === null) {
        return null;
    }

    return value === undefined ? defaultValue : value;
}

/**
 * Adds the property as the `primary key` of the model
 */
export function PrimaryKey() {
    return (target: Object, propertyName: string | symbol): void => {
        if (propertyName === 'id') {
            console.warn('[Vuex ORM Decorators] No need using `PrimaryKey` decorator on property `id`. Property `id` is by default the `primaryKey`.');
        }

        (target.constructor as any).primaryKey = propertyName;
    };
}

/**
 * Adds the property as a `uid` field
 */
export function UidField(value?: () => string | number) {
    return Field(Model.uid(value));
}

/**
 * Adds the property as a generic `attribute` field
 */
export function AttrField(value?: any, mutator?: Mutator<any>) {
    return Field(Model.attr(nullable(value, ''), mutator));
}

/**
 * Adds the property as a `string` field
 */
export function StringField(value?: string | null, mutator?: Mutator<string>) {
    return Field(Model.string(nullable(value, ''), mutator as any));
}

/**
 * Adds the property as a `number` field
 */
export function NumberField(value?: number | null, mutator?: Mutator<number>) {
    return Field(Model.number(nullable(value, 0), mutator as any));
}

/**
 * Adds the property as a `boolean` field
 */
export function BooleanField(value?: boolean | null, mutator?: Mutator<boolean>) {
    return Field(Model.boolean(nullable(value, false), mutator as any));
}

/**
 * Adds the property as a `boolean` field
 */
export function DateField(value?: Date | string | null, mutator?: Mutator<Date | null>) {
    return Field(Model.attr(nullable(value, null), mutator as any));
}

/**
 * Adds the property as a `Has One` relationship field
 */
export function HasOneField(related: typeof Model, foreignKey: string, localKey?: string) {
    return Field(Model.hasOne(related, foreignKey, localKey));
}

/**
 * Adds the property as a `Belongs To` relationship field
 */
export function BelongsToField(parent: typeof Model, foreignKey: string, ownerKey?: string) {
    return Field(Model.belongsTo(parent, foreignKey, ownerKey));
}

/**
 * Adds the property as a `Has Many` relationship field
 */
export function HasManyField(related: typeof Model, foreignKey: string, localKey?: string) {
    return Field(Model.hasMany(related, foreignKey, localKey));
}

/**
 * Adds the property as a `Has Many By` relationship field
 */
export function HasManyByField(parent: typeof Model, foreignKey: string, ownerKey?: string) {
    return Field(Model.hasManyBy(parent, foreignKey, ownerKey));
}

/**
 * Adds the property as a `Has Many Through` relationship field
 */
export function HasManyThroughField(related: typeof Model, through: typeof Model, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string) {
    return Field(Model.hasManyThrough(related, through, firstKey, secondKey, localKey, secondLocalKey));
}

/**
 * Adds the property as a `Belongs To Many` relationship field
 */
export function BelongsToManyField(related: typeof Model, pivot: typeof Model, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.belongsToMany(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey));
}

/**
 * Adds the property as a `Morph To` relationship field
 */
export function MorphToField(id: string, type: string) {
    return Field(Model.morphTo(id, type));
}

/**
 * Adds the property as a `Morph One` relationship field
 */
export function MorphOneField(related: typeof Model, id: string, type: string, localKey?: string) {
    return Field(Model.morphOne(related, id, type, localKey));
}

/**
 * Adds the property as a `Morph Many` relationship field
 */
export function MorphManyField(related: typeof Model, id: string, type: string, localKey?: string) {
    return Field(Model.morphMany(related, id, type, localKey));
}

/**
 * Adds the property as a `Morph To Many` relationship field
 */
export function MorphToManyField(related: typeof Model, pivot: typeof Model, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.morphToMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}

/**
 * Adds the property as a `Morphed By Many` relationship field
 */
export function MorphedByManyField(related: typeof Model, pivot: typeof Model, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    return Field(Model.morphedByMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}
