import { Model } from '@vuex-orm/core';
/**
 * Creates an vuex-orm Model
 * @param entityName The name of the entity to be used as the key for the state
 */
export function OrmModel(entityName) {
    return function (constructor) {
        var model = constructor;
        constructor.entity = entityName;
        constructor.fields = function () { return constructor._fields || {}; };
        return constructor;
    };
}
/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey() {
    return function (target, propertyName) {
        target.constructor.primaryKey = propertyName;
    };
}
/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType) {
    return function (target, propertyName) {
        target.constructor._fields = target.constructor._fields || {};
        target.constructor._fields[propertyName] = fieldType;
    };
}
/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function StringField(defaultValue) {
    return Field(Model.string(defaultValue || ''));
}
/**
 * Adds the property as an incremental field
 */
export function IncrementField() {
    return Field(Model.increment());
}
/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undiefine dthe default will be '')
 */
export function AttrField(defaultValue) {
    return Field(Model.string(defaultValue));
}
/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export function NumberField(defaultValue) {
    return Field(Model.number(defaultValue || 0));
}
/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export function BooleanField(value, mutator) {
    return Field(Model.boolean(value, mutator));
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
export function HasOne(related, foreignKey, localKey) {
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
//# sourceMappingURL=index.js.map