var token = localStorage.getItem('token')
if (!token) {
    window.location.href = "http://localhost:8080/index.html"
}

var task = new Vue({
    el: '#task',
    data: {
        id: '',
        task_name: '',
        due_date: '',
        priority: false,
        tasks: [],
        city: '',
        weathers: '',
        temperature: ''
    },

    methods: {
        addTask() {
            event.preventDefault()
            axios.post('http://localhost:3000/tasks', {
                task_name: this.task_name,
                due_date: this.due_date,
                priority: this.priority,
                token
            })
                .then((response) => { 
                    if (response.status == 201) {
                        swal(response.data.message,'Press OK', "success");
                    }

                })
                .catch((err) => {
                    console.log(err);
                    
                    swal(err.message)

                })
        },

        logout() {
            localStorage.removeItem('token')
            window.location.href = "index.html"
        },

        getTask(){
            this.tasks = []
            event.preventDefault()
            axios.get(`http://localhost:3000/tasks/notdone/${token}`)
            .then((response) => {
                console.log(response); 
                this.tasks = response.data.data
            })
            .catch((err) => {

            })
        },

        getOneTask(task){
            let id = (task._id)
            console.log(id);
            event.preventDefault()
            axios.get(`http://localhost:3000/tasks/${id}`)
            .then((response) => {
                this.task_name = response.data.data.task_name
                this.due_date = response.data.data.due_date.slice(0,10)
                this.priority = response.data.data.priority
                this.id = response.data.data._id
            }).catch((err) => {
                
            });
        },

        getDoneTask(){
            event.preventDefault()
            this.task = []
            axios.get(`http://localhost:3000/tasks/done/${token}`)
            .then((response) => {
                console.log(response.data.data);
                
                this.tasks = response.data.data

            }).catch((err) => {
                
            });
        },

        getPriorityTask(){
            event.preventDefault()
            this.data = []
            axios.get(`http://localhost:3000/tasks/priority/${token}`)
            .then((response) => {
                this.tasks = response.data.data
            })
            .catch((err) => {
                console.log(err);
            })
        },

        deleteTask(task_id){
            let status = confirm('Are You Sure Want to delete this Task?')
            if (status) {
                axios.delete(`http://localhost:3000/tasks/${task_id}`)
                .then((response) => {
                    if (response.status == 200) {
                        swal('Task delete successfully')
                    }
                })
                .catch((err) => {
                    swal(err.message)
                });
            }
        },

        updateTask(){
            event.preventDefault()
            let id = this.id
            axios.put(`http://localhost:3000/tasks/${id}`, {
                task_name: task.task_name,
                due_date: task.due_date,
            })
            .then((response) => {
                swal(response.data.message,'Press OK', "success");
            }).catch((err) => {
                
            });

        },

        doneTask(task_id){
            axios.put(`http://localhost:3000/tasks/done/${task_id}`)
            .then(() => {
                swal('Task Done!','Press OK', "success");
            }).catch((err) => {
                swal(err.message)
            });
        },

        getWeather(){
            event.preventDefault()
            axios.post(`http://localhost:3000/weathers/${this.city}`, {
                city: this.city
            })
            .then((response) => {
                this.weathers = response.data.data[0].weather.description
                this.city = response.data.data[0].city_name
                this.temperature = response.data.data[0].temp     
            })
        }
    }
})