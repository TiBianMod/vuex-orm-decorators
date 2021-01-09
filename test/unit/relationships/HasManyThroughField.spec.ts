import { HasManyThrough, Model } from '@vuex-orm/core';
import { HasManyThroughField, NumberField, StringField } from '@/attributes';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('HasManyThroughField', () => {
    it('can define the property as a `Has Many Through` relationship field', () => {
        @OrmModel('users')
        class User extends Model {

            @NumberField() id!: number;

            @StringField() name!: string;

            @NumberField() country_id!: number;

        }

        @OrmModel('posts')
        class Post extends Model {

            @NumberField() id!: number;

            @StringField() name!: string;

            @NumberField() user_id!: number;

        }

        @OrmModel('countries')
        class Country extends Model {

            @NumberField() id!: number;

            @StringField() name!: string;

            @HasManyThroughField(Post, User, 'country_id', 'user_id')
            posts!: Post;

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: [
                { id: 1, name: 'John Doe', country_id: 1 },
                { id: 2, name: 'Jane Doe', country_id: 1 },
            ],
        });

        Country.insert({
            data: {
                id: 1, name: 'Big Country',
                posts: [
                    { id: 1, name: 'Post one', user_id: 1 },
                    { id: 2, name: 'Post two', user_id: 2 },
                    { id: 3, name: 'Post three', user_id: 1 },
                ],
            },
        });

        const field = Country.getFields().posts as HasManyThrough;

        expect(field).toBeInstanceOf(HasManyThrough);

        expect(field.related).toBe(Post);
        expect(field.through).toBe(User);
        expect(field.firstKey).toBe('country_id');
        expect(field.secondKey).toBe('user_id');
        expect(field.localKey).toBe('id');
        expect(field.secondLocalKey).toBe('id');

        const country = Country.query().with('posts').first();

        expect(country?.posts).toEqual([
            { $id: '1', id: 1, name: 'Post one', user_id: 1 },
            { $id: '3', id: 3, name: 'Post three', user_id: 1 },
            { $id: '2', id: 2, name: 'Post two', user_id: 2 },
        ]);

        expect(country?.posts[0]).toBeInstanceOf(Post);
        expect(User.all()).toHaveLength(2);
        expect(Post.all()).toHaveLength(3);
        expect(Country.all()).toHaveLength(1);
    });
});
