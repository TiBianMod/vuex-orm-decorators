import { DateField } from '@/attributes';
import { Model } from '@vuex-orm/core';
import { ORMDatabase } from '@/database';
import { OrmModel } from '@/model';
import { Store } from 'vuex';
import DateType from '@/plugins/Date/DateType';

describe('DateField', () => {
    it('can define `date` field', () => {
        @OrmModel('users')
        class User extends Model {

            @DateField() created_at!: Date;

        }

        expect(new User().created_at).toBe(null);
        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().created_at as DateType).isNullable).toBe(false);
    });

    it('can define `date` field with default value', () => {
        const defaultDate = new Date();

        @OrmModel('users')
        class User extends Model {

            @DateField(defaultDate) created_at!: Date;

        }

        const user = new User();

        expect(user.created_at).toBeInstanceOf(Date);
        expect(user.created_at.toDateString()).toEqual(defaultDate.toDateString());
        expect(user.created_at.toUTCString()).toEqual(defaultDate.toUTCString());
        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().created_at as DateType).isNullable).toBe(false);
    });

    it('can define `date` field with null value', () => {
        @OrmModel('users')
        class User extends Model {

            @DateField(null) created_at!: Date;

        }

        expect(new User().created_at).toBe(null);
        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().created_at as DateType).isNullable).toBe(true);
    });

    it('parses proper dates to date instance', () => {
        @OrmModel('users-2')
        class User extends Model {

            @DateField() created_at!: Date;

            @DateField(null) deleted_at?: Date;

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: [
                { created_at: '2020-12-30T12:35:45.000000Z' },
                {
                    created_at: '2020-11-30T11:25:35.000000Z',
                    deleted_at: '2020-12-02T11:25:35.000000Z',
                },
                { created_at: '2020-10-30T10:15:25.000Z' },
                {
                    created_at: '1601456715000',
                    deleted_at: '1602666315000',
                },
            ],
        });

        const user_1 = User.find('$uid1');

        expect(user_1?.deleted_at).toBe(null);
        expect(user_1?.created_at).toBeInstanceOf(Date);
        expect(user_1?.created_at.toDateString()).toEqual('Wed Dec 30 2020');
        expect(user_1?.created_at.toUTCString()).toEqual('Wed, 30 Dec 2020 12:35:45 GMT');

        const user_2 = User.find('$uid2');

        expect(user_2?.created_at).toBeInstanceOf(Date);
        expect(user_2?.created_at.toDateString()).toEqual('Mon Nov 30 2020');
        expect(user_2?.created_at.toUTCString()).toEqual('Mon, 30 Nov 2020 11:25:35 GMT');

        expect(user_2?.deleted_at).toBeInstanceOf(Date);
        expect(user_2?.deleted_at?.toDateString()).toEqual('Wed Dec 02 2020');
        expect(user_2?.deleted_at?.toUTCString()).toEqual('Wed, 02 Dec 2020 11:25:35 GMT');

        const user_3 = User.find('$uid3');

        expect(user_3?.deleted_at).toBe(null);
        expect(user_3?.created_at).toBeInstanceOf(Date);
        expect(user_3?.created_at.toDateString()).toEqual('Fri Oct 30 2020');
        expect(user_3?.created_at.toUTCString()).toEqual('Fri, 30 Oct 2020 10:15:25 GMT');

        const user_4 = User.find('$uid4');

        expect(user_4?.created_at).toBeInstanceOf(Date);
        expect(user_4?.created_at.toDateString()).toEqual('Wed Sep 30 2020');
        expect(user_4?.created_at.toUTCString()).toEqual('Wed, 30 Sep 2020 09:05:15 GMT');

        expect(user_4?.deleted_at).toBeInstanceOf(Date);
        expect(user_4?.deleted_at?.toDateString()).toEqual('Wed Oct 14 2020');
        expect(user_4?.deleted_at?.toUTCString()).toEqual('Wed, 14 Oct 2020 09:05:15 GMT');

        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().created_at as DateType).isNullable).toBe(false);
        expect(User.getFields().deleted_at).toBeInstanceOf(DateType);
        expect((User.getFields().deleted_at as DateType).isNullable).toBe(true);
    });

    it('returns null if property is empty', () => {
        @OrmModel('users-3')
        class User extends Model {

            @DateField() created_at!: Date;

            @DateField() deleted_at?: Date;

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({
            data: [{ created_at: '2020-12-30T12:35:45.000000Z' }],
        });

        const user = User.query().first();

        expect(user?.deleted_at).toBe(null);
        expect(user?.created_at).toBeInstanceOf(Date);
        expect(user?.created_at.toDateString()).toEqual('Wed Dec 30 2020');
        expect(user?.created_at.toUTCString()).toEqual('Wed, 30 Dec 2020 12:35:45 GMT');
        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().deleted_at as DateType).isNullable).toBe(false);
        expect(User.getFields().deleted_at).toBeInstanceOf(DateType);
        expect((User.getFields().deleted_at as DateType).isNullable).toBe(false);
    });

    it('can mutate the given value', () => {
        @OrmModel('users-4')
        class User extends Model {

            @DateField(null, (value: Date) => {
                const mutated = value.setDate(value.getDate() + 1);

                return new Date(mutated);
            }) created_at!: Date;

        }

        new Store({
            plugins: [ORMDatabase.install()],
        });

        User.insert({ data: { created_at: '2020-12-30T12:15:45.000Z' } });

        const user = User.query().first();

        expect(user?.created_at).toBeInstanceOf(Date);
        expect(user?.created_at.toDateString()).toEqual('Thu Dec 31 2020');
        expect(User.getFields().created_at).toBeInstanceOf(DateType);
        expect((User.getFields().created_at as DateType).isNullable).toBe(false);
    });
});
