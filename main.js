const input = document.getElementById('input')
const content = document.querySelector('.content')
const imageNodes = []

document.addEventListener('DOMContentLoaded', function () {
	loadImg()
})

input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') loadImg()
})

function loadImg() {
	event.preventDefault()
	const url =
		'https://api.unsplash.com/photos/random/?query=' +
		input.value +
		'&count=50&client_id=rnJocnRoW2yp7l8IjAExsm1Jd6x0XdSEINAp4aPj5fE'

	fetch(url)
		.then(response => {
			if (response.ok) return response.json()
			else alert('Failed to load pictures')
		})
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				imageNodes.push(document.createElement('div'))
				imageNodes[imageNodes.length - 1].className = 'img'
				imageNodes[
					imageNodes.length - 1
				].style.backgroundImage = `url(${data[i].urls.regular})`
				const downloadButton = document.createElement('button')
				downloadButton.className = 'download-button'
				const downloadIcon = document.createElement('img')
				downloadIcon.src = 'public/images/pin/download.svg'
				downloadButton.appendChild(downloadIcon)
				imageNodes[imageNodes.length - 1].appendChild(downloadButton)
				imageNodes[imageNodes.length - 1].addEventListener(
					'mouseenter',
					function () {
						downloadButton.style.display = 'block'
					}
				)
				imageNodes[imageNodes.length - 1].addEventListener(
					'mouseleave',
					function () {
						downloadButton.style.display = 'none'
					}
				)
				downloadButton.addEventListener('click', function () {
					window.open(data[i].links.download, '_blank')
				})
				content.appendChild(imageNodes[imageNodes.length - 1])
			}
		})
}
