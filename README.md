# Ember-x-editable

<a href="http://shipshape.io/"><img src="http://i.imgur.com/EVjM7AV.png" width="100" height="100"/></a>

[![Join the chat at https://gitter.im/shipshapecode/ember-x-editable](https://badges.gitter.im/shipshapecode/ember-x-editable.svg)](https://gitter.im/shipshapecode/ember-x-editable?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm version](https://badge.fury.io/js/ember-x-editable.svg)](https://badge.fury.io/js/ember-x-editable)
[![npm](https://img.shields.io/npm/dm/ember-x-editable.svg)]()
[![Ember Observer Score](http://emberobserver.com/badges/ember-x-editable.svg)](http://emberobserver.com/addons/ember-x-editable)
[![Build Status](https://travis-ci.org/shipshapecode/ember-x-editable.svg?branch=master)](https://travis-ci.org/shipshapecode/ember-x-editable)
[![Code Climate](https://codeclimate.com/github/shipshapecode/ember-x-editable/badges/gpa.svg)](https://codeclimate.com/github/shipshapecode/ember-x-editable)

Ember-x-editable is inspired by x-editable. It does not have all the same features, and it possibly never will, but I needed an x-editable that played nicely with Ember, so I decided to write this. If you would like to add functionality, please feel free to submit a PR.

Currently, Bootstrap is bundled with this addon. Eventually, I'd like to just add a dependency on the ember bootstrap addon, or allow it to work without bootstrap. This addon also only works with HTMLBars and Ember 1.11+.

## Demo
[![Ember-x-editable demo](http://i.imgur.com/6vVQp6s.png)](http://shipshapecode.github.io/ember-x-editable/)
http://shipshapecode.github.io/ember-x-editable/

## Usage
### Text Inputs
```hbs
{{ember-x-editable
cancelAction='cancelAction'
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
saveAction='saveAction'
type='text'
validator=textValidator
value='TestString'}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```type``` (required) a string representing the type of the editable. For a text input, it will be 'text'
- ```validator``` (optional) a function reference to execute against the content string before saving
- ```value``` a string of text to display 

### Dropdown (Select)
```hbs
{{ember-x-editable
cancelAction='cancelAction'
content=selectContent
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
saveAction='saveAction'
type='select'
validator=selectValidator
value=2}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```content``` An array of objects of the format: ```[{value: 1, text: 'TestString}]``` 
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```type``` (required) a string representing the type of the editable. For a text input, it will be 'text'
- ```validator``` (optional) a function reference to execute against the content string before saving
- ```value``` the 'value' of the object in the content array that should be selected
