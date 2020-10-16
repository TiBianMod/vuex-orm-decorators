import { Model } from '@vuex-orm/core';
/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
    return (target, propertyName) => {
        target.constructor.primaryKey = propertyName;
    };
}
/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType) {
    return (target, propertyName) => {
        const constructor = target.constructor;
        if (constructor.entity) {
            constructor._fields = constructor.fields() || {};
            constructor.fields = () => {
                var _a, _b;
                const fields = constructor._fields || {};
                return Object.assign(Object.assign({}, (_b = (_a = constructor.prototype) === null || _a === void 0 ? void 0 : _a._super) === null || _b === void 0 ? void 0 : _b.fields()), fields);
            };
        }
        else {
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
export function StringField(defaultValue, mutator) {
    return Field(Model.string(defaultValue || '', mutator));
}
/**
 * Adds the property as a uid field
 * @param value optional function that makes a custom a uid
 */
export function UidField(value) {
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
export function AttrField(defaultValue, mutator) {
    return Field(Model.attr(defaultValue || '', mutator));
}
/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 * @param mutator Mutate the given value
 */
export function NumberField(defaultValue, mutator) {
    return Field(Model.number(defaultValue || 0, mutator));
}
/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 * @param mutator Mutate the given value
 */
export function BooleanField(defaultValue, mutator) {
    return Field(Model.boolean(defaultValue || false, mutator));
}
/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(related, foreignKey, localKey) {
    return Field(Model.hasMany(related, foreignKey, localKey));
}
/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(related, foreignKey, localKey) {
    return Field(Model.hasOne(related, foreignKey, localKey));
}
/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(parent, foreignKey, ownerKey) {
    return Field(Model.belongsTo(parent, foreignKey, ownerKey));
}
export function HasManyByField(parent, foreignKey, ownerKey) {
    return Field(Model.hasManyBy(parent, foreignKey, ownerKey));
}
export function HasManyThroughField(related, through, firstKey, secondKey, localKey, secondLocalKey) {
    return Field(Model.hasManyThrough(related, through, firstKey, secondKey, localKey, secondLocalKey));
}
export function BelongsToManyField(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey) {
    return Field(Model.belongsToMany(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey));
}
export function MorphToField(id, type) {
    return Field(Model.morphTo(id, type));
}
export function MorphOneField(related, id, type, localKey) {
    return Field(Model.morphOne(related, id, type, localKey));
}
export function MorphManyField(related, id, type, localKey) {
    return Field(Model.morphMany(related, id, type, localKey));
}
export function MorphToManyField(related, pivot, relatedId, id, type, parentKey, relatedKey) {
    return Field(Model.morphToMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}
export function MorphedByManyField(related, pivot, relatedId, id, type, parentKey, relatedKey) {
    return Field(Model.morphedByMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}
//# sourceMappingURL=attributes.js.map