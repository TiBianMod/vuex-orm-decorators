# vuex-orm-decorators
Decorator Syntax for Vuex ORM for better type safety and a better experience.

![NPM](https://img.shields.io/npm/l/vuex-orm-decorators.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-orm-decorators.svg) ![GitHub issues](https://img.shields.io/github/issues/scotley/vuex-orm-decorators.svg) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/scotley/vuex-orm-decorators.svg) ![](https://img.shields.io/badge/types-Typescript-blue.svg)

Typescript Decorators to simplify vuex-orm integration in typescript projects.  If you are using the [vue-module-decorators](https://github.com/championswimmer/vuex-module-decorators) or [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) packages then this will allow you to use the vuex-orm plugin in the same way.

Using the decorators allows better type safety in your projects by allowing you to create conventional Typescript properties, and annotate them as fields for a better experience.  Intellisense in Visual Studio Code just works with the annotations, where it doesn't in the vanilla plugin without boilerplate.

This documentation isn't supposed to be a replacement for the vuex-orm documentation, if you are unfamiliar with the concepts of vuex-orm then check out their documentation: https://vuex-orm.github.io/vuex-orm/guide/prologue/what-is-vuex-orm.html.  I have linked to relevant guide pages in their documentation throughout this documentation.

##### Contribute

If you have improvements or contributions to make, I will happily check and merge in pull requests.

&nbsp;
# Setup
### Installation

```
npm install -D vuex-orm-decorators
```

This package targets es2015, if you need to target es5 then you will need to get VUE-CLI to transpile this package.

### Auto Model Registration

Models can automatically register themselves in the database.  To do so, instead of installing the vuex-orm database, install the wrapper provided by this library as follows:
```typescript
import Vue from 'vue';
import Vuex from 'vuex';
import { ORMDatabase } from 'vuex-orm-decorators'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {},
    plugins: [ORMDatabase.install()],
});
```
When you use a model it registers itself in the database automatically if it has not already.
If you do not want auto registered models, simply install the vanilla database and register them as you would normally.

### Typescript

1. Set ```ExperimentalDecorators``` to true.
2. Set ```importHelpers: true```in ```tsconfig.json```.
3. Set ```emitHelpers: true``` in ```tsconfig.json``` (only required in typescript 2)

### Nuxt.js
As Nuxt.js uses cjs modules you need to transpile the library. Add the following to the nuxt.config.js
```javascript
build: {
  transpile: [
    'vuex-orm-decorators'
  ]
}
```
If you want to register models automatically do not install vuex-orm database, just export plugin from store/index.js

```javascript
import { ORMDatabase } from 'vuex-orm-decorators'
export const plugins = [ORMDatabase.install()]
```
&nbsp;
# Usage
### Basic Usage

Out of the box a vuex-orm model is defined as:
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
The defined fields don't gain type checking by Typescript in this way because they are never defined as properties of the model class.  With this decorator library though it allows you to write the same in the following way to achieve type checking on your queried models:

```typescript
import { Model } from '@vuex-orm/core'
import { AttrField, OrmModel, StringField } from 'vuex-orm-decorators'

@OrmModel('users')
class User extends Model {

    @AttrField()
    public id!: number;

    @StringField()
    public name!: string;

}
```

### Getters

To create a fully reactive getter, simply add your getters to the model class:

```typescript
import { Model } from '@vuex-orm/core';
import { AttrField, OrmModel, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @AttrField()
    public id!: number;

    @StringField()
    public name!: string;

    public get lowerName() {
        return this.name.toLowerCase();
    }

}
```

### Setting a Primary Key

Rather than setting a [primary key](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#primary-key) by setting the static property ```primaryKey``` with the magic string name of the property you want to be the primary key, you can simply annotate the property with the ```@PrimaryKey``` decorator as follows:

```typescript
import { Model } from '@vuex-orm/core';
import { AttrField, OrmModel, StringField } from 'vuex-orm-decorators';

@OrmModel('users')
class User extends Model {

    @PrimaryKey()
    @AttrField()
    public uuid!: number;

    @StringField()
    public name!: string;

}
```
In this example the property ```uuid``` replaces the default ```id``` property as the primary key.

### Single Table Inheritance

If your model extends a base model, then STI inheritance needs to be used. The base entity name needs to be provided as the second argument to the ORMModel decorator and as third argument provide the discriminator fields:

> Person : Base Entity

```typescript
@OrmModel('persons')
class Person extends Model {

    @AttrField()
    public id!: string;

    @StringField()
    public name!: string;

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

> You may define a `static typeKey` on the base entity of your hierarchy if you want to change the default discriminator field name.

```typescript
@OrmModel('persons')
class Person extends Model {

    /**
     * The discriminator key to be used for the model when inheritance is used.
     */
    static typeKey = 'PERSON';

    @AttrField()
    public id!: string;

    @StringField()
    public name!: string;

}
```

### Generic Types

You can create the generic [attr field](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#generic-types) type using the ```@AttrField``` decorator.

### Uid

To create [uid field](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#uid-type) which use the ```@UidField``` decorator.

### ~~Auto Increment~~ (deprecated)

~~To create auto [increment fields](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#auto-increment-type) which use the ```@Increment``` decorator.~~

Use `UidField` decorator instead.


### Primitive Types

Like the vuex-orm library, you can create primitive fields using the following decorators:

1. ```@StringField``` creates a [string](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#primitive-types) field
2. ```@NumberField``` creates a [number](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#primitive-types) field
3. ```@BooleanField``` creates a [boolean](https://vuex-orm.github.io/vuex-orm/guide/model/defining-models.html#primitive-types) field

### Creating Relationships

You can create all relationships defined in the vuex-orm library.  All the relationship decorators take the exact same arguments as the vanilla vuex-orm library static functions.

1. ```@HasManyField``` creates a [HasMany](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-many) relationship field
2. ```@HasOneField``` creates a [HasOne](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-one) relationship field
3. ```@BelongsToField``` creates an inverse [HasOne](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-one-inverse) relationship field
4. ```@HasManyByField``` creates a [HasManyBy](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#has-many-by) relationship field
5. ```@HasManyThroughField``` creates a [HasManyThrough](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#has-many-through) relationship field
6. ```@BelongsToManyField``` creates a [BelongsToMany](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#many-to-many) relationship field
7. ```@MorphToField``` creates a [MorphTo](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-one-polymorphic) relationship field
8. ```@MorphOneField``` creates a [MorphOne](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-one-polymorphic) relationship field
9. ```@MorphManyField``` creates a [MorphMany](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#one-to-one-polymorphic) relationship field
10. ```@MorphToManyField``` creates a [MorphToMany](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#many-to-many-polymorphic) relationship field
11. ```@MorphedByManyField``` creates a [MorphedByMany](https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#defining-the-inverse-of-the-relationship-2) relationship field
