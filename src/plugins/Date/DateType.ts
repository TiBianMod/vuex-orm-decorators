import { Type } from '@vuex-orm/core';
import Model from '@vuex-orm/core/lib/model/Model';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';
import Record from '@vuex-orm/core/lib/data/Record';

export default class DateType extends Type {

    constructor(model: typeof Model, value: Date | null, mutator?: Mutator<Date>) {
        super(model, value, mutator);

        if (! mutator && value === null) {
            this.nullable();
        }
    }

    make(value: any, _parent: Record, key: string): Date | null {
        return this.mutate(this.validate(value), key);
    }

    validate(value: any): Date | null {
        if (this.isNullable && this.value === null) {
            return null;
        }

        if (typeof value === 'string') {
            this.value = Date.parse(value);
        }

        if (value === undefined && typeof this.value !== 'number') {
            return this.value || new Date();
        }

        return new Date(this.value);
    }

}
