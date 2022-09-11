import { BelongsTo } from "@vuex-orm/core";
import { ORMDatabase } from "@/database";
import { Profile } from "test/unit/relationships/fixtures/Profile";
import { Store } from "vuex";
import { User } from "test/unit/relationships/fixtures/User";

describe("BelongsToField", () => {
    it("can define the property as a `Belongs To` relationship field", () => {
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
                },
            },
        });

        const field = Profile.getFields().user as BelongsTo;

        expect(field).toBeInstanceOf(BelongsTo);

        expect(field.parent).toBe(User);
        expect(field.foreignKey).toBe("user_id");
        expect(field.ownerKey).toBe("id");

        const profile = Profile.query().with("user").first();

        expect(profile?.user).toEqual({
            $id: "10",
            id: 10,
            name: "John Doe",
            profile: null,
        });

        expect(profile?.user).toBeInstanceOf(User);
        expect(User.all()).toHaveLength(1);
        expect(Profile.all()).toHaveLength(1);
    });
});
