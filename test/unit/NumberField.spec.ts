import { Model, Number } from "@vuex-orm/core";
import { NumberField } from "@/attributes";
import { OrmModel } from "@/model";

describe("NumberField", () => {
    it("can define `number` field", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField() age!: number;
        }

        expect(new User().age).toBe(0);
        expect(User.getFields().age).toBeInstanceOf(Number);
        expect((User.getFields().age as Number).isNullable).toBe(false);
    });

    it("can define `number` field with default value", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField(25) age!: number;
        }

        expect(new User().age).toBe(25);
        expect(User.getFields().age).toBeInstanceOf(Number);
        expect((User.getFields().age as Number).isNullable).toBe(false);
    });

    it("can define `number` field with null value", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField(null) age!: number;
        }

        expect(new User().age).toBe(null);
        expect(User.getFields().age).toBeInstanceOf(Number);
        expect((User.getFields().age as Number).isNullable).toBe(true);
    });

    it("can mutate the given value", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField(25, (value: number) => {
                return value + 1;
            })
            age!: number;
        }

        expect(new User().age).toBe(26);
        expect(User.getFields().age).toBeInstanceOf(Number);
        expect((User.getFields().age as Number).isNullable).toBe(false);
    });
});
