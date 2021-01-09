import { Model, Uid } from '@vuex-orm/core';
import { OrmModel } from '@/model';
import { UidField } from '@/attributes';

describe('UidField', () => {
    it('can define `uid` field', () => {
        @OrmModel('users')
        class User extends Model {

            @UidField() uid!: number;

        }

        expect(User.getFields().uid).toBeInstanceOf(Uid);
        expect((new User()).uid).toBe('$uid1');
        expect((User.getFields().uid as Uid).isNullable).toBe(false);
    });

    it('can define `uid` field with custom value', () => {
        @OrmModel('users')
        class User extends Model {

            @UidField(() => 'uid') uid!: number;

        }

        expect(User.getFields().uid).toBeInstanceOf(Uid);
        expect((new User()).uid).toBe('uid');
        expect((User.getFields().uid as Uid).isNullable).toBe(false);
    });
});
