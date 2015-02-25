# Ember-x-editable-addon

Ember-x-editable-addon is inspired by x-editable. It does not have all the same features, and it possibly never will, but I needed an x-editable that played nicely with Ember, so I decided to write this. If you would like to add functionality, please feel free to submit a PR.

Currently, Bootstrap is bundled with this addon. Eventually, I'd like to just add a dependency on the ember bootstrap addon, or allow it to work without bootstrap. This addon also only works with HTMLBars and Ember 1.11+.

## Usage
### Text Inputs
```hbs
{{ember-x-editable
cancelAction='cancelAction'
content='TestString'
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
saveAction='saveAction'
type='text'
validator=textValidator
}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```content``` a string of text to display 
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```type``` (required) a string representing the type of the editable. For a text input, it will be 'text'
- ```validator``` (optional) a function reference to execute against the content string before saving

### Dropdown (Select)
```hbs
{{ember-x-editable
cancelAction='cancelAction'
content=selectContent
fontFamilyConfig=fontFamilyConfig
isFieldEditing=isFieldEditing
saveAction='saveAction'
selectedValue=selectedValue
type='select'
validator=selectValidator
}}
```
- ```cancelAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the cancel x.
- ```content``` An array of objects of the format: ```[{value: 1, text: 'TestString}]``` 
- ```fontFamilyConfig``` an array of custom font families that will be passed to the font loader and ensured to be loaded and used for calculating the width of the text in pixels
- ```isFieldEditing``` a boolean variable that allows you to access the isEditing value outside of the component
- ```saveAction``` (optional) a string representing the action on the controller that you want to execute whenever the user clicks the save check mark.
- ```selectedValue``` the 'value' of the object in the content array that should be selected
- ```type``` (required) a string representing the type of the editable. For a text input, it will be 'text'
- ```validator``` (optional) a function reference to execute against the content string before saving

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
