import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */


// const basket = new Vuex.Store({
// 	state: {
// 	  fruits: []
// 	},
	
// 	// Obviously you would need some mutations and actions,
// 	// but to make example cleaner I'll skip this part.
//   })
  
//   export default basket


export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

	state: {
		sche: 0
	  },
	mutations: {
		changeSchema (state, sche) {
		  state.sche=sche;
		console.log(78787,"ttt", state.sche, this)
		}
	},



    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
