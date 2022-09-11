import { afterEach, describe, expect, it, vi } from "vitest";
import { Model } from "@vuex-orm/core";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";

describe("ORMDatabase", () => {
    let store: Store<any>;

    afterEach(() => {
        store.$db().entities = [];
    });

    it("can auto register a model to Database", () => {
        const spy = vi.spyOn(console, "warn");

        @OrmModel("users")
        class User extends Model {}

        @OrmModel("admins", "users")
        class Admin extends User {}

        new User();
        new Admin();
        new User();

        store = new Store({
            plugins: [ORMDatabase.install()],
        });

        expect(store.$db().namespace).toBe("entities");
        expect(store.$db().entities).toHaveLength(2);

        expect(store.$db().entities[0].name).toBe("users");
        expect(store.$db().entities[0].base).toBe("users");

        expect(store.$db().entities[1].name).toBe("admins");
        expect(store.$db().entities[1].base).toBe("users");

        expect(spy).toHaveBeenCalled();
    });

    it("can pass options during the installation", () => {
        @OrmModel("persons")
        class Persons extends Model {}

        new Persons();

        store = new Store({
            plugins: [ORMDatabase.install({ namespace: "Models" })],
        });

        expect(store.$db().namespace).toBe("Models");
        expect(store.$db().entities).toHaveLength(1);
    });

    it("throws a error message when the model is already registered", () => {
        const spy = vi.spyOn(console, "error");

        @OrmModel("users")
        class User extends Model {}

        new User();

        ORMDatabase.registerEntity(User);

        store = new Store({
            plugins: [ORMDatabase.install()],
        });

        expect(console.error).toHaveBeenLastCalledWith(
            "[Vuex ORM Decorators] Unable to register Model 'User'. Model 'User' is already registered."
        );

        expect(spy).toHaveBeenCalled();
    });
});
