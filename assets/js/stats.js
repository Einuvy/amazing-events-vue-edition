const $eventsTable = document.querySelector(".tbody-events-container");
const $upcomingTable = document.querySelector(".tbody-upcoming-container");
const $pastTable = document.querySelector(".tbody-past-container");


const percentajeDescendent = (array) => 
array.map( events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))

const capacityDescendent = (array) =>
array.map( events => events).sort((b, a) => (a.capacity - b.capacity));

const pasteventsStatistic = (categories, events) => {
    let categoriesArray = [];
    categories.forEach((value) => {
        const eventsSameCategory = events.filter(event => event.category === value);

        const percentajeOfAssistance = eventsSameCategory.map(event => ((event.assistance * 100) / event.capacity));
        const regularOfAssitance = percentajeOfAssistance.reduce((acum, number) => acum + number);
        const promOfAssistance = ((regularOfAssitance) / (percentajeOfAssistance.length))

        const revenues = eventsSameCategory.map(event => ((event.assistance * event.price)));
        const totalRevenues = revenues.reduce((acum, number) => acum + number);

        const category = {
            name: value,
            assistance: promOfAssistance.toFixed(2),
            revenues: totalRevenues
        }

        categoriesArray.push(category);
    })
    const ordenedCategoriesArray = categoriesArray.sort((a , b) => b.revenues - a.revenues)
    printByCategory($pastTable , ordenedCategoriesArray)
}
const upcomingeventsStatistic = (categories, events) => {
    let categoriesArray = [];
    categories.forEach((value) => {
        const eventsSameCategory = events.filter(event => event.category === value);

        const percentajeOfAssistance = eventsSameCategory.map(event => ((event.estimate * 100) / event.capacity));
        const regularOfAssitance = percentajeOfAssistance.reduce((acum, number) => acum + number);
        const promOfAssistance = ((regularOfAssitance) / (percentajeOfAssistance.length))

        const revenues = eventsSameCategory.map(event => ((event.estimate * event.price)));
        const totalRevenues = revenues.reduce((acum, number) => acum + number);

        const category = {
            name: value,
            estimate: promOfAssistance.toFixed(2),
            revenues: totalRevenues
        }

        categoriesArray.push(category);
    })
    const ordenedCategoriesArray = categoriesArray.sort((a , b) => b.revenues - a.revenues)
    printByCategory($upcomingTable , ordenedCategoriesArray)
}

const eventsStatistics = (event) => {
    const attendanceEvents = percentajeDescendent(event);
    const capacityEvents = capacityDescendent(event);
    const highestattendanceEvents = attendanceEvents[0]; 
    const lowerattendanceEvents = attendanceEvents[attendanceEvents.length - 1];
    const highestCapacityEvents = capacityEvents[0];

    printEventsStatistics(highestattendanceEvents, lowerattendanceEvents, highestCapacityEvents)
}
const printEventsStatistics = (highestAttendance, lowerAttendance, highestCapacity) => {
    $eventsTable.innerHTML = `
                    <tr>
                        <td class="table-subtitle">Event with the highest percentaje of attendance:</td>
                        <td class="table-subtitle">Event with the lowest percentaje of attendance:</td>
                        <td class="table-subtitle">Event with larger capacity:</td>
                    </tr>
                    <tr>
                        <td class="td-container">${highestAttendance.name} : ${(highestAttendance.assistance*100)/highestAttendance.capacity}% of assistance</td>
                        <td class="td-container">${lowerAttendance.name} : ${(lowerAttendance.assistance*100)/lowerAttendance.capacity}% of assistance</td>
                        <td class="td-container">${highestCapacity.name} : ${highestCapacity.capacity} people</td>
                    </tr>
    `
}
const printByCategory = (container, categoryArray) => {
    
    let template = '';
    categoryArray.forEach((_, i) =>{
        template += `
                    <tr>
                        <td class="td-container">${categoryArray[i].name}</td>
                        <td class="td-container">$${categoryArray[i].revenues}</td>
                        <td class="td-container">${categoryArray[i].assistance || categoryArray[i].estimate}% of assistance</td>
                    </tr>
                        
    `
    })
    container.innerHTML= template;
}
fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respose => respose.json())
    .then(pastExecution)
    .catch(error => console.log(error))


function pastExecution(data) {
    const eventsInfo = data;
    const events = eventsInfo.events;
    const pastEvents = events.filter(event => event.date < eventsInfo.currentDate);
    const upcomingEvents = events.filter(event => event.date >= eventsInfo.currentDate);

    const fnCategory = events => events.category;
    const pastEventsCategory = Array.from(new Set(pastEvents.map(fnCategory)));
    const upcomingEventsCategory = Array.from(new Set(upcomingEvents.map(fnCategory)));

    eventsStatistics(pastEvents); 
    pasteventsStatistic(pastEventsCategory, pastEvents);
    upcomingeventsStatistic(upcomingEventsCategory, upcomingEvents)
}

   




















/*                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    */

/*
<main class="main-container d-flex flex-column align-items-center justify-content-center">
        <div class="stat-table-container">
            <table class="table-container">
                <thead class="thead-container">
                    <tr>
                        <th class="th-container" colspan="3">Events Statistics</th>
                    </tr>
                </thead>
                <tbody class="tbody-container">
                    <tr>
                        <td class="td-container">Events with the highest percentaje of attendance</td>
                        <td class="td-container">Events with the lowest percentaje of attendance</td>
                        <td class="td-container">Events with larger capacity</td>
                    </tr>
                    <tr>
                        <td class="td-container"> </td>
                        <td class="td-container"> </td>
                        <td class="td-container"> </td>
                    </tr>
                </tbody>
            </table>


            <table class="table-container">
                <thead class="thead-container">
                    <tr>
                        <th class="th-container" colspan="3">Upcomings Events Statistics by Category</th>
                    </tr>
                </thead>
                <tbody class="tbody-container">
                    <tr>
                        <td class="td-container">Categorys</td>
                        <td class="td-container">Revenues</td>
                        <td class="td-container">Porcentage of attendance</td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
    
                </tbody>
            </table>
            <table class="table-container">    
                <thead class="thead-container">
                    <tr>
                        <th class="th-container" colspan="3">Past Events Statistics by Category</th>
                    </tr>
                </thead>
                <tbody class="tbody-container">
                    <tr>
                        <td class="td-container">Categorys</td>
                        <td class="td-container">Revenues</td>
                        <td class="td-container">Porcentage of attendance</td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                    <tr>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                        <td class="td-container"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
*/
