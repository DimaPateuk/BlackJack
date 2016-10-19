const button = document.querySelector('button');
console.log(button.onclick);
button.onclick = () => {
	window.close();
}