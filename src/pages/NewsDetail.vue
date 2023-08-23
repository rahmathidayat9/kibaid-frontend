<template>
  <div id="newsPage">
    <BannerComp :title="bannerTitle" />
    <BreadcrumbComp :list="menu" />
    <section class="pb-10">
      <v-container>
        <v-row class="news-container" data-v-sticky-container>
          <div class="col-12 col-sm-6 col-md-8 col-xl-8 news-main pb-8 pb-sm-8 ob-md-0 pb-lg-0">
            <FeedDetailComp :feedd="detail" />
          </div>
          <template v-if="(windowWidth > 767)">
            <div class="col-12 col-sm-6 col-md-4 col-xl-4 news-sidebar" :class="{ 'bottom-reach': isAddClass }"
              v-sticky="options" @affixed-container-bottom="handleBottom" @affix-top="handleTop">
              <FeedStackedComp :feedst="stacked" class="news-sidebar_inner" data-v-sticky-inner />
            </div>
          </template>
          <template v-else>
            <div class="col-12 col-sm-6 col-md-4 col-xl-4 news-sidebar">
              <FeedStackedComp :feedst="stacked" />
            </div>
          </template>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
    
<script>
import BannerComp from "@/components/Banner.vue";
import BreadcrumbComp from "@/components/Breadcrumb.vue";
import FeedStackedComp from "@/components/Feeds/FeedStacked.vue";
import FeedDetailComp from "@/components/Feeds/FeedDetail.vue";
import VueStickyDirective from '@renatodeleao/vue-sticky-directive';
import axios from 'axios'

export default {
  name: "NewsDetailView",
  components: {
    BannerComp,
    BreadcrumbComp,
    FeedStackedComp,
    FeedDetailComp
  },
  directives: {
    "sticky": VueStickyDirective
  },
  data: () => ({
    bannerTitle: '',
    menu: [],
    news: [
      {
        src: require('@/assets/img/img-pray1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 1',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 2',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship2.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 3',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-pray1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 4',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-pray1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 1',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 2',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship2.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 3',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-pray1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. 4',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
    ],
    stacked: [
      {
        src: require('@/assets/img/img-pray1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. ',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship1.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. ',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      },
      {
        src: require('@/assets/img/img-worship2.jpg'),
        title: 'Lorem Ipsum is simply dummy text of the printing. ',
        link: '',
        description: 'This is the short description for the card purpose.',
        category: 'Renungan hari ini',
        date: '22 Agustus 2022'
      }
    ],
    options: {
      topSpacing: 90,
      bottomSpacing: -90,
      stickyClass: "is-affixed",
      resizeSensor: true,

    },
    detail: [],    
    isAddClass: false,
    windowWidth: window.innerWidth
  }),
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.getNewsDetail()
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
    },
    handleBottom(payload) {
      console.log(payload);
      this.isAddClass = true;
    },
    handleTop(payload) {
      console.log(payload);
      this.isAddClass = false;
    },
    async getNewsDetail() {
      let id = this.$route.params.id

    try {
        const response = await axios.get('http://localhost:8000/api/news/'+id);
        const result = response.data.data

        console.log(result);

        // detail
        this.bannerTitle = result.title
        this.detail = [
          {
            src: result.image,
            imgauthor: 'https://pixabay.com',
            title: result.title,
            description: result.body,
            category: result.news_category,
            date: '22 Agustus 2022',
            editor: result.author,
            url: 'https://kibaid.org/news/detail'
          },
        ]

        this.menu = [
          {
            label: 'Home',
            link: '/home'
          },
          {
            label: result.news_category,
            link: '/news'
          },
          {
            label: result.title,
            link: '/news/detail/'+id
          }
        ]
    } catch (error) {
        // Menghandle kesalahan jika terjadi
        console.error(error);
    }
    },
  }
};
</script>
<style lang="scss" scoped>

</style>
    
  
  