import { Database, install, use } from "@vuex-orm/core";
import DatePlugin from "./plugins/Date";
import type { Model } from "@vuex-orm/core";
import type { Options } from "@vuex-orm/core/dist/src/store/install";
import type { Plugin } from "vuex";

use(DatePlugin);

export class ORMDatabase {
    private static _ormDatabase = new Database();

    private static _models: (typeof Model)[] = [];

    public static install(options?: Options): Plugin<any> {
        this._models.forEach((model) => this._ormDatabase.register(model));

        const plugin = install(this._ormDatabase, options);

        this._models = [];

        return plugin;
    }

    public static registerEntity(model: typeof Model) {
        if (this._models.includes(model)) {
            return console.error(
                `[Vuex ORM Decorators] Unable to register Model '${model.name}'. Model '${model.name}' is already registered.`
            );
        }

        this._models.push(model);
    }

    public static models() {
        return this._models;
    }
}
