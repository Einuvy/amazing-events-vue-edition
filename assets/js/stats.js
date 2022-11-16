const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            information: [],
            events: [],
            pastEvents: [],
            pastEventsCategory: [],
            upcomingEvents: [],
            upcomingEventsCategory: [],
            pastCategoryArray: [],
            upcomingCategoryArray: [],
            highestAttendanceEvents: [],
            lowerAttendanceEvents: [],
            highestCapacityEvents: []
        }
    },
    created() {
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.information = data;
                this.events = this.information.events;
                this.pastEvents = this.events.filter(event => event.date < this.information.currentDate)
                this.upcomingEvents = this.events.filter(event => event.date >= this.information.currentDate)


                const fnCategory = events => events.category;
                this.pastEventsCategory = Array.from(new Set(this.pastEvents.map(fnCategory)));
                this.upcomingEventsCategory = Array.from(new Set(this.upcomingEvents.map(fnCategory)));

                const attendanceEvents = this.percentajeDescendent(this.pastEvents);
                const capacityEvents = this.capacityDescendent(this.pastEvents);
                this.highestAttendanceEvents = attendanceEvents[0];
                this.lowerAttendanceEvents = attendanceEvents[attendanceEvents.length - 1];
                this.highestCapacityEvents = capacityEvents[0];

                this.pastCategoryArray = this.pastEventsStatistics(this.pastEventsCategory, this.pastEvents)
                this.upcomingCategoryArray = this.upcomingEventsStatistics(this.upcomingEventsCategory, this.upcomingEvents)

            })
            .catch(error => console.error(error))
    },
    mounted() {

    },
    methods: {
        pastEventsStatistics(categories, events) {
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
            const ordenedCategoriesArray = categoriesArray.sort((a, b) => b.revenues - a.revenues)
            console.log(ordenedCategoriesArray);
            return ordenedCategoriesArray;
        },
        upcomingEventsStatistics(categories, events) {
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
            const ordenedCategoriesArray = categoriesArray.sort((a, b) => b.revenues - a.revenues)
            console.log(ordenedCategoriesArray);
            return ordenedCategoriesArray;
        },

        percentajeDescendent(array) {
            return array.map(events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))
        },
        capacityDescendent(array) {
            return array.map(events => events).sort((b, a) => (a.capacity - b.capacity));
        }


    },

    computed: {
    }
})

app.mount('#app')