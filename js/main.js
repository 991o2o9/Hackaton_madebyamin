const API = 'http://localhost:8008/info'
const btnMoreInfo = document.querySelector('.btn-more-info')
const nextBtn = document.querySelector('.nextBtn')
const prevBtn = document.querySelector('.prevBtn')
const createItem = document.querySelector('.createItem')
const inpCreate1 = document.querySelector('.inpCreate-1')
const inpCreate2 = document.querySelector('.inpCreate-2')
const inpCreate3 = document.querySelector('.inpCreate-3')
const editModal = document.querySelector('.createModal')
const saveBtn = document.querySelector('.btnCreate')
const createItemButton = document.querySelector('.createItem')
const createModal = document.querySelector('.createModal')
const saveButton = document.querySelector('.btnCreate')
const section2_appear = document.querySelector('.section-2')
const btnDelete = document.querySelector('.btnDel')
const btnEdit = document.querySelector('.btnEdit')
const inpEdit1 = document.querySelector('.inpEdit-1')
const inpEdit2 = document.querySelector('.inpEdit-2')
const inpEdit3 = document.querySelector('.inpEdit-3')
const modalWindow = document.querySelector('.editModal')
const btnSaveEdit = document.querySelector('.saveEdit')
const inpSearch = document.querySelector('.inpSearch')
let countPage = 1
let currentPage = 1
let searchValue = ''
let isModalVisible = false
const myModalWindow = document.querySelector('#myModal')
const closeMoreInfo = document.querySelector('.close')
createItemButton.addEventListener('click', () => {
	if (isModalVisible) {
		createModal.style.display = 'none'
	} else {
		createModal.style.display = 'block'
	}
	isModalVisible = !isModalVisible
})

saveButton.addEventListener('click', () => {
	if (
		!inpCreate1.value.trim() ||
		!inpCreate2.value.trim() ||
		!inpCreate3.value.trim()
	) {
		alert('Пожалуйста, заполните все поля!')
		return
	}

	let newObj = {
		name: inpCreate1.value,
		description: inpCreate2.value,
		image: inpCreate3.value,
	}

	createElem(newObj)
	readTruck()
})

function createElem(truck) {
	fetch(API, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(truck),
	})
	inpCreate1.value = ''
	inpCreate2.value = ''
	inpCreate3.value = ''
}

// !read сам сам сам сам сам сам
async function readTruck(test = currentPage) {
	const res = await fetch(`${API}?&_page=${test}&_limit=1&q=${searchValue}`)
	const data = await res.json()
	section2_appear.innerHTML = ''
	data.forEach(elem => {
		section2_appear.innerHTML += `
    <div class="section-2-card-1">
    <hr />
    <h2>${elem.name}</h2>
    <h3>${elem.description}</h3>
    <button class="btn-more-info">ПОДРОБНЕЕ</button>
    <button id="${elem.id}" class="btnDel">Удалить</button>
    <button id="${elem.id}" class="btnEdit">Изменить</button>
    <div class="pre-section">
      <img src="${elem.image}" alt="" />
    </div>
  </div>
  <div class="section-2-card-2">
    <ul class="pagination">
      <li class="page-elem">
        <button class="nextBtn">След</button>
        <img src="./src/img/next-arrow.svg" alt="" /
      </li>
      <li class="page-elem">
        <button class="prevBtn">Назад</button>
        <img src="./src/img/Arrow.svg" alt="" />
      </li>
    </ul>
  </div>
`
	})
	pageFunc()
}

readTruck()
// !read end end end end end end
// !delete start
document.addEventListener('click', async e => {
	let del_id = e.target.id
	let del_class = [e.target.classList.value]
	if (del_class.includes('btnDel')) {
		await fetch(`${API}/${del_id}`, {
			method: 'DELETE',
		})
		readTruck()
	}
})
// !delete finish

// !edit finish
document.addEventListener('click', e => {
	let edit_class = [...e.target.classList]
	if (edit_class.includes('btnEdit')) {
		modalWindow.style.display = 'block'
		let id = e.target.id
		fetch(`${API}/${id}`)
			.then(res => {
				return res.json()
			})
			.then(data => {
				inpEdit1.value = data.name
				inpEdit2.value = data.description
				inpEdit3.value = data.image
				btnSaveEdit.setAttribute('id', data.id)
			})
	}
})

