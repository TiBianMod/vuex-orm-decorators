import { HasMany, Model } from '@vuex-orm/core';
import { HasManyField, NumberField, StringField } from '@/attributes';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('HasManyField', () => {
    it('can define the property as a `Has Many` relationship field', () => {
        @OrmModel('comments')
        class Comment extends Model {

            @NumberField() id!: number;

            @StringField() body!: string;

            @NumberField() post_id!: number;

        }

        @OrmModel('posts')
        class Post extends Model {

            @NumberField() id!: number;

            @StringField() title!: string;

            @StringField() body!: string;

            @HasManyField(Comment, 'post_id') comments!: Comment;

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        Post.insert({
            data: {
                id: 1, title: 'Post title', body: 'Some blog...',
                comments: [
                    { id: 1, body: 'Comment one', post_id: 1 },
                    { id: 2, body: 'Comment two', post_id: 2 },
                    { id: 3, body: 'Comment three', post_id: 1 },
                    { id: 4, body: 'Comment four', post_id: 1 },
                ],
            },
        });

        const field = Post.getFields().comments as HasMany;

        expect(field).toBeInstanceOf(HasMany);

        expect(field.related).toBe(Comment);
        expect(field.foreignKey).toBe('post_id');
        expect(field.localKey).toBe('id');

        const post = Post.query().with('comments').first();

        expect(post?.comments).toEqual([
            { $id: '1', id: 1, body: 'Comment one', post_id: 1 },
            { $id: '3', id: 3, body: 'Comment three', post_id: 1 },
            { $id: '4', id: 4, body: 'Comment four', post_id: 1 },
        ]);

        expect(post?.comments[0]).toBeInstanceOf(Comment);
        expect(Comment.all()).toHaveLength(4);
        expect(Post.all()).toHaveLength(1);
    });
});
