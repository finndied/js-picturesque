const input = document.getElementById('input')
const content = document.querySelector('.content')

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
		'&count=50&client_id=U2VKzEnY4GaZyw5hCMwOWcRuGU0bA-VevuCa7OMnemM'

	fetch(url)
		.then(response => {
			if (response.ok) return response.json()
			else alert(response.status)
		})

		.then(data => {
			const imageNodes = []
			for (let i = 0; i < data.length; i++) {
				imageNodes[i] = document.createElement('div')
				imageNodes[i].className = 'img'
				imageNodes[i].style.backgroundImage = `url(${data[i].urls.regular})`
				imageNodes[i].addEventListener('dblclick', function () {
					window.open(data[i].links.download, '_blank')
				})
				content.appendChild(imageNodes[i])
			}
		})
}
