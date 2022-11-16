const { createApp } = Vue;

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id')

const app = createApp({
    data() {
        return {
            information: [],
            events: [],
            eventCard: '',
        }
    },
    created() {
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.information = data
                this.events = this.information.events;
                this.eventCard = this.events.find(event => (event._id.toString()) === id)
            })
            .catch(error => console.error(error))
    },
    mounted() {

    },
    methods: {


    },
    computed: {

    }
})

app.mount('#app')