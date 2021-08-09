<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
         <!-- class="bg-primary text-white q-my-md "> -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title :class="{hidden:!plots}">
          Typometrics
        </q-toolbar-title>
        <q-toolbar-title :class="{hidden:plots}">
          Typometrics presentation
        </q-toolbar-title>
<!-- <q-space /><q-space /><q-space /><q-space /><q-space />"column q-gutter-lg col-2 bg-white hidden":-->

<q-select :class="schemeStyle"
		stretch 
		v-model="scheme"
		:options="schemeoptions"
		@input="schemaChanged()"
		label="annotation scheme"
		/>

    
    <div 
      <q-btn :class="{hidden:!plots}"
        align="around"
        spread
        stretch
        unelevated
        color="orange-14"
        text-color="white"
        to="/presentation"
        label="presentation"      
    />
        <q-btn :class="{hidden:plots}"
        align="around"
        spread
        stretch
        unelevated
        color="orange-14"
        text-color="white"
        to="/"
        label=" scatter plot "      
    />
    </div>


<!-- <q-space /> -->
	
	  
<!-- 
<q-btn-dropdown stretch flat label="Dropdown">
        <q-list>
          <q-item-label header>Folders</q-item-label>
          <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="folder" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" />
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
          <q-item-label header>Files</q-item-label>
          <q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="assignment" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Vacation</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
 -->

        &nbsp;
        &nbsp;<div>&nbsp;Typometrics v{{ 0.99 }}</div>
      </q-toolbar>
    </q-header>
<!-- show-if-above -->
    <q-drawer
      v-model="leftDrawerOpen"
      
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import api from "../boot/backend-api";


export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
	// mounted() {
	// 	console.log(888888,this.scheme,this.$store)
	// },
  computed:{
    plots(){
      console.log("========== ",this.$store.state.showPlot);
      this.schemeStyle = this.$store.state.showPlot?"column q-gutter-lg col-2 bg-white ":"column q-gutter-lg col-2 bg-white hidden";
      return this.$store.state.showPlot;
    }

  },
	methods: {
		schemaChanged(sche) {
			//console.log(9999999999999, this.scheme)
			this.$store.commit('changeSchema', this.scheme);
      api
     .changeScheme({sche :this.scheme})
     .then(response => {
        console.log("current scheme: "+ this.scheme," ", response.data.change);
     })

		},

	},

    data () {
    console.log("current page ", this.$route);

    const defaulSche = 'SUD';
    api
     .changeScheme({sche :defaulSche})
     .then(response => {
          console.log("refrech page with default scheme: "+ defaulSche," ", response.data.change);
     }) 
    return {
		scheme: defaulSche,
		schemeoptions:['SUD', 'UD'],
		leftDrawerOpen: false,
    schemeStyle:"column q-gutter-lg col-2 bg-white",
    webTitle:"Typometrics",
		essentialLinks: [
        {
          title: 'Typometrics article',
          caption: 'Glossa',
          icon: 'school',
          link: 'https://www.glossa-journal.org/articles/10.5334/gjgl.764/'
        },
        {
          title: 'Github',
          caption: 'github.com/typometrics',
          icon: 'code',
          link: 'https://github.com/typometrics'
        },
        {
          title: 'presentation',
          caption: 'presentation of typometrics',
          icon: 'chat',
          link: '#/presentation'
        },


        // {
        //   title: 'Discord Chat Channel',
        //   caption: 'chat.quasar.dev',
        //   icon: 'chat',
        //   link: 'https://chat.quasar.dev'
        // },
        // {
        //   title: 'Forum',
        //   caption: 'forum.quasar.dev',
        //   icon: 'record_voice_over',
        //   link: 'https://forum.quasar.dev'
        // },
        // {
        //   title: 'Twitter',
        //   caption: '@quasarframework',
        //   icon: 'rss_feed',
        //   link: 'https://twitter.quasar.dev'
        // },
        // {
        //   title: 'Facebook',
        //   caption: '@QuasarFramework',
        //   icon: 'public',
        //   link: 'https://facebook.quasar.dev'
        // },
        // {
        //   title: 'Quasar Awesome',
        //   caption: 'Community Quasar projects',
        //   icon: 'favorite',
        //   link: 'https://awesome.quasar.dev'
        // }
      ]
    
    }
  }
  
}
</script>
