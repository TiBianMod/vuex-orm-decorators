import { describe, expect, it } from "vitest";
import { Model } from "@vuex-orm/core";
import { NumberField, StringField } from "@/attributes";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";
import type { String } from "@vuex-orm/core";

describe("Cases", () => {
    it("merges the properties with the `fields` method", () => {
        @OrmModel("users")
        class User extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;

            static fields() {
                return {
                    email: this.attr(""),
                    active: this.attr(true),
                };
            }
        }

        @OrmModel("profiles")
        class Profile extends Model {
            @NumberField() id!: number;

            @NumberField() user_id!: number;

            @NumberField() age!: number;

            @StringField() sex!: string;

            static fields() {
                return {
                    user: this.belongsTo(User, "user_id"),
                };
            }
        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        Profile.insert({
            data: {
                id: 1,
                user_id: 10,
                age: 25,
                sex: "male",
                user: {
                    id: 10,
                    name: "John Doe",
                    email: "john@doe.com",
                },
            },
        });

        expect(Profile.query().with("user").first()).toEqual({
            $id: "1",
            user: {
                $id: "10",
                email: "john@doe.com",
                active: true,
                id: 10,
                name: "John Doe",
            },
            id: 1,
            user_id: 10,
            age: 25,
            sex: "male",
        });

        expect(Profile.query().first()).toEqual({
            $id: "1",
            user: null,
            id: 1,
            user_id: 10,
            age: 25,
            sex: "male",
        });

        expect(User.query().first()).toEqual({
            $id: "10",
            email: "john@doe.com",
            active: true,
            id: 10,
            name: "John Doe",
        });
    });

    it("uses default value when using mutator and null as value", () => {
        @OrmModel("something")
        class Something extends Model {
            @StringField(null, (value: string) => {
                return value.toUpperCase();
            })
            name!: string;
        }

        expect(new Something().name).toBe("");
        expect((Something.getFields().name as String).isNullable).toBe(false);
    });
});
