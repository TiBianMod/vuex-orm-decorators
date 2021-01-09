import { Model, MorphOne } from '@vuex-orm/core';
import { MorphOneField, NumberField, StringField } from '@/attributes';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('MorphOneField', () => {
    let store: Store<any>;

    afterEach(() => {
        store.$db().entities = [];
    });

    it('can define the property as a `Morph One` relationship field', () => {
        @OrmModel('images')
        class Image extends Model {

            @NumberField() id!: number;

            @StringField() url!: string;

            @NumberField() imageable_id!: number;

            @StringField() imageable_type!: string;

        }

        @OrmModel('users')
        class User extends Model {

            @NumberField() id!: number;

            @StringField() name!: string;

            @MorphOneField(Image, 'imageable_id', 'imageable_type')
            image!: Image;

        }

        @OrmModel('posts')
        class Post extends Model {

            @NumberField() id!: number;

            @StringField() title!: string;

            @MorphOneField(Image, 'imageable_id', 'imageable_type')
            image!: Image;

        }

        store = new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: {
                id: 5, name: 'John Doe',
                image: {
                    id: 1,
                    url: 'http://example.com/user_image_1.png',
                    imageable_id: 5,
                    imageable_type: 'users',
                },
            },
        });

        Post.insert({
            data: {
                id: 3, title: 'Post title...',
                image: {
                    id: 2,
                    url: 'http://example.com/post_image_1.png',
                    imageable_id: 3,
                    imageable_type: 'posts',
                },
            },
        });

        [
            User.getFields().image as MorphOne,
            Post.getFields().image as MorphOne,
        ].forEach(field => {
            expect(field).toBeInstanceOf(MorphOne);

            expect(field.related).toBe(Image);
            expect(field.id).toBe('imageable_id');
            expect(field.type).toBe('imageable_type');
            expect(field.localKey).toBe('id');
        });

        expect(User.query().with('image').first()?.image).toEqual({
            $id: '1',
            id: 1,
            url: 'http://example.com/user_image_1.png',
            imageable_id: 5,
            imageable_type: 'users',
        });

        expect(Post.query().with('image').first()?.image).toEqual({
            $id: '2',
            id: 2,
            url: 'http://example.com/post_image_1.png',
            imageable_id: 3,
            imageable_type: 'posts',
        });

        expect(User.query().with('image').first()?.image).toBeInstanceOf(Image);
        expect(Post.query().with('image').first()?.image).toBeInstanceOf(Image);
        expect(Image.all()).toHaveLength(2);
        expect(Post.all()).toHaveLength(1);
        expect(User.all()).toHaveLength(1);
    });
});
