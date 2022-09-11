import { BelongsToMany, Model } from "@vuex-orm/core";
import { BelongsToManyField, NumberField, StringField } from "@/attributes";
import { describe, expect, it } from "vitest";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";

describe("BelongsToManyField", () => {
    it("can define the property as a `Belongs To Many` relationship field", () => {
        @OrmModel("roles")
        class Role extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;
        }

        @OrmModel("role_users")
        class RoleUser extends Model {
            static primaryKey = ["role_id", "user_id"];

            @NumberField() role_id!: number;

            @NumberField() user_id!: number;
        }

        @OrmModel("users")
        class User extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;

            @BelongsToManyField(Role, RoleUser, "user_id", "role_id")
            roles!: Role[];
        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: {
                id: 1,
                name: "John Doe",
                roles: [
                    { id: 1, name: "Admin" },
                    { id: 2, name: "Operator" },
                ],
            },
        });

        const field = User.getFields().roles as BelongsToMany;

        expect(field).toBeInstanceOf(BelongsToMany);

        expect(field.related).toBe(Role);
        expect(field.pivot).toBe(RoleUser);
        expect(field.foreignPivotKey).toBe("user_id");
        expect(field.relatedPivotKey).toBe("role_id");
        expect(field.parentKey).toBe("id");
        expect(field.relatedKey).toBe("id");

        const user = User.query().with("roles").first();

        expect(user?.roles).toEqual([
            {
                $id: "1",
                id: 1,
                name: "Admin",
                pivot: { $id: "[1,1]", role_id: 1, user_id: 1 },
            },
            {
                $id: "2",
                id: 2,
                name: "Operator",
                pivot: { $id: "[2,1]", role_id: 2, user_id: 1 },
            },
        ]);

        expect(user?.roles[0]).toBeInstanceOf(Role);
        expect(Role.all()).toHaveLength(2);
        expect(RoleUser.all()).toHaveLength(2);
        expect(User.all()).toHaveLength(1);
    });
});
