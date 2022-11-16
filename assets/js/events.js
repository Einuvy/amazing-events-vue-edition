const {createApp} = Vue;

const app = createApp({
    data(){
        return{
            information: [],
            events: [],
            filterEvents: [],
            categories: [],
            checked: [],
            inputSearch: '',
            pastEvents: [],
            pastFilterEvents: [],
            upcomingEvents: [],
            upcomingFilterEvents: [],
        }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.information = data;
                this.events = this.information.events;
                this.filterCategories()
                this.pastEvents = this.events.filter(event => event.date < this.information.currentDate)
                this.upcomingEvents = this.events.filter(event => event.date >=  this.information.currentDate)
                this.pastFilterEvents = this.pastEvents;
                this.upcomingFilterEvents = this.upcomingEvents;
            })
            .catch(error => console.error(error))
    },
    mounted(){

    },
    methods:{
        filterCategories(){
            const fnCategory = events => events.category;
            this.categories = [ ... new Set(this.events.filter(fnCategory).map(fnCategory))]
            this.filterEvents = this.events;
        },
        
    },
    computed: {
        search(){
            let checkedFilter = this.filterEvents.filter( event => this.checked.includes(event.category) || this.checked.length === 0);
            let searchFilter = checkedFilter.filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
            this.events = searchFilter;
        },
        pastSearch(){
            let checkedFilter = this.pastFilterEvents.filter( event => this.checked.includes(event.category) || this.checked.length === 0);
            let searchFilter = checkedFilter.filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
            this.pastEvents = searchFilter;
        },
        upcomingSearch(){
            let checkedFilter = this.upcomingFilterEvents.filter( event => this.checked.includes(event.category) || this.checked.length === 0);
            let searchFilter = checkedFilter.filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
            this.upcomingEvents = searchFilter;
        }
    }
})

app.mount('#app')