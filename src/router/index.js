import Vue from 'vue'
import Router from 'vue-router'
import {BookShelf, Rankings, CateGory} from '../components/view'
import ReadView from '../components/view/book/ReadView.vue'
import Bodys from '../components/body/Bodys.vue'
import BookDetail from '../components/view/bookdetail/BookDetail.vue'
import RankingDetail from '../components/view/rankings/RankingDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/bodys',
      component: Bodys,
      children: [
        {path: '/bookshelf', component: BookShelf},
        {path: '/rankings', component: Rankings},
        {path: '/category', component: CateGory}
      ]
    },
    {path: '/rankingdetail', name: 'rankingdetail', component: RankingDetail},
    {path: '/readview', name: 'readview', component: ReadView},
    {path: '/bookdetail/:bookId', name: 'bookDetail', component: BookDetail}
  ]
})
