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
		inputNodes.forEach(element => element.addEventListener('change', this.createMeme.bind(this)));
		this.$downloadButton.addEventListener('click', this.downloadMeme.bind(this));
	}

	createCanvas() {
		let canvasHeight = Math.min(480, deviceWidth - 30);
		let canvasWidth = Math.min(640, deviceWidth - 30);
		this.$canvas.height = canvasHeight;
		this.$canvas.width = canvasWidth;
	}

	createMeme() {
		let context = this.$canvas.getContext('2d');
		console.log(`canvas context ${context}`);
		if (this.$imageInput.files && this.$imageInput.files[0]) {
			let reader = new FileReader();

			reader.onload = () => {
				let image = new Image();
				image.onload = () => {
					this.$canvas.height = image.height;
					this.$canvas.width = image.width;

					context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
					context.drawImage(image, 0, 0);

					let fontSize = ((this.$canvas.width + this.$canvas.height) / 2) * 4 / 100;
					context.font = `${fontSize}pt sans-serif`;
					context.textAlign = 'center';
					context.textBaseline = 'top';

					// for stroke text
					context.lineWidth = fontSize / 5;
					context.strokeStyle = 'black';

					// for fill text
					context.fillStyle = 'white';
					context.lineJoin = 'round';

					const topText = this.$topTextInput.value.toUpperCase();
					const bottomText = this.$bottomTextInput.value.toUpperCase();

					// Top Text
					context.strokeText(topText, this.$canvas.width / 2, this.$canvas.height * (5 / 100));
					context.fillText(topText, this.$canvas.width / 2, this.$canvas.height * (5 / 100));

					// Bottom Text
					context.strokeText(bottomText, this.$canvas.width / 2, this.$canvas.height * (90 / 100));
					context.fillText(bottomText, this.$canvas.width / 2, this.$canvas.height * (90 / 100));

					this.resizeCanvas(this.$canvas.height, this.$canvas.width)
				}
				image.src = reader.result;

			};

			reader.readAsDataURL(this.$imageInput.files[0]);
		}
	}

	downloadMeme() {
		if (!this.$imageInput.files[0]) {
			this.$imageInput.parentElement.classList.add('has-error');
			return;
		}
		if (this.$bottomTextInput.value === '') {
			this.$imageInput.parentElement.classList.remove('has-error');
			this.$bottomTextInput.parentElement.classList.add('has-error');
			return;
		}

		this.$imageInput.parentElement.classList.remove('has-error');
		this.$bottomTextInput.parentElement.classList.remove('has-error');

		const imageSource = this.$canvas.toDataURL('image/jpg');
		let att = document.createAttribute('href');
		att.value = imageSource.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
		this.$downloadButton.setAttributeNode(att);
	}

	resizeCanvas(canvasHeight, canvasWidth) {
		let height = canvasHeight;
		let width = canvasWidth;
		this.$canvas.style.height = `${height}px`;
		this.$canvas.style.width = `${width}px`;

		const minSize = 1000; 
		while (height > Math.min(minSize, deviceWidth - 30) && width > Math.min(minSize, deviceWidth - 30)) {
			height /= 2;
			width /= 2;
			this.$canvas.style.height = `${height}px`;
			this.$canvas.style.width = `${width}px`;
		}
	}
}

new Memes();