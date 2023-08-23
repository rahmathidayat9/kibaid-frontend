<template>
<div class="mt-5" style="margin: 0px; padding: 0px;">
    <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <form class="">
                                        <div class="form-group">
                                            <input type="text" v-model="forms.username" class="form-control form-control-user"
                                                id="username" aria-describedby="username"
                                                placeholder="Username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" v-model="forms.password" class="form-control form-control-user"
                                                id="password" placeholder="Password">
                                        </div>
                                        <button @click.prevent="doLogin" class="btn btn-primary btn-user btn-block">LOGIN</button>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import '@/assets/sb-admin-2/vendor/fontawesome-free/css/all.min.css'
import '@/assets/sb-admin-2/css/sb-admin-2.min.css'
import '@/assets/sb-admin-2/vendor/jquery/jquery.min.js'
import '@/assets/sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '@/assets/sb-admin-2/vendor/jquery-easing/jquery.easing.min.js'

export default {
    data() {
        return {
            forms: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async doLogin() {
            // alert(this.forms.username)
            let response = await axios.post('http://localhost:8000/api/auth/login', this.forms)

            let token = response.data.token
            let data = response.data.data
            localStorage.clear()
            
            if (response.data != null) {
                localStorage.setItem('token', token)
                localStorage.setItem('user_id', data.id)
                localStorage.setItem('username', data.username)
                localStorage.setItem('email', data.email)

                Swal.fire({
                    title: 'Gotcha!',
                    text: 'Login berhasil',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })

                window.setTimeout(() => {
                    this.$router.push('/cms/dashboard')
                }, 2000)
            } else {
                localStorage.clear()
                
                Swal.fire({
                    title: 'Error!',
                    text: 'Login Gagal',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

                this.$router.push('/login')
            }
        }
    }   
}
</script>