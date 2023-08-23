<template>
    <div class="">
        <h1 class="h3 mb-4 text-gray-800">Create Church</h1>
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
                                <label for="">Slug</label>
                                <input v-model="forms.slug" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">Province</label>
                                <select v-model="forms.province_id" class="form-control" id="">
                                    <option value="">Select Province</option>
                                    <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Classics</label>
                                <select v-model="forms.classic_id" class="form-control" id="">
                                    <option value="">Select Classic</option>
                                    <option v-for="classic in classics" :key="classic.id" :value="classic.id">{{ classic.name }}</option>
                                </select>
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
            provinces: [],
            classics: [],
            forms: {
                name: '',
                slug: '',
                classic_id: '',
                province_id: '',
            }
        }
    },
    mounted() {
        this.getProvinceClassics()
    },
    methods: {
        async getProvinceClassics() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let province = await axios.get(this.apiUrl+'province')
            let classic = await axios.get(this.apiUrl+'classic')
            let result_province = province.data.data
            let result_classic = classic.data.data

            this.provinces = result_province
            this.classics = result_classic
        },
        async storeData() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = await axios.post(this.apiUrl+'church', this.forms)

            Swal.fire({
                icon: 'success',
                title: 'Gothca',
                text: 'Data berhasil disimpan!',
            })

            this.$router.push('/cms/church')
        }
    }
}
</script>