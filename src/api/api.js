/**
 * Created by Administrator on 2018/10/31.
 */

import VueAxios from 'vue-axios'
import axios from 'axios'

export default {
  getRankType () {
    let result
    axios.get('/api/ranking/gender')
      .then(res => {
//          console.log(res.data)
        result = res.data
        // console.log(res.epub)
      })
    return result
  }
}
