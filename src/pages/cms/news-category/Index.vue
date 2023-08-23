<template>
    <div class="">
        <h1 class="h3 mb-4 text-gray-800">Kategori Berita</h1>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div>
                        <vue-good-table
                        :columns="columns"
                        :rows="rows"
                        :search-options="{
                            enabled: true,
                            }"
                        :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 10,
                            }">
                        <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'action'">
                            <router-link class="btn btn-primary btn-sm" 
                            :to="{ name: 'cms.news-category.edit', params: {id:props.row.id} }">
                            EDIT
                            </router-link>
                            <!-- <button class="btn btn-primary btn-sm" @click="editData(props.row.id)">EDIT</button> -->
                            <button class="btn btn-danger btn-sm ml-2" @click="deleteData(props.row.id)">DELETE</button>
                        </span>
                        <span v-else>
                            {{props.formattedRow[props.column.field]}}
                        </span>
                        </template>
                        </vue-good-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: "Index",
    components: {
        VueGoodTable,
    },
    data() {
        return {
            apiUrl: 'http://localhost:8000/api/',
            columns: [
                {
                    label: 'Nama',
                    field: 'name',
                },
                {
                    label: 'Action',
                    field: 'action',
                },
            ],
            rows: [],
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = await axios.get(this.apiUrl+'news-category')

            this.rows = response.data.data
        },
        async deleteData(id) {
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                let response = axios.delete(this.apiUrl+'news-category/'+id)
                this.getData()
                Swal.fire(
                    'Data berhasil dihapus',
                    'Gothca',
                    'success'
                )
                }
            })
        }
    }
}
</script>