btnSaveEdit.addEventListener('click', () => {
	let newTruck = {
		name: inpEdit1.value,
		description: inpEdit2.value,
		image: inpEdit3.value,
	}
	readTruck()
	editedTruck(newTruck, btnSaveEdit.id)
	modalWindow.style.display = 'none'
})

function editedTruck(newTruck, id) {
	fetch(`${API}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(newTruck),
	}).then(() => readTruck())
}

// !edit end
// !
inpSearch.addEventListener('input', e => {
	searchValue = e.target.value.trim()
	readTruck()
})
// !
// !pagination

let test = currentPage

function pageFunc() {
	fetch(API)
		.then(res => res.json())
		.then(data => {
			countPage = Math.ceil(data.length / 1)
		})
}

document.addEventListener('click', e => {
	if (e.target.classList.contains('prevBtn')) {
		if (currentPage <= 1) return
		currentPage--
		test--
		readTruck(currentPage)
	}
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('nextBtn')) {
		if (currentPage >= countPage) return
		test++
		currentPage++
		readTruck(currentPage)
	}
})

// !pagination

// ! more info
document.addEventListener('click', e => {
	let btnMore_classList = [...e.target.classList]
	if (btnMore_classList.includes('btn-more-info')) {
		if (isModalVisible) {
			myModalWindow.style.display = 'none'
		} else {
			myModalWindow.style.display = 'block'
		}
		isModalVisible = !isModalVisible
	}
})

const addModal = document.querySelector('#addModal')
const addInfoBtn = document.querySelector('#addInfoBtn')
const closeAddWindow = document.querySelector('.closeAddWindow')
const inpAddInfo = document.querySelector('#addInfo')
const btnSaveMoreInfo = document.querySelector('.btnSaveMoreInfo')
const placeForInfo = document.querySelector('.placeForInfo')
const AP1 = 'http://localhost:8010/info1'
const editInfoBtn = document.querySelector('.editInfoBtn')
const modifyModal = document.querySelector('#modifyModal')
const closeModifyWindow = document.querySelector('.closeModifyWindow')
const modifyInfo = document.querySelector('#modifyInfo')
const btnSaveModifiedInfo = document.querySelector('.btnSaveModifiedInfo')
addInfoBtn.addEventListener('click', () => {
	addModal.style.display = 'block'
})
btnSaveMoreInfo.addEventListener('click', () => {
	if (!inpAddInfo.value.trim()) {
		return alert('Заполните поле!')
	}
	let moreInfo = {
		info: inpAddInfo.value,
	}
	inpAddInfo.value = ''
	createInfo(moreInfo)
	readInfo()
})

function createInfo(moreInfo) {
	fetch(AP1, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(moreInfo),
	})
}
async function readInfo() {
	const res = await fetch(AP1)
	const data = await res.json()
	placeForInfo.innerHTML = ''
	data.forEach(item => {
		placeForInfo.innerHTML = `<p>${item.info}</p>`
	})
}
readInfo()

editInfoBtn.addEventListener('click', e => {
	modifyModal.style.display = 'block'
	fetch(AP1)
		.then(res => res.json())
		.then(data => {
			data.forEach(item => {
				let id = item.id
				fetch(`${AP1}/${id}`)
					.then(res => res.json())
					.then(data => {
						modifyInfo.value = data.info
						btnSaveModifiedInfo.setAttribute('id', data.id)
					})
			})
		})
})
btnSaveModifiedInfo.addEventListener('click', () => {
	let newInfo = {
		info: modifyInfo.value,
	}
	editedInfo(newInfo, btnSaveModifiedInfo.id)
	readInfo()
})

function editedInfo(info, id) {
	fetch(`${AP1}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(info),
	}).then(() => readInfo())
}

// todo Закрытие мод окон
closeAddWindow.addEventListener('click', () => {
	addModal.style.display = 'none'
})

closeMoreInfo.addEventListener('click', () => {
	myModalWindow.style.display = 'none'
})
closeModifyWindow.addEventListener('click', e => {
	modifyModal.style.display = 'none'
})
// todo Закрытие мод окон
// ! more info
