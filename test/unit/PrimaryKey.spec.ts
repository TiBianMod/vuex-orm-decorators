import { describe, expect, it, test } from "vitest";
import { Model } from "@vuex-orm/core";
import { NumberField, PrimaryKey, StringField, UidField } from "@/attributes";
import { OrmModel } from "@/model";

describe("PrimaryKey", () => {
    test("property id is by default the primaryKey", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField() id!: number;
        }

        expect(User.primaryKey).toBe("id");
    });

    it("sets the property as the primary key of the model", () => {
        @OrmModel("users")
        class User extends Model {
            @PrimaryKey()
            @UidField()
            uid!: number;
        }

        expect(User.primaryKey).not.toBe("id");
        expect(User.primaryKey).toBe("uid");
    });

    it("supports composite key", () => {
        @OrmModel("users")
        class User extends Model {
            @PrimaryKey()
            @StringField()
            public userId!: string;

            @PrimaryKey()
            @StringField()
            public voteId!: string;
        }

        expect(User.primaryKey).toEqual(["userId", "voteId"]);
    });

    it("supports composite key with the default(id) field", () => {
        @OrmModel("users")
        class User extends Model {
            @PrimaryKey()
            @StringField()
            public id!: string;

            @PrimaryKey()
            @StringField()
            public userId!: string;

            @PrimaryKey()
            @StringField()
            public voteId!: string;
        }

        expect(User.primaryKey).toEqual(["id", "userId", "voteId"]);
    });
});
