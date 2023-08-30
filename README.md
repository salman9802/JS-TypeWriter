
# TypeWriter: Typing Animation using JS

To add beautiful typing animations on websites.


## Documentation

You can import either the TypeWriter class or the pre-defined typeWriter Object
```javascript
import { typeWriter, TypeWriter } from "./js/TypeWriter.js";
```

### **options**

- **typeSpeed**: This is the typing speed in milliseconds. Defaults to 40.
- **words**: Array of words for animation.
- **element**: DOMElement or its selector string.
- **wait**: Time to wait between words in milliseconds. Defaults to 2000.
- **cursor**: A cursor object for defining the cursor. Following are the options for `cursor`:
    - **height**: Height of cursor. Defaults to height of `element`.
    - **width**: Height of cursor. Defaults to width of `element`.
    - **leftGap**: Value for `margin-left` for cursor. Defaults to `.1rem`
    - **rightGap**: Value for `margin-right` for cursor. Defaults to `.1rem`
    - **color**: Color of cursor. Defaults to `#000`.
    - **blinkRate**: Interval for blinking of cursor in milliseconds. Defaults to `1000`.
- **type**: Set to true to start typing.

## Usage/Examples

```javascript
import { typeWriter, TypeWriter } from "./js/TypeWriter.js";
const wordElem = document.querySelector('#typewriter');

// 1st Method: Directly using predefined object
typeWriter.words = ['Machine Learning', 'Data Science'];
typeWriter.wait = 2000;
typeWriter.element = wordElem;
typeWriter.cursor = { width: '.2rem', color: '#fff'}
typeWriter.type();

// 2nd Method: Creating an Object using class
new TypeWriter({
    typeSpeed: 40,
    words: ['Web Development', 'Machine Learning', 'Data Science'],
    element: '#typewriter2',
    wait: 1500,
    cursor: {color: '#777', width: '.2rem'},
    type: true
});
```


## Authors

- [@salman9802](https://www.github.com/salman9802)

