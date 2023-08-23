<template>
    <div class="">
        <h1 class="h3 mb-4 text-gray-800">Profile</h1>

        <div class="row">
            <div class="col-md-8 col-lg-8 col-sm-12 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="updateProfile">
                            <div class="form-group">
                                <label for="">Name:</label>
                                <input type="text" v-model="forms.name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">Email:</label>
                                <input type="text" v-model="forms.email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">Username:</label>
                                <input type="text" v-model="forms.username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">Password (opsional):</label>
                                <input type="password" v-model="forms.password" class="form-control">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary float-right">SIMPAN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            forms: {
                name: '',
                email: '',
                username: '',
                password: '',
                old_password: '',
            }
        }
    },
    mounted() {
        this.getProfile()
    },
    methods: {
        async getProfile() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = await axios.get('http://localhost:8000/api/profile')

            let result = response.data.data
            this.forms.name = result.name
            this.forms.username = result.username
            this.forms.email = result.email
            this.forms.old_password = result.password
            this.forms.password = result.password
        },
        async updateProfile() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = await axios.post('http://localhost:8000/api/profile', this.forms)

            Swal.fire({
                title: 'Gotcha!',
                text: 'Update Profile berhasil',
                icon: 'success',
                confirmButtonText: 'OK'
            })

            if (response.data.meta) {
                window.setTimeout(() => {
                    this.$router.push('/cms/dashboard')
                }, 2000)
            }
        }
    }
}
</script>