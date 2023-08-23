<template>
    <div class="">
        <h1 class="h3 mb-4 text-gray-800">Create Kategori Berita</h1>
        <div class="row">
            <div class="col-md-8 col-lg-8 col-sm-12 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="storeData">
                            <div class="form-group">
                                <label for="">Name</label>
                                <input v-model="forms.name" type="text" class="form-control">
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
    name: "Create",
    data() {
        return {
            apiUrl: 'http://localhost:8000/api/',
            forms: {
                name: '',
            }
        }
    },
    methods: {
        async storeData() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = await axios.post(this.apiUrl+'news-category', this.forms)

            Swal.fire({
                icon: 'success',
                title: 'Gothca',
                text: 'Data berhasil disimpan!',
            })

            this.$router.push('/cms/news-category')
        }
    }
}
</script>