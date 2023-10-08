import { describe, expect, it } from "vitest";
import { Model, MorphToMany } from "@vuex-orm/core";
import { MorphToManyField, NumberField, StringField } from "@/attributes";
import { ORMDatabase } from "@/database";
import { OrmModel } from "@/model";
import { Store } from "vuex";

describe("MorphToManyField", () => {
    it("can define the property as a `Morph To Many` relationship field", () => {
        @OrmModel("tags")
        class Tag extends Model {
            @NumberField() id!: number;

            @StringField() name!: string;
        }

        @OrmModel("taggables")
        class Taggable extends Model {
            @NumberField() id!: number;

            @NumberField() tag_id!: number;

            @NumberField() taggable_id!: number;

            @StringField() taggable_type!: string;
        }

        @OrmModel("posts")
        class Post extends Model {
            @NumberField() id!: number;

            @StringField() title!: string;

            @MorphToManyField(Tag, Taggable, "tag_id", "taggable_id", "taggable_type")
            tags!: Tag[];
        }

        @OrmModel("videos")
        class Video extends Model {
            @NumberField() id!: number;

            @StringField() link!: string;

            @MorphToManyField(Tag, Taggable, "tag_id", "taggable_id", "taggable_type")
            tags!: Tag[];
        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        Post.insert({
            data: {
                id: 1,
                title: "Post title...",
                tags: [
                    {
                        id: 1,
                        tag_id: 1,
                        taggable_id: 1,
                        taggable_type: "posts",
                        name: "typescript",
                    },
                    {
                        id: 2,
                        tag_id: 2,
                        taggable_id: 1,
                        taggable_type: "posts",
                        name: "javascript",
                    },
                ],
            },
        });

        Video.insert({
            data: {
                id: 1,
                link: "http://example.com/video/something-nice",
                tags: [
                    {
                        id: 1,
                        tag_id: 1,
                        taggable_id: 1,
                        taggable_type: "videos",
                        name: "typescript",
                    },
                    { id: 3, tag_id: 3, taggable_id: 1, taggable_type: "videos", name: "php" },
                ],
            },
        });

        [Post.getFields().tags as MorphToMany, Video.getFields().tags as MorphToMany].forEach(
            (field) => {
                expect(field).toBeInstanceOf(MorphToMany);

                expect(field.related).toBe(Tag);
                expect(field.pivot).toBe(Taggable);

                expect(field.relatedId).toBe("tag_id");
                expect(field.id).toBe("taggable_id");
                expect(field.type).toBe("taggable_type");
                expect(field.parentKey).toBe("id");
                expect(field.relatedKey).toBe("id");
            }
        );

        expect(Post.query().with("tags").first()?.tags).toEqual([
            {
                $id: "1",
                id: 1,
                name: "typescript",
                pivot: {
                    $id: "1_1_posts",
                    id: 0,
                    tag_id: 1,
                    taggable_id: 1,
                    taggable_type: "posts",
                },
            },
            {
                $id: "2",
                id: 2,
                name: "javascript",
                pivot: {
                    $id: "1_2_posts",
                    id: 0,
                    tag_id: 2,
                    taggable_id: 1,
                    taggable_type: "posts",
                },
            },
        ]);

        expect(Video.query().with("tags").first()?.tags).toEqual([
            {
                $id: "1",
                id: 1,
                name: "typescript",
                pivot: {
                    $id: "1_1_videos",
                    id: 0,
                    tag_id: 1,
                    taggable_id: 1,
                    taggable_type: "videos",
                },
            },
            {
                $id: "3",
                id: 3,
                name: "php",
                pivot: {
                    $id: "1_3_videos",
                    id: 0,
                    tag_id: 3,
                    taggable_id: 1,
                    taggable_type: "videos",
                },
            },
        ]);

        expect(Post.query().with("tags").first()?.tags[0]).toBeInstanceOf(Tag);
        expect(Video.query().with("tags").first()?.tags[0]).toBeInstanceOf(Tag);
        expect(Tag.all()).toHaveLength(3);
        expect(Taggable.all()).toHaveLength(4);
        expect(Post.all()).toHaveLength(1);
        expect(Video.all()).toHaveLength(1);
    });
});
