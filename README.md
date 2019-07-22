# vuex-orm-decorators
Decorator Syntax for Vuex ORM for better type safety.

![NPM](https://img.shields.io/npm/l/vuex-orm-decorators.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-orm-decorators.svg) ![GitHub issues](https://img.shields.io/github/issues/scotley/vuex-orm-decorators.svg) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/scotley/vuex-orm-decorators.svg) ![](https://img.shields.io/badge/types-Typescript-blue.svg)

Simple Typescript Decorators to simplify vuex-orm integration in typescript projects.

Using the decorators allows better type safety in your projects, by allowing you to create conventional Typescript properties, and anotate them as fields.  Removes the 'magic string' aspect of vuex-orm.

This documentation isn't supposed to be a replacement for the vuex-orm documentation, if you are unfamiliar with the concepts the check out their documentation: https://vuex-orm.github.io/vuex-orm/guide/prologue/what-is-vuex-orm.html

##### Contribute

If you have improvements or contributions to make, I will happily check and merge in pull requests.


### Typescript

1. Set ```ExperimentalDecorators``` to true.
2. Set ```importHelpers: true```in ```tsconfig.json```.
3. Set ```emitHelpers: true``` in ```tsconfig.json``` (only required in typescript 2)

### Installation

```
npm install -D vuex-orm-decorators
```

This package targets es2015, if you need to target es5 then you will need to get VUE-CLI to transpile this package.

### Basic Usage

Out of the box a vuex-orm model is defined as:
```
import { Model } from '@vuex-orm/core'

class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(undefined),
      name: this.attr('')
    }
  }
}
```
The defined fields don't gain type checking by Typescript in this way because they are never defined as properties of the model class.  With this decorator library it allows you to write the same in the following way:

```
import { Model } from '@vuex-orm/core'
import { AttrField, StringField } from 'vuex-orm-decorators'


@OrmModel('users')
class User extends Model{

    @AttrField(undefined)
    public id!: number;

    @StringField()
    public name!: string;
}
```

### Setting a Primary Key

Rather than setting a primary key by setting the static property ```primaryKey``` with the magic string name of the property you want to be the primary key, you can annotate it with a decorator as follows:

```
import { Model } from '@vuex-orm/core'
import { AttrField, StringField } from 'vuex-orm-decorators'


@OrmModel('users')
class User extends Model{

    @PrimaryKey()
    @AttrField(undefined)
    public uuid!: number;

    @StringField()
    public name!: string;
}
```
### Generic Types

You can create the generic ```attr``` field type using the ```@AttrField``` decorator.

### Primative Types

Like the vuex-orm library, you can create primative fields using the following decorators:

1. ```@StringField```
2. ```@NumberField```
3. ```@BooleanField```


### Creating Relationships

You can create all relationships defined in the vuex-orm library:

1. ```@HasManyField(related: typeof Model | string, foreignKey: string, localKey?: string)```
2. ```@HasOneField(related: typeof Model | string, foreignKey: string, localKey?: string)```
3. ```@BelongsToField(parent: typeof Model | string, foreignKey: string, ownerKey?: string)```
4. ```@HasManyByField(parent: typeof Model | string, foreignKey: string, ownerKey?: string)```
5. ```@HasManyThroughField(related: typeof Model | string, through: typeof Model | string, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string)```
6. ```@BelongsToManyField(related: typeof Model | string, pivot: typeof Model | string, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string)```
7. ```@MorphToField(id: string, type: string)```
8. ```@MorphOneField(related: typeof Model | string, id: string, type: string, localKey?: string)```
9. ```@MorphManyField(related: typeof Model | string, id: string, type: string, localKey?: string)```
10. ```@MorphToManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string)```
11. ```@MorphedByManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string)```
