import { Boolean, Model } from "@vuex-orm/core";
import { BooleanField } from "@/attributes";
import { OrmModel } from "@/model";

describe("BooleanField", () => {
    it("can define `boolean` field", () => {
        @OrmModel("users")
        class User extends Model {
            @BooleanField() active!: boolean;
        }

        expect(new User().active).toBe(false);
        expect(User.getFields().active).toBeInstanceOf(Boolean);
        expect((User.getFields().active as Boolean).isNullable).toBe(false);
    });

    it("can define `boolean` field with default value", () => {
        @OrmModel("users")
        class User extends Model {
            @BooleanField(true) active!: boolean;
        }

        expect(new User().active).toBe(true);
        expect(User.getFields().active).toBeInstanceOf(Boolean);
        expect((User.getFields().active as Boolean).isNullable).toBe(false);
    });

    it("can define `boolean` field with null value", () => {
        @OrmModel("users")
        class User extends Model {
            @BooleanField(null) active!: boolean;
        }

        expect(new User().active).toBe(null);
        expect(User.getFields().active).toBeInstanceOf(Boolean);
        expect((User.getFields().active as Boolean).isNullable).toBe(true);
    });

    it("can mutate the given value", () => {
        @OrmModel("users")
        class User extends Model {
            @BooleanField(false, (value: boolean) => {
                return !value;
            })
            active!: boolean;
        }

        expect(new User().active).toBe(true);
        expect(User.getFields().active).toBeInstanceOf(Boolean);
        expect((User.getFields().active as Boolean).isNullable).toBe(false);
    });
});
