# vuex-orm-decorators

Decorator Syntax for Vuex ORM `v0.36` for better type safety and a better experience.

![NPM](https://img.shields.io/npm/l/vuex-orm-decorators.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-orm-decorators.svg) ![GitHub issues](https://img.shields.io/github/issues/TiBianMod/vuex-orm-decorators.svg) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/TiBianMod/vuex-orm-decorators.svg) ![](https://img.shields.io/badge/types-Typescript-blue.svg)

Typescript Decorators to simplify Vuex ORM integration in typescript projects. If you are using
the [vue-module-decorators](https://github.com/championswimmer/vuex-module-decorators)
or [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) packages then this will allow you to
use the Vuex ORM plugin in the same way.

Using the decorators allows better type safety in your projects by allowing you to create conventional Typescript
properties, and annotate them as fields for a better experience. Intellisense in Visual Studio Code just works with the
annotations, where it doesn't in the vanilla plugin without boilerplate.

This documentation isn't supposed to be a replacement for the Vuex ORM documentation, if you are unfamiliar with the
concepts of Vuex ORM then check out their [documentation](https://vuex-orm.org/guide/prologue/what-is-vuex-orm.html). I
have linked to relevant guide pages in their documentation throughout this documentation.

##### Contribute

If you have improvements or contributions to make, I will happily check and merge in pull requests.

# Setup

### Installation

First install the version of vuex you want to use, Vuex ORM Decorators works with vuex 3 and vuex 4.

You can install Vuex ORM Decorators via NPM or Yarn

### NPM

```console
npm install @vuex-orm/core@^0.36
npm install vuex-orm-decorators -D
```

### pnpm

```console
pnpm add @vuex-orm/core@^0.36
pnpm add vuex-orm-decorators -D
```

### Yarn

```console
yarn add @vuex-orm/core@^0.36
yarn add vuex-orm-decorators -D
```

This package targets es2015, if you need to target es5 then you will need to get VUE-CLI to transpile this package.

### Auto Model Registration

Models can automatically register themselves in the database. To do so, instead of installing
the [Vuex ORM Database](https://vuex-orm.org/guide/prologue/getting-started.html#register-models-to-vuex), install the
wrapper provided by this library as follows:

### vue 2 with vuex v3

```typescript
import Vue from 'vue';
import Vuex from 'vuex';
import { ORMDatabase } from 'vuex-orm-decorators'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        ORMDatabase.install({ namespace: 'Models' })
    ]
});
```

### vue 3 with vuex v4

```typescript
import { createStore } from 'vuex';
import { ORMDatabase } from 'vuex-orm-decorators';

export default createStore({
    plugins: [
        ORMDatabase.install({ namespace: 'Models' })
    ]
});
```

When you use a model it registers itself in the database automatically if it has not already. If you do not want auto
registered models, simply install the vanilla database and register them as you would normally.

### Typescript

1. Set `ExperimentalDecorators` to true.
2. Set `importHelpers: true` in `tsconfig.json`.
3. Set `emitHelpers: true` in `tsconfig.json` (only required in typescript 2)

### Nuxt.js

Add the following to the nuxt.config.js to transpile the library

```javascript
{
    build: {
        transpile: ['vuex-orm-decorators']
    }
}
```

If you want to register models automatically do not install Vuex ORM Database, just export plugin from store/index.js

```javascript
import { ORMDatabase } from 'vuex-orm-decorators'

export const plugins = [ORMDatabase.install({ namespace: 'Models' })]
```

# Usage

### Basic Usage

Out of the box a Vuex ORM Model is defined as:

```typescript
import { Model } from '@vuex-orm/core';

class User extends Model {

    static entity = 'users';

    static fields() {
        return {
            id: this.attr(undefined),
            name: this.attr('')
        };
    }

}
```

The defined fields don't gain type checking by Typescript in this way because they are never defined as properties of
the model class. With this decorator library though it allows you to write the same in the following way to achieve type
checking on your queried models:

```typescript
import { Model } from '@vuex-orm/core';
import { NumberField, OrmModel, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @NumberField() id!: number;

    @StringField() name!: string;

}
```

### Getters

To create a fully reactive getter/computed, simply add your getters to the model class:

```typescript
import { Model } from '@vuex-orm/core';
import { NumberField, OrmModel, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @NumberField() id!: number;

    @StringField() name!: string;

    get lowerName() {
        return this.name.toLowerCase();
    }

}
```

### Mutators

You can pass a closure to the 2nd argument of `@AttrField`, `@StringField`, `@NumberField`, `@DateField`,
and `@BooleanField` decorator. The closure takes the corresponding value as an argument, and you can modify the value
however you want:

```typescript
import { Model } from '@vuex-orm/core';
import { OrmModel, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @StringField(null, (name) => {
        return name.toLowerCase();
    }) name!: string;

}
```

### Default Values

If undefined the default values for the `@AttrField`, `@StringField`, `@NumberField`, `@DateField`, and `@BooleanField`
decorator will be:

```typescript
@OrmModel('users')
class User extends Model {

    // Default value: ''
    @AttrField() email!: string;

    // Default value: ''
    @StringField() name!: string;

    // Default value: 0
    @NumberField() age!: number;

    // Default value: false
    @BooleanField() active!: boolean;

    // Default value: null
    // if can parse the date, then Date instance will be returned
    @DateField() created_at!: Date;

}
```

If you want to set the field as `nullable`, pass a `null` value as default value, this will also set the `isNullable`
Type to `true`:

```typescript
@OrmModel('users')
class User extends Model {

    // Default value: null, isNullable: true
    @AttrField(null) email!: string;

    // Default value: null, isNullable: true
    @StringField(null) name!: string;

    // Default value: null, isNullable: true
    @NumberField(null) age!: number;

    // Default value: null, isNullable: true
    @BooleanField(null) active!: boolean;

    // Default value: null, isNullable: true
    @DateField(null) deleted_at!: Date;

}
```

### Setting a Primary Key

Rather than setting a [primary key](https://vuex-orm.org/guide/model/defining-models.html#primary-key) by setting the
static property `primaryKey` with the magic string name of the property you want to be the primary key, you can simply
annotate the property with the `@PrimaryKey` decorator as follows:

> No need using `@PrimaryKey` decorator on property `id`. Property `id` is by default the `primaryKey`.

```typescript
import { Model } from '@vuex-orm/core';
import { NumberField, OrmModel, PrimaryKey, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @PrimaryKey()
    @NumberField() uuid!: number;

    @StringField() name!: string;

}
```

In this example the property `uuid` replaces the default `id` property as the primary key.

You can also define a composite primary key by annotating several properties with the `@PrimaryKey` decorator as follows:

```typescript
import { Model } from '@vuex-orm/core';
import { OrmModel, PrimaryKey, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @PrimaryKey()
    @StringField() public id!: string;
    
    @PrimaryKey()
    @StringField() public voteId!: string;

}
```

### Single Table Inheritance

If your model extends a base model, then STI inheritance needs to be used. The base entity name needs to be provided as
the second argument to the ORMModel decorator and as third argument provide the discriminator fields:

> Person : Base Entity

```typescript
@OrmModel('persons')
class Person extends Model {

    @NumberField() id!: number;

    @StringField() name!: string;

}
```

> Teenager extends Person

```typescript
@OrmModel('teenagers', 'persons', {
    PERSON: Person,
    TEENAGER: Teenager
})
class Teenager extends Person {

    @StringField() school!: string;

}
```

> Adult extends Person

```typescript
@OrmModel('adults', 'persons', {
    PERSON: Person,
    ADULT: Adult
})
class Adult extends Person {

    @StringField() job!: string;

}
```

> Now, you can create mixed types of records at once.

```typescript
Person.insert({
    data: [
        { type: 'PERSON', id: 1, name: 'John Doe' },
        { type: 'TEENAGER', id: 2, name: 'Jane Doe', school: '22nd Best School' },
        { type: 'ADULT', id: 3, name: 'Jane Roe', job: 'Software Engineer' }
    ]
});
```

##### Discriminator Field Override

> You may define a `static typeKey` on the base entity of your hierarchy if you want to change the default discriminator field name:

```typescript
@OrmModel('persons')
class Person extends Model {

    /**
     * The discriminator key to be used for the model when inheritance is used.
     */
    static typeKey = 'PERSON';

    @NumberField() id!: number;

    @StringField() name!: string;

}
```

# Decorators

* `@PrimaryKey` sets field as [Primary Key](https://vuex-orm.org/guide/model/defining-models.html#primary-key) to be
  used for the model.
* `@UidField` creates a [UID Type](https://vuex-orm.org/guide/model/defining-models.html#uid-type) field
* `@AttrField` creates a [Generic Type](https://vuex-orm.org/guide/model/defining-models.html#generic-type) field
* `@DateField` creates a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  instance field

### Primitive Types

Like the Vuex ORM library, you can create primitive fields using the following decorators:

* `@StringField` creates a [string](https://vuex-orm.org/guide/model/defining-models.html#primitive-types) field
* `@NumberField` creates a [number](https://vuex-orm.org/guide/model/defining-models.html#primitive-types) field
* `@BooleanField` creates a [boolean](https://vuex-orm.org/guide/model/defining-models.html#primitive-types) field

### Creating Relationships

You can create all relationships defined in the Vuex ORM library. All the relationship decorators take the exact same
arguments as the vanilla Vuex ORM library static functions.

* `@HasManyField` creates a [HasMany](https://vuex-orm.org/guide/model/relationships.html#one-to-many) relationship
  field

* `@HasOneField` creates a [HasOne](https://vuex-orm.org/guide/model/relationships.html#one-to-one) relationship field

* `@BelongsToField` creates a [BelongsTo](https://vuex-orm.org/guide/model/relationships.html#one-to-one-inverse)
  relationship field

* `@HasManyByField` creates a [HasManyBy](https://vuex-orm.org/guide/model/relationships.html#has-many-by) relationship
  field

* `@HasManyThroughField` creates
  a [HasManyThrough](https://vuex-orm.org/guide/model/relationships.html#has-many-through) relationship field

* `@BelongsToManyField` creates a [BelongsToMany](https://vuex-orm.org/guide/model/relationships.html#many-to-many)
  relationship field

* `@MorphOneField` creates a [MorphOne](https://vuex-orm.org/guide/model/relationships.html#one-to-one-polymorphic)
  relationship field

* `@MorphToField` creates a [MorphTo](https://vuex-orm.org/guide/model/relationships.html#one-to-one-polymorphic)
  relationship field

* `@MorphManyField` creates a [MorphMany](https://vuex-orm.org/guide/model/relationships.html#one-to-many-polymorphic)
  relationship field

* `@MorphToManyField` creates
  a [MorphToMany](https://vuex-orm.org/guide/model/relationships.html#many-to-many-polymorphic) relationship field

* `@MorphedByManyField` creates
  a [MorphedByMany](https://vuex-orm.org/guide/model/relationships.html#defining-the-inverse-of-the-relationship-2)
  relationship field

## License

Vuex ORM Decorators is open-sourced software licensed under the [MIT License](./LICENSE).
