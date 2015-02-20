# Ember-x-editable-addon

Ember-x-editable-addon is inspired by x-editable. It does not have all the same features, and it possibly never will, but I needed an x-editable that played nicely with Ember, so I decided to write this. If you would like to add functionality, please feel free to submit a PR.

## Usage
### Text Inputs
```hbs
{{ember-x-editable
cancelAction='cancelAction'
content='TestString'
saveAction='saveAction'
type='text'
validator=textValidator
}}
```

### Dropdown (Select)
```hbs
{{ember-x-editable
cancelAction='cancelAction'
content=selectContent
saveAction='saveAction'
selectedValue=2
type='select'
validator=selectValidator
}}
```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
