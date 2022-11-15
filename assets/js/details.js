const $main = document.querySelector(".main-container");

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id')

fetch('https://amazing-events.herokuapp.com/api/events')
  .then(respose => respose.json())
  .then(detailsExecution)
  .catch(error => console.log(error))

function detailsExecution(data){
    const eventsInfo = data
    const events = eventsInfo.events;
    const eventCard = events.find(event => (event._id.toString()) === id)

    const $div = document.querySelector(".card");
    $div.innerHTML = `
  <img src="${eventCard.image}" class="card-img-details" alt="...">
  <div class="card-img-overlay d-flex flex-column justify-content-end">
    <h5 class="card-title align-self-center">${eventCard.name}</h5>
    <p class="card-text align-self-center">${eventCard.description}</p>
    <div class="d-flex flex-wrap justify-content-between">
      <p class="card-text text-muted text-distance">Date: ${eventCard.date}</p>
      <p class="card-text text-muted text-distance">Place: ${eventCard.place}</p>
      <p class="card-text text-muted text-distance">Assistance or estimate: ${eventCard.assistance || eventCard.estimate}</p>
      <p class="card-text text-muted text-distance">Capacity:${eventCard.capacity}</p>
      <p class="card-text text-muted text-distance">Category: ${eventCard.category}</p>
      <p class="card-text text-muted text-distance">Price: ${eventCard.price}</p>
    </div>
  </div>
`
  }