import { AttrField, BooleanField, NumberField } from '@/attributes';
import { Model } from '@vuex-orm/core';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';

describe('OrmModel', () => {
    it('can define the name that is going be used as module name in Vuex Store', () => {
        @OrmModel('users')
        class User extends Model {
        }

        expect(User.entity).toBe('users');
    });

    it('can define the reference to the base entity name', () => {
        @OrmModel('users')
        class User extends Model {
        }

        @OrmModel('admins', 'users')
        class Admin extends User {
        }

        expect(User.entity).toBe('users');
        expect(User.baseEntity).toBe(undefined);

        expect(Admin.entity).toBe('admins');
        expect(Admin.baseEntity).toBe('users');
    });

    it('can define the inheritance types', () => {
        @OrmModel('users')
        class User extends Model {
        }

        @OrmModel('admins', 'users', {
            ADMIN: Admin,
            USER: User,
        })
        class Admin extends User {
        }

        @OrmModel('guests', 'users', {
            GUEST: Guest,
            USER: User,
        })
        class Guest extends User {
        }

        const typeKeys = ['ADMIN', 'USER', 'GUEST'];

        expect(Object.keys(User.types())).toHaveLength(3);
        expect(Object.keys(User.types())).toEqual(typeKeys);
        expect(User.types().USER.entity).toBe('users');
        expect(User.types().ADMIN.entity).toBe('admins');
        expect(User.types().GUEST.entity).toBe('guests');

        expect(Object.keys(Admin.types())).toHaveLength(3);
        expect(Object.keys(Admin.types())).toEqual(typeKeys);
        expect(Admin.types().USER.entity).toBe('users');
        expect(Admin.types().ADMIN.entity).toBe('admins');
        expect(Admin.types().GUEST.entity).toBe('guests');

        expect(Object.keys(Guest.types())).toHaveLength(3);
        expect(Object.keys(Guest.types())).toEqual(typeKeys);
        expect(Guest.types().USER.entity).toBe('users');
        expect(Guest.types().ADMIN.entity).toBe('admins');
        expect(Admin.types().GUEST.entity).toBe('guests');
    });

    it('can define the inheritance fields', () => {
        @OrmModel('users')
        class User extends Model {

            @AttrField() id!: number;

            @AttrField() name!: string;

            @AttrField() email!: string;

        }

        expect(Object.keys(User.fields())).toHaveLength(3);
        expect(Object.keys(User.fields())).toEqual(['id', 'name', 'email']);

        @OrmModel('admins', 'users')
        class Admin extends User {

            @NumberField() level!: number;

            @BooleanField() active!: boolean;

        }

        expect(Object.keys(User.fields())).toHaveLength(3);

        expect(Object.keys(Admin.fields())).toHaveLength(5);
        expect(Object.keys(Admin.fields())).toEqual(['id', 'name', 'email', 'level', 'active']);

        @OrmModel('super-admins', 'admins')
        class SuperAdmin extends Admin {

            @BooleanField() fullAccess!: boolean;

        }

        expect(Object.keys(User.fields())).toHaveLength(3);
        expect(Object.keys(Admin.fields())).toHaveLength(5);

        expect(Object.keys(SuperAdmin.fields())).toHaveLength(6);
        expect(Object.keys(SuperAdmin.fields())).toEqual(['id', 'name', 'email', 'level', 'active', 'fullAccess']);
    });

    it('throws a warning message when using STI without mapping the types', () => {
        spyOn(console, 'warn');

        @OrmModel('users')
        class User extends Model {
        }

        @OrmModel('admins', 'users')
        class Admin extends User {
        }

        new Admin();

        new Store({
            plugins: [ORMDatabase.install()],
        });

        expect(console.warn).toHaveBeenLastCalledWith('[Vuex ORM] Model `Admin` extends `User` which doesn\'t overwrite Model.types(). You will not be able to use type mapping.');
    });
});