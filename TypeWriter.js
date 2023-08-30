class TypeWriter {
    constructor({typeSpeed, words, element, wait, cursor, type}) {
        try {
            if(!Array.isArray(words)) throw new Error('words should be an array');
            if(!element) throw new Error('element not set can be a selector or DOM Element');
            element = typeof element === 'string' ? document.querySelector(element) : element;
            if(!element) throw new Error('element not found');
            if(typeSpeed && isNaN(typeSpeed)) throw new Error('typeSpeed should be a number');
            if(wait && isNaN(wait)) throw new Error('wait should be a number');
        } catch (error) {
            console.error(error);
            return;
        }


        this.words = words; // array of words
        this.element = element; // span element in document
        this.typeSpeed = typeSpeed || 40; // typing speed
        this.wait = wait || 2000; // interval between words
        this.wordIndex = 0; // start at first word
        this.isDeleting = false; // track if word is deleted
        this.typedWord = '';

        this.cursor = cursor || {}; // cursor options
       
        if(type){
            this.createCursor(); // creates cursor element
            this.type(); // typing method
        }
    }

    createCursor() {
        // console.log(this);
        const cursorElem = document.createElement('span');
        cursorElem.id = this?.cursor.id || 'typewriter-cursor';
        cursorElem.style.display = 'inline-block';
        // cursorElem.style.height = this.cursor.height || `${this.element.offsetHeight}px`;
        // cursorElem.style.height = this?.cursor.height || '1ch';
        cursorElem.style.height = this?.cursor.height || window.getComputedStyle(this.element).getPropertyValue('font-size');
        cursorElem.style.width = this?.cursor.width || '1rem';
        cursorElem.style.marginLeft = this?.cursor.leftGap || '.1rem';
        cursorElem.style.marginRight = this?.cursor.rightGap || '.1rem';
        cursorElem.style.backgroundColor = this?.cursor.color || '#000';

        this.cursorElem = cursorElem;
        this.element.after(cursorElem);

        this.cursor.keyFrames = document.createElement('style');
        this.cursor.keyFrames.innerHTML = `
        @keyframes cursor-blink {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        #${this?.cursor.id || 'typewriter-cursor'} {
            animation: cursor-blink ${this.cursor.blinkRate || 1000}ms infinite
            ;
        }`;
    }

    type() {
        if(!this.cursorElem) this.createCursor();
        let typeSpeed = this.typeSpeed; // variable typing speed

        this.wordIndex %= this.words.length; // increment wordIndex
        let currentWord = this.words[this.wordIndex]; // current word

        if(this.isDeleting) {
        if(this.cursorElem.contains(this.cursor.keyFrames)) this.cursorElem.removeChild(this.cursor.keyFrames); // to remove blink animation when deleting
            this.typedWord = currentWord.substring(0, this.typedWord.length - 1);
        } else 
            this.typedWord = currentWord.substring(0, this.typedWord.length + 1);

        
        this.element.innerHTML = `${this.typedWord}`;


        if(this.isDeleting) typeSpeed /= 2; // increase type speed when deleting

        // word finished
        if(!this.isDeleting && this.typedWord == currentWord) {
            typeSpeed = this.wait;
            this.isDeleting = true;
            this.cursorElem.appendChild(this.cursor.keyFrames);
        } else if(this.isDeleting && this.typedWord == '') { // deleting finished
            this.wordIndex++;
            this.isDeleting = false;
            // this.cursorElem.removeChild(this.cursor.keyFrames);
            // typeSpeed = this.wait;
        }

        setTimeout(_ => { this.type(); }, typeSpeed);
    }

}

const typeWriter = new TypeWriter({
     typeSpeed: 40, 
     words: ['Web Development', 'Machine Learning', 'Data Science'], 
     element: '#typewriter',
     wait: 1500,
     cursor: {color: '#777', width: '.2rem', id: 'typewriter-cursor'}
});

export { typeWriter, TypeWriter };