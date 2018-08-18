var app = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: ''
    },

    methods: {
        register(){
            event.preventDefault()
            axios.post('http://localhost:3000/users/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then((response) => {
                if (response.status == 201) {
                    swal(response.data.message)
                    window.location.href="index.html"
                }else {
                    swal(response.data.message)
                }
            })
            .catch((err) => {
                swal('field is required')  
            })
        },

        login(){
            event.preventDefault()
            axios.post('http://localhost:3000/users/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                swal({
                    title: response.data.message,
                    icon: "success",
                    button: "next",
                });
                window.location.href="http://localhost:8080/dashboard.html"
            })
            .catch((err) => {
                swal(err.message)
            })
        }
    }
})