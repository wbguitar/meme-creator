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

		this.addEventListeners();

		this.createCanvas();
	}

	addEventListeners() {
		this.createMeme = this.createMeme.bind(this);
		let inputNodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];
		// inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
		inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
	}

	createCanvas() {
		let canvasHeight = Math.min(480, deviceWidth - 30);
		let canvasWidth = Math.min(640, deviceWidth - 30);
		this.$canvas.height = canvasHeight;
		this.$canvas.width = canvasWidth;
	}

	createMeme() {
		let context = this.$canvas.getContext('2d');
		if (this.$imageInput.files && this.$imageInput.files[0]) {
			let reader = new FileReader();

			reader.onload = () => {
				let image = new Image();
				image.onload = () => {
					this.$canvas.height = image.height;
					this.$canvas.width = image.width;

					context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
					context.drawImage(image, 0, 0);


					let fontsize = ((this.$canvas.height + this.$canvas.width) / 2.0) * 4.0 / 100.0;
					context.font = `${fontsize}pt sans-serif`;
					context.textAlign = 'center';
					context.textBaseLine = 'top';
				}
				image.src = reader.result;

			};

			reader.readAsDataURL(this.$imageInput.files[0]);
		}
	}
}

new Memes();