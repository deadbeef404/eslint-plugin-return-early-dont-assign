# eslint-plugin-return-early-dont-assign

Avoid assignment when you could just return.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-return-early-dont-assign`:

```
$ npm install eslint-plugin-return-early-dont-assign --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-return-early-dont-assign` globally.

## Usage

Add `return-early-dont-assign` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "return-early-dont-assign"
    ]
}
```

## Supported Rules

* return-early-dont-assign

Check [docs](docs/rules/return-early-dont-assign.md) for synopsis.


## Special shoutout

This is my first ESLint plugin/rule and the following links helped make it happen:

* https://astexplorer.net/
* https://eslint.org/docs/developer-guide/working-with-rules
* https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803
* https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f
