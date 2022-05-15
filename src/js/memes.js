import './general';

const deviceWidth = window.innerWidth;

class Memes {
    constructor() {
        console.log('Inside Memes class');

        this.$canvas = document.querySelector('#imgCanvas');
        this.$topTextInput = document.querySelector('#topText');
        this.$bottomTextInput = document.querySelector('#bottomText');
        this.$imageInput = document.querySelector('#image');
        this.$downloadButton = document.querySelector('#downloadMeme');

        this.createCanvas();
    }

    createCanvas() {
        let canvasHeight = Math.min(480, deviceWidth - 30);
        let canvasWidth = Math.min(640, deviceWidth - 30);
        this.$canvas.height = canvasHeight;
        this.$canvas.width = canvasWidth;
    }
}

new Memes();