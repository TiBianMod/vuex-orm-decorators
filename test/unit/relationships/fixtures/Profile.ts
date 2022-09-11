import { BelongsToField, NumberField, StringField } from "@/attributes";
import { Model } from "@vuex-orm/core";
import { OrmModel } from "@/model";
import { User } from "test/unit/relationships/fixtures/User";

@OrmModel("profiles")
export class Profile extends Model {
    @NumberField() id!: number;

    @NumberField() user_id!: number;

    @NumberField() age!: number;

    @StringField() sex!: string;

    @BelongsToField(User, "user_id")
    user!: User;
}
