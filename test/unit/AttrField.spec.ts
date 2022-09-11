import { Attr, Model } from "@vuex-orm/core";
import { AttrField } from "@/attributes";
import { OrmModel } from "@/model";

describe("AttrField", () => {
    it("can define `attr` field", () => {
        @OrmModel("users")
        class User extends Model {
            @AttrField() name!: string;
        }

        expect(new User().name).toBe("");
        expect(User.getFields().name).toBeInstanceOf(Attr);
        expect((User.getFields().name as Attr).isNullable).toBe(false);
    });

    it("can define `attr` field with default value", () => {
        @OrmModel("users")
        class User extends Model {
            @AttrField("John") name!: string;
        }

        expect(new User().name).toBe("John");
        expect(User.getFields().name).toBeInstanceOf(Attr);
        expect((User.getFields().name as Attr).isNullable).toBe(false);
    });

    it("can define `attr` field with null value", () => {
        @OrmModel("users")
        class User extends Model {
            @AttrField(null) name!: string;
        }

        expect(new User().name).toBe(null);
        expect(User.getFields().name).toBeInstanceOf(Attr);
        expect((User.getFields().name as Attr).isNullable).toBe(true);
    });

    it("can mutate the given value", () => {
        @OrmModel("users")
        class User extends Model {
            @AttrField("john doe", (value: string) => {
                return value.toUpperCase();
            })
            name!: string;
        }

        expect(new User().name).toBe("JOHN DOE");
        expect(User.getFields().name).toBeInstanceOf(Attr);
        expect((User.getFields().name as Attr).isNullable).toBe(false);
    });
});
