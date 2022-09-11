import { Type } from "@vuex-orm/core";
import type Model from "@vuex-orm/core/dist/src/model/Model";
import type Mutator from "@vuex-orm/core/dist/src/attributes/contracts/Mutator";
import type Record from "@vuex-orm/core/dist/src/data/Record";

export default class DateType extends Type {
    constructor(model: typeof Model, value: Date | null, mutator?: Mutator<Date>) {
        super(model, value, mutator);

        if (!mutator && value === null) {
            this.nullable();
        }
    }

    make(value: any, _parent: Record, key: string): Date | null {
        return this.mutate(this.validate(value), key);
    }

    validate(value: any): Date | number | null {
        if (this.isNullable && value === null) {
            return null;
        }

        if (typeof value === "string") {
            if (this.inRange(value)) {
                value = new Date(parseInt(value));
            }

            if (this.mutator) {
                this.value = value;
            } else {
                return Date.parse(value);
            }
        }

        if ((value === undefined || value === null) && !this.value) {
            return null;
        }

        return new Date(this.value || value);
    }

    inRange(value: string): boolean {
        const length = parseInt(value).toString().length;

        return length < 15 && length > 12;
    }
}
