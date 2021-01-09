import { HasOne, Model } from '@vuex-orm/core';
import { HasOneField, NumberField, StringField } from '@/attributes';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('HasOneField', () => {
    let store: Store<any>;

    afterEach(() => {
        store.$db().entities = [];
    });

    it('can define the property as a `Has One` relationship field', () => {
        @OrmModel('profiles')
        class Profile extends Model {

            @NumberField() id!: number;

            @NumberField() user_id!: number;

            @NumberField() age!: number;

            @StringField() sex!: string;

        }

        @OrmModel('users')
        class User extends Model {

            @NumberField() id!: number;

            @StringField() name!: string;

            @HasOneField(Profile, 'user_id') profile!: Profile;

        }

        store = new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: {
                id: 1, name: 'John Doe',
                profile: {
                    id: 10, user_id: 1, age: 25, sex: 'male',
                },
            },
        });

        const field = User.getFields().profile as HasOne;

        expect(field).toBeInstanceOf(HasOne);

        expect(field.related).toBe(Profile);
        expect(field.localKey).toBe('id');
        expect(field.foreignKey).toBe('user_id');

        const user = User.query().with('profile').first();

        expect(user?.profile).toEqual({
            $id: '10', id: 10, user_id: 1, age: 25, sex: 'male',
        });

        expect(user?.profile).toBeInstanceOf(Profile);
        expect(User.all()).toHaveLength(1);
        expect(Profile.all()).toHaveLength(1);
    });
});
