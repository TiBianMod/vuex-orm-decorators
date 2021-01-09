import { Model, MorphMany } from '@vuex-orm/core';
import { MorphManyField, NumberField, StringField } from '@/attributes';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('MorphManyField', () => {
    it('can define the property as a `Morph Many` relationship field', () => {
        @OrmModel('comments')
        class Comment extends Model {

            @NumberField() id!: number;

            @StringField() body!: string;

            @NumberField() commentable_id!: number[];

            @StringField() commentable_type!: string;

        }

        @OrmModel('posts')
        class Post extends Model {

            @NumberField() id!: number;

            @StringField() title!: string;

            @MorphManyField(Comment, 'commentable_id', 'commentable_type')
            comments!: Comment[];

        }

        @OrmModel('videos')
        class Video extends Model {

            @NumberField() id!: number;

            @StringField() link!: string;

            @MorphManyField(Comment, 'commentable_id', 'commentable_type')
            comments!: Comment[];

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        Post.insert({
            data: {
                id: 1, title: 'Post title...',
                comments: [
                    { id: 1, body: 'comment 1', commentable_id: 1, commentable_type: 'posts' },
                    { id: 3, body: 'comment 3', commentable_id: 1, commentable_type: 'posts' },
                ],
            },
        });

        Video.insert({
            data: {
                id: 1, link: 'http://example.com/video/something-nice',
                comments: [
                    { id: 2, body: 'comment 2', commentable_id: 1, commentable_type: 'videos' },
                    { id: 4, body: 'comment 4', commentable_id: 1, commentable_type: 'videos' },
                ],
            },
        });

        [
            Post.getFields().comments as MorphMany,
            Video.getFields().comments as MorphMany,
        ].forEach(field => {
            expect(field).toBeInstanceOf(MorphMany);

            expect(field.related).toBe(Comment);
            expect(field.id).toBe('commentable_id');
            expect(field.type).toBe('commentable_type');
            expect(field.localKey).toBe('id');
        });

        expect(Post.query().with('comments').first()?.comments).toEqual([
            {
                $id: '1',
                id: 1,
                body: 'comment 1',
                commentable_id: 1,
                commentable_type: 'posts',
            },
            {
                $id: '3',
                id: 3,
                body: 'comment 3',
                commentable_id: 1,
                commentable_type: 'posts',
            },
        ]);

        expect(Video.query().with('comments').first()?.comments).toEqual([
            {
                $id: '2',
                id: 2,
                body: 'comment 2',
                commentable_id: 1,
                commentable_type: 'videos',
            },
            {
                $id: '4',
                id: 4,
                body: 'comment 4',
                commentable_id: 1,
                commentable_type: 'videos',
            },
        ]);

        expect(Post.query().with('comments').first()?.comments[0]).toBeInstanceOf(Comment);
        expect(Video.query().with('comments').first()?.comments[0]).toBeInstanceOf(Comment);
        expect(Comment.all()).toHaveLength(4);
        expect(Post.all()).toHaveLength(1);
        expect(Video.all()).toHaveLength(1);
    });
});
