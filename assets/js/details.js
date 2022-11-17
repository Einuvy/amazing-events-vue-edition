const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            id: new URLSearchParams(location.search).get('id'),
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
                this.eventCard = this.events.find(event => (event._id.toString()) === this.id)
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