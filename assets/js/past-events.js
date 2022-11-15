const $main = document.querySelector(".main-container");
const $checkboxContainer = document.querySelector(".checkboxs");
const $form = document.querySelector(".form-container");


let divOfCards = document.createElement('div');
divOfCards.classList.add('d-flex', 'flex-wrap', "justify-content-around", "justify-content-lg-center");

const createCheckbox = (value, container) => {
    let template = '';
    value.forEach(value => template += `
    <label class="form-check-label">
        <input class="form-check-input" type="checkbox" id="" value="${value}">${value}
    </label>
    `);

    container.innerHTML = template;
}


const createCard = (event) => {
    let divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.innerHTML = `
    <img src="${event.image}" class="card-img-top" alt="imagen de ${event.name}">
    <div class="card-body d-flex flex-column justify-content-between">
        <div class="card-content">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="d-flex flex-wrap flex-column">
                    <p class="card-text"><small class="text-muted">Date: ${event.date}</small></p>
                    <p class="card-text"><small class="text-muted">Category: ${event.category}</small></p>
                </div>
        </div>
        <div class="d-flex justify-content-between">
            <p>Price: $${event.price}</p>
            <a href="./details.html?id=${event._id}" class="btn-rose btn btn-primary align-self-end">ver mas...</a>
        </div>
    </div>`
    return divCard;
}

const printCard = (events, container) => {
    container.innerHTML = '';
    events.forEach(event => divOfCards.appendChild(createCard(event)))
}

const categoryFilter = (events, state) => {
    const fnFilter = event => state.includes(event.category) || state.length === 0;
    let filtrated = events.filter(fnFilter);
    return filtrated;
}

const searchFilter = (events, inputValue) => {
    const fnSearch = evnt => evnt.name.toLowerCase().includes(inputValue);
    let filtrated = events.filter(fnSearch);
    return filtrated;
}

fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respose => respose.json())
    .then(pastExecution)
    .catch(error => console.log(error))


function pastExecution(data){
    const eventsInfo = data;
    const events = eventsInfo.events;
    const pastEvents = events.filter(event => event.date < eventsInfo.currentDate)
    const fnCategory = events => events.category;
    const category = Array.from(new Set(events.map(fnCategory)));

    createCheckbox(category, $checkboxContainer)

    printCard(pastEvents, divOfCards);
    $main.appendChild(divOfCards);

    $form.addEventListener("submit", (evnt) => {
        evnt.preventDefault()
    
        const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(input => input.value);
        const valueSearch = $form[9]
        const stringSearch = valueSearch.value.toLowerCase().trim();
        const cardsFiltrated = categoryFilter(pastEvents, checked);
        const cardSearched = searchFilter(cardsFiltrated, stringSearch);
        printCard(cardSearched, divOfCards);
    })
}