import { Model, String } from '@vuex-orm/core';
import { OrmModel } from '@/model';
import { StringField } from '@/attributes';

describe('StringField', () => {
    it('can define `string` field', () => {
        @OrmModel('users')
        class User extends Model {

            @StringField() name!: string;

        }

        expect(new User().name).toBe('');
        expect(User.getFields().name).toBeInstanceOf(String);
        expect((User.getFields().name as String).isNullable).toBe(false);
    });

    it('can define `string` field with default value', () => {
        @OrmModel('users')
        class User extends Model {

            @StringField('John Doe') name!: string;

        }

        expect(new User().name).toBe('John Doe');
        expect(User.getFields().name).toBeInstanceOf(String);
        expect((User.getFields().name as String).isNullable).toBe(false);
    });

    it('can define `string` field with null value', () => {
        @OrmModel('users')
        class User extends Model {

            @StringField(null) name!: string;

        }

        expect(new User().name).toBe(null);
        expect(User.getFields().name).toBeInstanceOf(String);
        expect((User.getFields().name as String).isNullable).toBe(true);
    });

    it('can mutate the given value', () => {
        @OrmModel('users')
        class User extends Model {

            @StringField('john doe', (value: string) => {
                return value.toUpperCase();
            }) name!: string;

        }

        expect(new User().name).toBe('JOHN DOE');
        expect(User.getFields().name).toBeInstanceOf(String);
        expect((User.getFields().name as String).isNullable).toBe(false);
    });
});
