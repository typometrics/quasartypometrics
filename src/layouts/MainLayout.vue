<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar dense>
        <!-- class="bg-primary text-white q-my-md "> -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title :class="{ hidden: !plots }">
          <q-icon class="text-dark" size="md">
            <img src="~assets/typometrics.svg" />
          </q-icon>
          &nbsp;<b>Typometrics</b>
        </q-toolbar-title>
        <q-toolbar-title :class="{ hidden: plots }">
          <q-icon class="text-dark" size="md">
            <img src="~assets/typometrics.svg" />
          </q-icon>
          &nbsp;<b>Typometrics presentation</b>
        </q-toolbar-title>
        <!-- <q-space /><q-space /><q-space /><q-space /><q-space />"column q-gutter-lg col-2 bg-white hidden":-->

        <q-select
          :class="schemeStyle"
          stretch
          v-model="scheme"
          :options="schemeoptions"
          @input="schemaChanged()"
          label="Treebank version 2.11"
        />

        <div>
          <q-btn
            :class="{ hidden: !plots }"
            align="around"
            spread
            no-caps
            stretch
            unelevated
            text-color="white"
            to="/presentation"
            icon="info"
          >
            <q-tooltip class="bg-white"
              >A short presentation of the Typometrics website</q-tooltip
            >
          </q-btn>
          <q-btn
            :class="{ hidden: plots }"
            align="around"
            spread
            stretch
            unelevated
            text-color="white"
            to="/"
            no-caps
            label="Scatter plots"
            icon="scatter_plot"
          />
          <q-btn
            flat
            dense
            round
            icon="language"
            @click="languageButtonClicked"
            :style="{ visibility: showLanguageButton ? 'visible' : 'hidden' }"
          >
            <q-tooltip>Select which languages to show in the plot</q-tooltip>
          </q-btn>
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
       &nbsp;
        &nbsp;<div>&nbsp;Typometrics v1.0</div>
 -->
      </q-toolbar>
    </q-header>
    <!-- show-if-above -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      bordered
      elevated
      content-class="bg-grey-1"
      @click="leftDrawerOpen = !leftDrawerOpen"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label> </q-item-label>
        <q-item-label header class="text-grey-8">
          Typometrics v. 1.0
        </q-item-label>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import api from "../boot/backend-api";

export default {
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  // mounted() {
  // 	console.log(888888,this.scheme,this.$store)
  // },
  computed: {
    plots() {
      // console.log("========== ", this.$store.state.showPlot);
      this.schemeStyle = this.$store.state.showPlot
        ? "column q-gutter-lg col-2 bg-white "
        : "column q-gutter-lg col-2 bg-white hidden";
      return this.$store.state.showPlot;
    },
    showLanguageButton() {
      return this.$store.state.showLanguageButton;
    },
  },
  methods: {
    schemaChanged(sche) {
      api.changeScheme({ sche: this.scheme }).then((response) => {
        console.log(
          "current scheme: " + this.scheme,
          " ",
          response.data.change
        );
      });
      this.$store.commit("showCloseGr", false); //hide the canvas for similar graph
      this.$store.commit("changeSchema", this.scheme); //change scheme between 'UD' and 'SUD'
    },
    languageButtonClicked() {
      this.$store.commit(
        "showHideLanguageSelector",
        !this.$store.state.showLanguageSelector
      );
    },
  },

  data() {
    // console.log("current page ", this.$route);
    const defaulSche = "SUD";
    api.changeScheme({ sche: defaulSche }).then((response) => {
      console.log(
        "refrech page with default scheme: " + defaulSche,
        " ",
        response.data.change
      );
    });
    return {
      scheme: defaulSche,
      schemeoptions: ["SUD", "UD"],
      leftDrawerOpen: false,
      schemeStyle: "column q-gutter-lg col-2 bg-white",
      webTitle: "Typometrics",
      essentialLinks: [
        {
          title: "Typometrics article",
          caption: "Glossa",
          icon: "school",
          link: "https://www.glossa-journal.org/articles/10.5334/gjgl.764/",
        },
        {
          title: "Github",
          caption: "github.com/typometrics",
          icon: "code",
          link: "https://github.com/typometrics",
        },
        {
          title: "Presentation",
          caption: "Presentation of typometrics",
          icon: "chat",
          link: "#/presentation",
        },
      ],
    };
  },
};
</script>

<style></style>
