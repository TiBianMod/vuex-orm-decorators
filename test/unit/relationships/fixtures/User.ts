import { HasOneField, NumberField, StringField } from "@/attributes";
import { Model } from "@vuex-orm/core";
import { OrmModel } from "@/model";
import { Profile } from "test/unit/relationships/fixtures/Profile";

@OrmModel("users")
export class User extends Model {
    @NumberField() id!: number;

    @StringField() name!: string;

    @HasOneField(Profile, "user_id") profile!: Profile;
}
