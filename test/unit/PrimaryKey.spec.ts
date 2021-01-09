import { Model } from '@vuex-orm/core';
import { NumberField, PrimaryKey, UidField } from '@/attributes';
import { OrmModel } from '@/model';

describe('PrimaryKey', () => {
    test('property id is by default the primaryKey', () => {
        @OrmModel('users')
        class User extends Model {

            @NumberField() id!: number;
        
        }

        expect(User.primaryKey).toBe('id');
    });

    it('sets the property as the primary key of the model', () => {
        @OrmModel('users')
        class User extends Model {

            @PrimaryKey()
            @UidField() uid!: number;
        
        }

        expect(User.primaryKey).not.toBe('id');
        expect(User.primaryKey).toBe('uid');
    });

    it('throws a warning message when using `PrimaryKey` decorator on `id` property', () => {
        spyOn(console, 'warn');

        @OrmModel('users')
        class User extends Model {

            @PrimaryKey()
            @NumberField() id!: number;
        
        }

        new User();

        expect(console.warn).toHaveBeenLastCalledWith('[Vuex ORM Decorators] No need using `PrimaryKey` decorator on property `id`. Property `id` is by default the `primaryKey`.');
    });
});
