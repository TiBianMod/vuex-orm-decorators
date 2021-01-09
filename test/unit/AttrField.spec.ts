import { Attr, Model } from '@vuex-orm/core';
import { AttrField } from '@/attributes';
import { OrmModel } from '@/model';

describe('AttrField', () => {
    it('can define `attr` field', () => {
        @OrmModel('users')
        class User extends Model {

            @AttrField() id!: number;

        }

        expect(User.getFields().id).toBeInstanceOf(Attr);
        expect((new User()).id).toBe('');
        expect((User.getFields().id as Attr).isNullable).toBe(false);
    });

    it('can define `attr` field with default value', () => {
        @OrmModel('users')
        class User extends Model {

            @AttrField(1) id!: number;

        }

        expect(User.getFields().id).toBeInstanceOf(Attr);
        expect((new User()).id).toBe(1);
        expect((User.getFields().id as Attr).isNullable).toBe(false);
    });

    it('can define `attr` field with null value', () => {
        @OrmModel('users')
        class User extends Model {

            @AttrField(null) id!: number;

        }

        expect(User.getFields().id).toBeInstanceOf(Attr);
        expect((new User()).id).toBe(null);
        expect((User.getFields().id as Attr).isNullable).toBe(true);
    });

    it('can mutate the given value', () => {
        @OrmModel('users')
        class User extends Model {

            @AttrField('john doe', (value: string) => {
                return value.toUpperCase();
            }) name!: string;

        }

        expect(User.getFields().name).toBeInstanceOf(Attr);
        expect((new User()).name).toBe('JOHN DOE');
        expect((User.getFields().name as Attr).isNullable).toBe(false);
    });
});
