# Ember-x-editable

<a href="https://shipshape.io/"><img src="http://i.imgur.com/KVqNjgO.png" alt="Ship Shape" width="100" height="100"/></a>

**[ember-x-editable is built and maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting/)**.

[![npm version](https://badge.fury.io/js/ember-x-editable.svg)](https://badge.fury.io/js/ember-x-editable)
[![npm](https://img.shields.io/npm/dm/ember-x-editable.svg)]()
[![Ember Observer Score](http://emberobserver.com/badges/ember-x-editable.svg)](http://emberobserver.com/addons/ember-x-editable)
[![Build Status](https://travis-ci.org/shipshapecode/ember-x-editable.svg?branch=master)](https://travis-ci.org/shipshapecode/ember-x-editable)
[![Code Climate](https://codeclimate.com/github/shipshapecode/ember-x-editable/badges/gpa.svg)](https://codeclimate.com/github/shipshapecode/ember-x-editable)
[![Test Coverage](https://codeclimate.com/github/shipshapecode/ember-x-editable/badges/coverage.svg)](https://codeclimate.com/github/shipshapecode/ember-x-editable/coverage)

Ember-x-editable is inspired by x-editable. It does not have all the same features, and it possibly never will, but I needed an x-editable that played nicely with Ember, so I decided to write this. 
If you would like to add functionality, please feel free to submit a PR.

Currently, Bootstrap is bundled with this addon. Eventually, I'd like to just add a dependency on the ember bootstrap addon, or allow it to work without bootstrap. This addon also only works with HTMLBars and Ember 1.11+.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-x-editable
```

## Demo
[![Ember-x-editable demo](http://i.imgur.com/6vVQp6s.png)](http://shipshapecode.github.io/ember-x-editable/)
http://shipshapecode.github.io/ember-x-editable/

Usage
------------------------------------------------------------------------------

**NOTE**: This addon now uses contextual components, so if you were using it previously, and you update, you will need to fix things.

### Text Inputs
```hbs
{{#ember-x-editable
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
validator=textValidator
value='TestString' as |x|}}
  {{x.text
    cancelAction=(action 'cancelAction')
    saveAction=(action 'saveAction')
  }}
{{/ember-x-editable}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```validator``` (optional) a function reference to execute against the content string before saving
- ```value``` a string of text to display 

### Textarea
```hbs
{{#ember-x-editable
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
validator=textareaValidator
value='Textarea test value' as |x|}}
  {{x.textarea
    cancelAction=(action 'cancelAction')
    saveAction=(action 'saveAction')
  }}
{{/ember-x-editable}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```validator``` (optional) a function reference to execute against the content string before saving
- ```value``` a string of text to display 

### Dropdown (Select)
```hbs
{{#ember-x-editable
content=selectContent
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
validator=selectValidator
value=2 as |x|}}
  {{x.select
    cancelAction=(action "cancelAction")
    saveAction=(action "saveAction")
  }}
{{/ember-x-editable}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```content``` An array of objects of the format: ```[{value: 1, text: 'TestString}]``` 
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```validator``` (optional) a function reference to execute against the content string before saving
- ```value``` the 'value' of the object in the content array that should be selected

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
