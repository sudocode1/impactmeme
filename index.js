let textSize = '20';
let canv = {x: 200, y: 200};

if (process.argv.includes('--larger')) { textSize = '40'; canv = {x: 400, y: 400} };
if (process.argv.includes('--largercanvas')) { canv = {x: 400, y: 400} };
if (process.argv.includes('--largertext')) { textSize = '40'; };

if (process.argv[2] === ('--setvals')) {
    textSize = parseInt(process.argv[3]);
    canv = { x: parseInt(process.argv[4]), y: parseInt(process.argv[5]) };
} 

const { createCanvas, loadImage, Image } = require('canvas');
const prompt = require('prompt-sync')();
const canvas = createCanvas(canv.x, canv.y);
const ctx = canvas.getContext('2d');

let topText = prompt('Top Text:');
let bottomText = prompt('Bottom Text: ');
let imgRequested = prompt('Image Path: ');
let textColor = prompt('Text Color: ')

if (!topText || !bottomText || !imgRequested || !textColor) {
    console.log('You cannot leave arguments empty!')
    process.exit(0)
}

const image = require('fs').readFileSync(imgRequested);
const img = new Image();
img.onload = () => ctx.drawImage(img, 0, 0, canv.x, canv.y);
img.onerror = err => { throw err };
img.src = image;


ctx.font = textSize + 'px Impact';
ctx.fillStyle = textColor;
ctx.fillText(topText, canvas.width / 2 - ctx.measureText(topText).width / 2, 25 * (canv.x / 200));
ctx.fillText(bottomText, canvas.width / 2 - ctx.measureText(bottomText).width / 2, 195 * (canv.y / 200));
require('fs').writeFileSync('img.png', canvas.toBuffer())

console.log('Image saved to: ' + __dirname + '\\img.png')