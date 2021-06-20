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

        <q-toolbar-title>
          Typometrics
        </q-toolbar-title>
<!-- <q-space /><q-space /><q-space /><q-space /><q-space /> -->
<q-select class="column q-gutter-lg col-2 bg-white"
		stretch 
		v-model="scheme"
		:options="schemeoptions"
		@input="schemaChanged()"
		label="annotation scheme"
		/>
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

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
	// mounted() {
	// 	console.log(888888,this.scheme,this.$store)
	// },
	methods: {
		schemaChanged(sche) {
			// console.log(999999, this.scheme)
			this.$store.commit('changeSchema', this.scheme);
		}
	},
  data () {
    return {
		scheme:'SUD',
		schemeoptions:['SUD', 'UD'],
		leftDrawerOpen: false,
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
