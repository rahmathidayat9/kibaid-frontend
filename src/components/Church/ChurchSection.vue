<template>
    <section id="church">
        <v-container>
            <v-row>
                <v-col cols="12" class="pt-10">
                    <v-card :elevation="0" color="transparent" class="pb-8 px-3" tile>
                        <div class="map-area">
                            <svg-map :map="Indonesia" location-role="link" @mouseover="pointLocation"
                                @mouseout="unpointLocation" @focus="focusLocation" @blur="blurLocation"
                                @click="clickLocation" />
                        </div>
                        <div class="map-info">
                            <div class="map-info-header">
                                <span class="mr-3">Lokasi: </span>
                                <!-- <h4 class="text-p text-uppercase mb-0 bluesea--text">{{ clickedLocation }}</h4> -->
                                <v-autocomplete v-model="select" class="select-map" @change="onChange($event)" :items="items"
                                    item-text="province" item-value="province" label="Pilih Lokasi"
                                    single-line></v-autocomplete>
                            </div>
                            <ul class="map-info-content" id="mapInfo">
                                <v-overlay :value="overlay" absolute>
                                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                                </v-overlay>
                                <template v-for="(church, i) in churchArr">
                                    <li>
                                        <v-btn large depressed target="_blank" :href="church.link">
                                            <div class="map-church-header">
                                                <div class="text-small">{{ church.title }}</div>
                                            </div>
                                            <p class="text-capitalize map-info-category">{{ church.category }}</p>
                                        </v-btn>
                                    </li>
                                </template>
                            </ul>
                            <div v-if="(pages > 1)">
                                <v-pagination class="pagination mb-2 mt-8" v-model="page" :length="pages"
                                    @input="updatePage"></v-pagination>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { SvgMap } from "vue-svg-map"
import Indonesia from "@svg-maps/indonesia"
import { getLocationName } from '@/utilities'
import axios from 'axios'

const jawasumatra = [
    'Aceh',
    'Sumatera Utara',
    'Sumatera Barat',
    'Riau',
    'Kepulauan Riau',
    'Jambi',
    'Bengkulu',
    'Sumatera Selatan',
    'Lampung',
    'Bangka Belitung',
    'Banten',
    'Jawa Barat',
    'Jakarta Raya',
    'Jawa Tengah',
    'Yogyakarta',
    'Jawa Timur'
];

export default {
    name: "ChurchSectionComp",
    components: {
        SvgMap
    },
    data() {
        return {
            Indonesia,
            pointedLocation: null,
            focusedLocation: null,
            clickedLocation: null,
            churches: [],
            select: null,
            items: [],
            overlay: false,
            page: 1,
            pageSize: 6,
            listCount: 0,
            churchArr: [],
            clickedArr: [],
            filterArr: [],
            selectArr: []
        };
    },
    created() {
        this.getChurches()
        this.getProvinces()
        // this.initPage();
        this.updatePage(this.page);
        // this.getChurches()

        // this.churches = this.getChurches()
    },
    // mounted() {
    //     this.getChurches()
    // },
    methods: {
        async getChurches() {
            try {
                const response = await axios.get('http://localhost:8000/api/church');

                let church = response.data.data
                let result = []
                
                church.forEach((value, index) => {
                    result.push({
                        title: value.name,
                        province: value.province,
                        category: value.klasis,
                        link: '/church/detail/'+value.id
                    })
                })
                
                this.churches = result
                this.churchArr = result
                this.initPage(result, result)
            } catch (error) {
                // Menghandle kesalahan jika terjadi
                console.error(error);
            }
        },
        async getProvinces() {
            try {
                const response = await axios.get('http://localhost:8000/api/province');

                let provinces = response.data.data
                let result = []
                
                provinces.forEach((value, index) => {
                    result.push({
                        province: value.name,
                    })
                })
                
                this.items = result
                // this.churches = result
                // this.churchArr = result
                // this.initPage(result, result)
            } catch (error) {
                // Menghandle kesalahan jika terjadi
                console.error(error);
            }
        },
        pointLocation(event) {
            this.pointedLocation = getLocationName(event.target);
        },
        unpointLocation(event) {
            this.pointedLocation = null
        },
        focusLocation(event) {
            this.focusedLocation = getLocationName(event.target);
        },
        blurLocation(event) {
            this.focusedLocation = null
        },
        clickLocation(event) {
            this.page = 1;
            this.overlay = true;
            setTimeout(() => (this.overlay = false), 900);

            this.clickedLocation = getLocationName(event.target);
            this.select = getLocationName(event.target);

            this.$nextTick(() =>
                document.getElementById('church').scrollIntoView({ behavior: 'smooth' })
            );
            const filterArr = this.churches.filter((e) => e.province === this.clickedLocation).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
            console.log(filterArr);
            this.listCount = filterArr.length;
            if (this.listCount < this.pageSize) {
                this.churchArr = filterArr;
            } else {
                this.churchArr = filterArr.slice(0, this.pageSize);
            }

        },
        onChange(event) {
            this.page = 1;
            console.log(this.select);
            this.overlay = true;
            setTimeout(() => (this.overlay = false), 900);
            this.clickedLocation = this.select;
            this.$nextTick(() =>
                document.getElementById('church').scrollIntoView({ behavior: 'smooth' })
            );
            const selectArr = this.churches.filter((e) => e.province === this.select).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
            console.log(selectArr);
            this.listCount = selectArr.length;
            if (this.listCount < this.pageSize) {
                this.churchArr = selectArr;
            } else {
                this.churchArr = selectArr.slice(0, this.pageSize);
            }
        },
        initPage(ch, ca) {
            if (this.clickedLocation != null) {
                const filterAr = ch.filter((e) => e.province === this.clickedLocation).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
                this.listCount = filterAr.length;
                if (this.listCount < this.pageSize) {
                    ca = this.filterAr;
                } else {
                    ca = this.filterAr.slice(0, this.pageSize);
                }
            } else if (this.select != null) {
                const selectAr = ch.filter((e) => e.province === this.select).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
                this.listCount = selectAr.length;
                if (this.listCount < this.pageSize) {
                    ca = this.selectAr;
                } else {
                    ca = this.selectAr.slice(0, this.pageSize);
                }
            } else {
                this.listCount = ch.length;
                if (this.listCount < this.pageSize) {
                    this.churchArr = this.churches;
                } else {
                    this.churchArr = ch.slice(0, this.pageSize);
                }

            }
        },
        updatePage(pageIndex) {

            if (this.clickedLocation != null) {
                const selectAr = this.churches.filter((e) => e.province === this.clickedLocation).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
                let start = (pageIndex - 1) * this.pageSize;
                let end = pageIndex * this.pageSize;
                this.churchArr = selectAr.slice(start, end);
                this.page = pageIndex;
            } else if (this.select != null) {
                const selectAr = this.churches.filter((e) => e.province === this.select).map((e) => { return { title: e.title, province: e.province, category: e.category, link: e.link } });
                let start = (pageIndex - 1) * this.pageSize;
                let end = pageIndex * this.pageSize;
                this.churchArr = selectAr.slice(start, end);
                this.page = pageIndex;
            } else {
                const selectAr = this.churches;
                let start = (pageIndex - 1) * this.pageSize;
                let end = pageIndex * this.pageSize;
                this.churchArr = selectAr.slice(start, end);
                this.page = pageIndex;
            }
            // console.log(filter2); lolos
            // console.log(this.selectAr);
        },
    },
    computed: {
        pages() {
            if (this.pageSize == null || this.listCount == null) return 0;
            return Math.ceil(this.listCount / this.pageSize);
        }
    }
}
</script>