// Получение элементов DOM
const searchInput = document.querySelector('.form-control');
const rowElement = document.querySelector('.row');

// Функция для фильтрации университетов и обновления списка карточек
function filterAndDisplayCards(data, searchTerm) {
    rowElement.innerHTML = ''; // Очистка текущего списка карточек

    const filteredUniversities = data.university.filter(item => {
        const searchFields = [item.name, item.description, item.site, item.dir];
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    createCards({ university: filteredUniversities }); // Создание и добавление новых карточек
}

// Обработчик события ввода текста в поле поиска
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.trim();
    fetch('https://student.from.io/university.json')
        .then(response => response.json())
        .then(data => {
            filterAndDisplayCards(data, searchTerm);
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
});

// Функция для создания элемента с заданным тегом и классами
function createElement(tag, classNames) {
    const element = document.createElement(tag);
    if (classNames) {
        element.className = classNames;
    }
    return element;
}

// Функция для создания и добавления карточек на страницу
function createCards(data) {
    const rowElement = document.querySelector('.row');

    data.university.forEach(item => {
        const colElement = createElement('div', 'col-lg-4 mb-3 d-flex align-items-stretch');
        const cardElement = createElement('div', 'card w-100');
        const cardHeaderElement = createElement('div', 'card-header');
        const imgElement = createElement('img');
        const cardBodyElement = createElement('div', 'card-body d-flex flex-column');
        const cardTextElement = createElement('p', 'card-text mb-4');
        const linkElement = createElement('a');
        const btnElement = createElement('a', 'btn btn-primary mt-auto align-self-start');

        imgElement.className = 'rounded-circle me-1';
        imgElement.width = '24';
        imgElement.height = '24';
        imgElement.src = `https://favicon.yandex.net/favicon/v2/${item.site}?size=32&stub=1`;
        imgElement.alt = '';

        linkElement.href = item.site;
        linkElement.target = '_blank';
        linkElement.textContent = item.site;

        btnElement.href = item.dir;
        btnElement.textContent = 'Список групп';

        cardHeaderElement.appendChild(imgElement);
        cardHeaderElement.appendChild(document.createTextNode(item.name));

        cardTextElement.textContent = item.description;
        cardTextElement.appendChild(document.createElement('br'));
        cardTextElement.appendChild(linkElement);

        cardBodyElement.appendChild(cardTextElement);
        cardBodyElement.appendChild(btnElement);

        cardElement.appendChild(cardHeaderElement);
        cardElement.appendChild(cardBodyElement);

        colElement.appendChild(cardElement);

        rowElement.appendChild(colElement);
    });
}

// Загрузка данных из API
fetch('https://student.from.io/university.json')
    .then(response => response.json())
    .then(data => {
        createCards(data);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
