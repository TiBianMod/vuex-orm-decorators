import { describe, expect, it } from "vitest";
import { Model, MorphTo } from "@vuex-orm/core";
import { MorphOneField, MorphToField, NumberField, StringField } from "@/attributes";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";

describe("MorphToField", () => {
    it("can define the property as a `Morph To` relationship field", () => {
        @OrmModel("images")
        class Image extends Model {
            @NumberField() id!: number;

            @StringField() url!: string;

            @NumberField() imageable_id!: number;

            @StringField() imageable_type!: string;

            @MorphToField("imageable_id", "imageable_type")
            imageable!: User;
        }

        @OrmModel("users")
        class User extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;

            @MorphOneField(Image, "imageable_id", "imageable_type")
            image!: Image;
        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: {
                id: 5,
                name: "John Doe",
                image: {
                    id: 1,
                    url: "http://example.com/user_image_1.png",
                    imageable_id: 5,
                    imageable_type: "users",
                },
            },
        });

        const field = Image.getFields().imageable as MorphTo;

        expect(field).toBeInstanceOf(MorphTo);

        expect(field.id).toBe("imageable_id");
        expect(field.type).toBe("imageable_type");

        expect(Image.query().with("imageable").first()).toEqual({
            $id: "1",
            id: 1,
            url: "http://example.com/user_image_1.png",
            imageable_id: 5,
            imageable_type: "users",
            imageable: { $id: "5", id: 5, name: "John Doe", image: null },
        });

        expect(Image.query().with("imageable").first()?.imageable).toBeInstanceOf(User);
        expect(Image.all()).toHaveLength(1);
        expect(User.all()).toHaveLength(1);
    });
});
