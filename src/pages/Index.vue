<template>
  <q-page
    class="full-width row no-wrap justify-around items-start content-between q-col-gutter-lg"
  >
    <div class="">
      <div class="col-2" style="position: relative">
        <bubble-chart
          ref="bubblechart"
          class="col-2"
          :chartdata="selectedChartData"
          :displayoptions="displayoptions"
        ></bubble-chart>
      </div>
    </div>

    <q-spinner-pie
      class="fixed-center"
      color="primary"
      size="10em"
      :class="{ hidden: !loading }"
      :thickness="10"
    />

    <div class="col-2 self-center">
      <div class="column q-col-gutter-lg">
        <q-form class="q-gutter-md">
          <div class="column q-gutter-lg justify-center">
            <q-space />

            <div class="q-gutter-y-lg">
              <q-btn-toggle
                dense
                v-model="dimension"
                spread
                no-caps
                toggle-color="primary"
                color="white"
                text-color="black"
                :options="dimensionOptions"
                @input="setDimension"
              />
            </div>

            <div class="col-2">
              <!--begin with the y axis for 1D graph and 2D graph-->
              <q-select
                v-model="xtypemodel"
                :options="xtypeoptions"
                @input="getOptions()"
                :label="
                  this.dimension > 1 ? 'measure x-Axis' : 'measure y-Axis'
                "
                dense
              />
            </div>

            <div class="col-2">
              <q-select
                v-model="xmodel"
                use-input
                hide-selected
                fill-input
                input-debounce="400"
                :options="fxoptions"
                @filter="filterOpt"
                @input="getChartdata()"
                :label="this.dimension > 1 ? 'x-Axis' : 'y-Axis'"
                dense
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <q-slider
              v-model="xminocc"
              :min="0"
              :max="this.freqMax[0]"
              :class="{ hidden: xtypemodel == 'treeHeight' }"
              label
              input-debounce="320"
              :label-value="
                xminocc > 0
                  ? 'at least ' + xminocc + ' occurrences for ' + xmodel
                  : 'no filter on minimum occurrences for ' + xmodel
              "
              @change="getChartdata()"
              dense
            />
            <q-space />

            <div class="col-2">
              <!--the x axis for 2D graphs-->
              <q-select
                :class="{ hidden: dimension < 2 }"
                v-model="ytypemodel"
                :options="ytypeoptions"
                @input="getOptions()"
                label="measure y-Axis"
                dense
              />
            </div>

            <div class="col-2">
              <q-select
                :class="{ hidden: dimension < 2 }"
                v-model="ymodel"
                use-input
                hide-selected
                fill-input
                input-debounce="320"
                :options="fyoptions"
                @filter="filterOpt"
                @input="getChartdata()"
                label="y-Axis"
                dense
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <q-slider
              :class="{ hidden: dimension < 2 || ytypemodel == 'treeHeight' }"
              v-model="yminocc"
              :min="0"
              :max="this.freqMax[1]"
              label
              input-debounce="320"
              :label-value="
                yminocc > 0
                  ? 'at least ' + yminocc + ' occurrences for ' + ymodel
                  : 'no filter on minimum occurrences for ' + ymodel
              "
              @change="getChartdata()"
              dense
            />

            <q-btn-group spread glossy :class="{ hidden: noResults }">
              <q-btn
                label="closestGraph"
                @click="similarGraph('dep')"
                color="red-12"
                no-caps
              >
                <q-tooltip :delay="300" content-class="text-white bg-primary"
                  >find most similar distributions</q-tooltip
                >
              </q-btn>

              <q-btn-dropdown
                color="amber-9"
                push
                glossy
                no-caps
                label="similar cloud form"
                dense
              >
                <q-list>
                  <q-item clickable v-close-popup @click="similarGraph('dtw')">
                    <q-item-section class="amber-9">
                      <q-item-label>Dynamique time warping</q-item-label>
                      <q-item-label caption>cloud form</q-item-label>
                      <q-tooltip
                        :delay="300"
                        content-class="text-white bg-primary"
                        >find most similar cloud form</q-tooltip
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-close-popup
                    @click="similarGraph('marry')"
                  >
                    <q-item-section>
                      <q-item-label>Gale–Shapley algorithm</q-item-label>
                      <q-item-label caption>cloud form</q-item-label>
                      <q-tooltip
                        :delay="300"
                        content-class="text-white bg-primary"
                        >find most similar cloud form</q-tooltip
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-btn-group>

            <q-expansion-item
              expand-separator
              icon="assessment"
              :label="'DISTANCE TABLE: ' + distTitle[currentDist]"
              header-class="text-black"
              :class="{ hidden: !this.$store.state.showCloseGraph }"
            >
              <div class="q-pa-md">
                <q-table
                  :title="distTitle[currentDist]"
                  :data="rows"
                  :columns="columns"
                  row-key="name"
                  @row-click="onRowClick"
                  :filter="filter"
                  v-model:pagination="pagination"
                  style="position: relative"
                >
                  <template v-slot:top-right>
                    <q-input
                      borderless
                      dense
                      debounce="300"
                      v-model="filter"
                      placeholder="Search"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </template>
                </q-table>
              </div>
            </q-expansion-item>

            <!-- <div class="col-1">
              <q-btn label="Show" dense type="submit" color="primary" no-caps />
            </div> -->
            <!-- <q-btn label="Download graph" color="primary" no-caps dense/> red-6-->
            <q-btn-group spread dense>
              <q-btn
                flat
                dense
                icon="cloud_download"
                color="primary"
                @click="downloadGraphAsPng()"
              >
                <q-tooltip :delay="300" content-class="text-white bg-primary"
                  >download the graph as png</q-tooltip
                >
              </q-btn>
              <q-btn
                flat
                dense
                icon="cloud_download"
                color="orange"
                @click="exportData()"
              >
                <q-tooltip :delay="300" content-class="text-white bg-secondary"
                  >export data as .json</q-tooltip
                >
              </q-btn>
            </q-btn-group>
          </div>
        </q-form>

        <q-space />
        <div class="q-pa-lg">
          <q-option-group
            v-model="labeldisplay"
            :options="labeldisplayoptions"
            color="primary"
            inline
            dense
            @input="labeldisplaychanged"
          />
        </div>
        <div class="row">
          <div class="col self-center">
            <q-toggle
              v-model="squareit"
              icon="border_all"
              :class="{ hidden: dimension < 2 || ytypemodel != xtypemodel }"
              @input="drawit"
            >
              <q-tooltip>square the chart</q-tooltip>
            </q-toggle>
          </div>
          <div class="col self-center">
            <q-knob
              :angle="90"
              :min="0"
              :max="360"
              :step="45"
              show-value
              font-size="10px"
              class="q-ma-md"
              v-model="labelrotation"
              size="80px"
              :thickness="0.25"
              color="primary"
              track-color="grey-4"
              @change="drawit"
            >
              {{ labelrotation }}°
              <q-tooltip :delay="300" content-class="text-white bg-primary"
                >label rotation</q-tooltip
              >
            </q-knob>
          </div>
        </div>

        <!-- 
            size="150px"   
            :thickness="0.22"
            -->
      </div>
    </div>
    <div class="q-pa-md row q-col-gutter-sm"></div>

    <q-drawer
      v-model="showLanguageSelector"
      :breakpoint="1000"
      :width="600"
      overlay
      bordered
      side="right"
      dense
      elevated
    >
      <div class="q-pa-sm">
        <div class="row">
          <div class="col">
            <q-tree
              :nodes="labelTree"
              node-key="label"
              :tick-strategy="'leaf'"
              dense
              v-model="selectedLabels"
              :ticked.sync="selectedLabels"
              :expanded.sync="expandedLanguages"
            >
              <template v-slot:default-header="prop">
                <div class="row items-center">
                  <div :class="'rounded-borders small text-' + prop.node.color">
                    {{ prop.node.label }}
                  </div>
                  &nbsp;

                  <q-icon
                    :name="prop.node.icon || 'fiber_manual_record'"
                    :color="prop.node.color || 'black'"
                  />
                </div>
              </template>
            </q-tree>
          </div>
          <div class="col">
            <q-tree
              :nodes="languageTree"
              node-key="label"
              :tick-strategy="'leaf'"
              dense
              v-model="selectedLanguages"
              :ticked.sync="selectedLanguages"
              :expanded.sync="expandedLanguages"
            >
              <template v-slot:default-header="prop">
                <div class="row items-center">
                  <div :class="'rounded-borders small text-' + prop.node.color">
                    {{ prop.node.label }}
                  </div>
                  &nbsp;
                  <q-icon
                    :name="prop.node.icon || 'fiber_manual_record'"
                    :color="prop.node.color || 'black'"
                  />
                </div>
              </template>
            </q-tree>
          </div>
        </div>
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="check" color="primary" @click="applyLanguageSelection">
          <q-tooltip>Show only the selected languages</q-tooltip>
        </q-btn>
      </q-page-sticky>
    </q-drawer>
  </q-page>
</template>

<script>
//  @outside-click="toggleLanguageDrawer"
//           @keydown.esc="toggleLanguageDrawer"
//           @mouseout="toggleLanguageDrawer"
import api from "../boot/backend-api";
import BubbleChart from "../components/charts/BubbleChart";
import { ref } from "vue";
import { exportFile } from "quasar";
import { colors } from "quasar";

colors.setBrand("limeGreen", "#DDD");
// import Vue from 'vue'
var canvas = require("canvas");
// var jsdom = require('jsdom');
// C2S = require('canvas2svg');

// var document = jsdom.jsdom();
// var ctx = new C2S({document: document});

var pngfilename = "graph.png";
function savePngAs(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", pngfilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const columns = [
  {
    name: "graph name",
    required: true,
    label: "graph name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "distance",
    required: true,
    align: "center",
    label: "distance",
    field: "distance",
    sortable: true,
  },
];
const distTitle = {
  dep: "language distribution",
  dtw: "DTW (cloud form)",
  marry: "stable matching (cloud form)",
};

export default {
  name: "PageIndex",
  components: {
    BubbleChart,
  },

  data() {
    this.$store.commit("setPage", true);
    return {
      chartdata: null,
      selectedChartData: null,
      closeChartdata: null,
      plotData: null,
      scheme: "SUD",
      xtypemodel: "head-initiality",
      ytypemodel: "head-initiality",
      xtypeoptions: ["head-initiality", "distance", "distribution"],
      ytypeoptions: ["head-initiality", "distance", "distribution"],
      loading: false,
      dimension: 2,
      xmodel: "subj",
      ymodel: "comp",
      fxoptions: ["subj", "comp"],
      fyoptions: ["subj", "comp"],
      xoptions: ["subj", "comp"],
      yoptions: ["subj", "comp"],
      labelrotation: 0,
      nblang: 0,
      xminocc: 0,
      yminocc: 0,
      freqMax: [100, 100],
      xymax: 100,
      xlimMin: 0,
      squareit: false,
      currentDist: "dep",
      distTitle,
      pointStyle2Icon: {
        circle: "fiber_manual_record",
        triangle: "change_history",
        plus: "add",
        square: "square",
        crossRot: "close",
        cross: "close",
        star: "star",
      },
      color2color: {
        limeGreen: "light-green-14",
        olive: "lime-10",
        royalBlue: "blue-13",
        cadetBlue: "teal-4",
      },
      languages: [],
      languageGroups: [],
      languageTree: [],
      labelTree: [],
      selectedLanguages: ref([]),
      selectedLabels: ref([]),
      expandedLanguages: ["All Languages", "All Language Labels"],
      labeldisplay: "auto",
      labeldisplayoptions: [
        {
          label: "no labels",
          value: false,
        },
        {
          label: "auto",
          value: "auto",
        },
        {
          label: "all labels",
          value: true,
        },
        {
          label: "selected",
          value: "selected",
        },
      ],
      dimensionOptions: [
        { label: "Graph 1D", value: 1 },
        { label: "Graph 2D", value: 2 },
        // {label: 'Graph 3D', value: 3},
      ],
      rows: [{ name: "self", distance: 0 }],
      columns,
      filter: "",
      loadingTable: false,
      pagination: {
        sortBy: "distance",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 40,
      },
    };
  },
  computed: {
    showLanguageSelector() {
      return this.$store.state.showLanguageSelector;
    },
    displayoptions() {
      return this.getDisplayOptions(
        this.xtypemodel,
        this.xmodel,
        this.ytypemodel,
        this.ymodel,
        this.xlimMin
      );
    },
    schema() {
      return this.$store.state.sche;
    },
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    },

    noResults() {
      //hide 'similar graph' buttons of options for which we have no relevant results
      if (
        this.dimension == 2 &&
        (this.xtypemodel != "distribution" || this.ytypemodel != "distribution")
      ) {
        this.$store.commit("showCloseGr", false);
        return true;
      }

      var isFlex =
        this.xtypemodel == "flexibility" ||
        this.xtypemodel == "flexibility-cfc" ||
        this.xtypemodel == "flex_compare_Bakker";
      var isInf =
        this.scheme == "UD" &&
        (this.xmodel.slice(0, 2) == "nb" ||
          (this.xtypemodel == "distribution" && this.xmodel == "total"));
      return (
        isInf ||
        this.xtypemodel == "treeHeight" ||
        this.ytypemodel == "treeHeight" ||
        isFlex
      );
    },
  },

  watch: {
    schema(newSchema, oldSchema) {
      console.log(`We have ${newSchema} now, yay!`);
      this.getOptions();
      this.scheme = newSchema;
    },
  },

  mounted() {
    (this.$refs.bubblechart.mainChart.canvas.parentNode.style.width = this
      .$store.state.showCloseGraph
      ? "35vw"
      : "88vh"), //'44vh';//'88vh';
      (this.$refs.bubblechart.closeChart.canvas.parentNode.style.width =
        "35vw"), //'44vh';//'88vh';
      this.getTypes();

    // this.getChartdata();
  },
  methods: {
    similarGraph(version) {
      console.log("similarity...");
      if (!this.$store.state.showCloseGraph || this.currentDist == version) {
        this.$store.commit("showCloseGr", !this.$store.state.showCloseGraph); //this.showCloseGr);
      }
      this.currentDist = version;
      if (this.$store.state.showCloseGraph) {
        this.updateSimilarGraph(version);
      }
    },
    toggleLanguageDrawer() {
      this.$store.commit("showHideLanguageSelector", false);
    },
    computeSelectedChartData() {
      this.selectedChartData = this.chartdata
        .filter((la) =>
          this.selectedLanguages.includes(la.label[0].split("/")[0])
        )
        .map((la) => {
          la.data[0].label = this.selectedLabels.includes(
            la.label[0].split("/")[0]
          )
            ? la.label[0].split("/")[0]
            : "";
          return la;
        });
    },
    applyLanguageSelection() {
      this.toggleLanguageDrawer();
      this.computeSelectedChartData();
      this.drawit();
    },
    languageList2Trees() {
      const allLanguages = {
        label: "All Languages",
        icon: "language",
        color: "primary",
        children: Object.entries(this.languageGroups).map(
          ([group, languages]) => {
            // console.log(222, group, languages);
            return {
              label: group,
              children: languages,
              icon: languages[0].icon,
              color: languages[0].color,
            };
          }
        ),
      };
      const allLanguageLabels = {
        label: "All Language Labels",
        icon: "abc",
        color: "primary",
        children: Object.entries(this.languageGroups).map(
          ([group, languages]) => ({
            label: group,
            children: languages,
            icon: languages[0].icon,
            color: languages[0].color,
          })
        ),
      };
      this.languageTree = [allLanguages];
      this.labelTree = [allLanguageLabels];
      console.log(111, this.languageTree);
    },

    updateSimilarGraph(version) {
      const mytyp =
        this.dimension == 1
          ? [this.xtypemodel]
          : [this.xtypemodel, this.ytypemodel];
      const myax =
        this.dimension == 1 ? [this.xmodel] : [this.xmodel, this.ymodel];
      api
        .getSimilarGraph({
          typ: mytyp,
          ax: myax,
          version: version,
          dim: this.dimension,
        })
        .then((response) => {
          var cl_xtype = response.data.types;
          var cl_ax = response.data.ax;
          var cl_dist = response.data.distance;
          this.rows = response.data.rows;
          this.drawClose(cl_xtype, cl_ax);
        })
        .catch((error) => {
          this.$q.notify({
            message: `get similar Graphs: ${error}`,
            color: "negative",
            position: "bottom",
          });
        });
    },

    onRowClick(evt, row) {
      api
        .getGraphParam({
          name: row.name,
          dim: this.dimension,
        })
        .then((response) => {
          var r_xtype = response.data.types;
          var r_ax = response.data.ax;
          this.drawClose(r_xtype, r_ax);
        })
        .catch((error) => {
          this.$q.notify({
            message: `get similar Graphs in row: ${error}`,
            color: "negative",
            position: "bottom",
          });
        });
    },

    setDimension(dim) {
      this.dimension = dim;
      //this.showCloseGr = false;
      this.$store.commit("showCloseGr", false);
      this.labelrotation = 0;
      //if (dim == 1){ this.labelrotation = 90;}
      this.getChartdata();
      this.$refs.bubblechart.changeDim(dim);
      this.$refs.bubblechart.setData(
        true,
        this.chartdata,
        this.getDisplayOptions(
          this.xtypemodel,
          this.xmodel,
          this.ytypemodel,
          this.ymodel,
          this.xlimMin
        )
      );
    },

    getTypes() {
      api
        .getTypes()
        .then((response) => {
          // both choices in the measure selection are the same:
          this.xtypeoptions = response.data.types;
          this.ytypeoptions = response.data.types;
          this.getOptions();
        })
        .catch((error) => {
          this.$q.notify({
            message: `getTypes: ${error}`,
            color: "negative",
            position: "bottom",
          });
        });
    },

    goodSelection(opts) {
      if (this.scheme == "SUD") {
        if (opts.includes("subj")) return "subj";
        if (opts.includes("VERB-comp:obj-NOUN")) return "VERB-comp:obj-NOUN";
      }
      if (this.scheme == "UD") {
        if (opts.includes("nsubj")) return "nsubj";
        if (opts.includes("obj")) return "obj";
      }
      return opts[0];
    },

    async getOptions() {
      this.loading = true;
      var xoptions = await this.getRelationsOptions(this.xtypemodel);
      if (xoptions !== undefined && !xoptions.includes(this.xmodel))
        this.xmodel = this.goodSelection(xoptions);
      this.xoptions = xoptions;

      var yoptions = await this.getRelationsOptions(this.ytypemodel);
      if (yoptions !== undefined && !yoptions.includes(this.ymodel))
        this.ymodel = this.goodSelection(yoptions);
      this.yoptions = yoptions;
      this.getChartdata();
    },

    async getRelationsOptions(tymo) {
      try {
        const x = await api.getOptions({ type: tymo });
        return x.data.options;
      } catch (error) {
        console.log(error);
      }
    },

    filterOpt(val, update) {
      if (val == "") {
        update(() => {
          this.fxoptions = this.xoptions;
          this.fyoptions = this.yoptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.fxoptions = this.xoptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
        this.fyoptions = this.yoptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    downloadGraphAsPng() {
      pngfilename =
        this.setTitle(
          [this.xtypemodel, this.ytypemodel],
          [this.xmodel, this.ymodel]
        ) + ".png"; //this.getDisplayOptions().title.text+'.png';
      this.$refs.bubblechart.mainChart.canvas.toBlob(function (blob) {
        savePngAs(blob, pngfilename);
      });
      this.$q.notify({ message: `File download started`, color: "positive" });
    },

    exportData() {
      const filename =
        this.setTitle(
          [this.xtypemodel, this.ytypemodel],
          [this.xmodel, this.ymodel]
        ) + ".json"; //this.getDisplayOptions().title.text+'.json';

      this.plotData = "";
      for (var i in this.chartdata) {
        this.plotData +=
          '\n{\n"label": ' +
          JSON.stringify(this.chartdata[i]["label"]) +
          ",\n" +
          '"data": ' +
          JSON.stringify(this.chartdata[i]["data"]) +
          "\n}\n,";
      }
      this.plotData =
        "[" + this.plotData.substring(0, this.plotData.length - 1) + "]";

      const status = exportFile(filename, this.plotData, "text/json");
      if (status == true) {
        this.$q.notify({
          message: `Json file download started`,
          color: "positive",
        });
      } else {
        this.$q.notify({
          message: `Download error: ${status}`,
          color: "negative",
        });
      }
    },

    drawit() {
      var disopt = this.getDisplayOptions(
        this.xtypemodel,
        this.xmodel,
        this.ytypemodel,
        this.ymodel,
        this.xlimMin
      );
      if (this.squareit && this.dimension > 1) {
        disopt.scales.yAxes[0].ticks = { min: 0, max: this.xymax };
        disopt.scales.xAxes[0].ticks = {
          min: 0,
          max: this.xymax,
          fontFamily: "Lato",
          fontColor: "#abc",
          fontSize: 12,
        };
      }
      this.$refs.bubblechart.setData(true, this.selectedChartData, disopt);
      this.loading = false;
    },

    getChartdata() {
      if (!this.xoptions.includes(this.xmodel)) {
        console.log("choice not among options. returned");
        return;
      }
      this.loading = true;

      const graphPara = {
        axtypes: [this.xtypemodel],
        ax: [this.xmodel],
        axminocc: [this.xminocc],
      };
      if (this.dimension > 1) {
        //2d
        graphPara["axtypes"].push(this.ytypemodel);
        graphPara["ax"].push(this.ymodel);
        graphPara["axminocc"].push(this.yminocc);
      }
      //todo 3d
      if (this.$store.state.showCloseGraph) {
        this.updateSimilarGraph(this.currentDist);
      }
      api
        .getData({
          axtypes: graphPara["axtypes"],
          ax: graphPara["ax"],
          axminocc: graphPara["axminocc"],
          dim: this.dimension,
        })
        .then((response) => {
          this.nblang = response.data.nblang;
          this.xymax = response.data.xymax;
          this.xlimMin = response.data.xlimMin;
          this.freqMax = response.data.freqMax;
          this.$q.notify({
            message:
              `That worked! Check out the cloud of ` +
              this.nblang +
              ` languages!`,
            color: "positive",
            position: "bottom",
          });
          if (this.chartdata) {
            // Loop through response.data.chartdata
            response.data.chartdata.forEach((chartDataItem) => {
              const chartDataLanguage = chartDataItem.label[0];

              // Check if language exists in this.chartdata
              const languageIndex = this.chartdata.findIndex(
                (lang) => lang.label[0] === chartDataLanguage
              );

              if (languageIndex !== -1) {
                // Language exists in this.chartdata, copy data array
                // this.chartdata[languageIndex].data = chartDataItem.data;
                this.chartdata[languageIndex].data = JSON.parse(
                  JSON.stringify(chartDataItem.data)
                );
              } else {
                // Language doesn't exist in this.chartdata, add chartDataItem to this.chartdata
                this.chartdata.push(JSON.parse(JSON.stringify(chartDataItem)));
              }
            });

            // Loop through this.chartdata and remove languages that don't exist in response.data.chartdata
            for (let i = this.chartdata.length - 1; i >= 0; i--) {
              const chartDataLanguage = this.chartdata[i].label[0];

              const responseLanguageIndex = response.data.chartdata.findIndex(
                (lang) => lang.label[0] === chartDataLanguage
              );

              if (responseLanguageIndex === -1) {
                // Language doesn't exist in response.data.chartdata, remove from this.chartdata
                this.chartdata.splice(i, 1);
              }
            }
          } else this.chartdata = response.data.chartdata; // if i don't have an old chartdata, i make a first one.
          console.log(
            "===1",
            response.data.chartdata.length == this.chartdata.length,
            response.data.chartdata.length,
            this.chartdata.length
            // JSON.stringify(this.chartdata)
          );

          this.languages = this.chartdata.map((la) => ({
            value: la.data[0].label,
            label: la.data[0].label,
            group: la.label[0].split("/")[1],
            color: la.borderColor,
            pointStyle: la.pointStyle,
          }));
          console.log(
            "===",
            this.languages.length == this.chartdata.length,
            this.languages.length,
            this.languages
          );

          // build an object {languageGroup:[{label:languageName, ...}]} for each group and language
          this.languageGroups = this.languages.reduce((result, language) => {
            (result[language.group]
              ? result[language.group]
              : (result[language.group] = [])
            ).push({
              label: language.label,
              icon: this.pointStyle2Icon[language.pointStyle],
              color: this.color2color[language.color] || language.color,
            });
            return result;
          }, {});

          console.log(777, this.languageGroups["Indo-European-Baltoslavic"]);
          // initializing the selectedLanguages and selectedLabels if they are empty:
          if (this.selectedLanguages.length == 0)
            this.selectedLanguages = this.chartdata.map(
              (la) => la.data[0].label
            );
          if (this.selectedLabels.length == 0)
            this.selectedLabels = this.chartdata.map((la) => la.data[0].label);
          this.languageList2Trees(); // building the this.languageTree abd this.labelTree
          this.computeSelectedChartData();
          this.drawit();
        })
        .catch((error) => {
          this.$q.notify({
            message: `${error}`,
            color: "negative",
            position: "bottom",
          });
        });
    },

    drawClose(xtypes, xmodels) {
      this.loading = true;
      var axmin = this.dimension == 1 ? [0] : [0, 0];
      api
        .getData({
          axtypes: xtypes,
          ax: xmodels,
          axminocc: axmin,
          dim: this.dimension,
        })
        .then((response) => {
          const nblang = response.data.nblang;
          //const xymax = response.data.xymax;
          this.$q.notify({
            message:
              `That worked! Check out the cloud of` + nblang + ` languages!`,
            color: "positive",
            position: "bottom",
          });
          if (this.closeChartdata) {
            // copy into old data to get the dots moving
            const lang2data = response.data.chartdata.reduce(function (
              result,
              item
            ) {
              result[item.label[0]] = item;
              return result;
            },
            {});

            for (let [index, la] of this.closeChartdata.entries()) {
              if (la.label[0] in lang2data) {
                la.data = lang2data[la.label[0]].data;
                delete lang2data[la.label[0]];
              } else this.closeChartdata.splice(index, 1);
            }
            console.log(lang2data);
            for (var la in lang2data) {
              this.closeChartdata.push(lang2data[la]);
            }
            console.log(77777, la);
          } else this.closeChartdata = response.data.chartdata;
          //this.drawit();
          var disopt =
            this.dimension == 1
              ? this.getDisplayOptions(
                  xtypes[0],
                  xmodels[0],
                  xtypes[0],
                  xmodels[0],
                  response.data.xlimMin
                )
              : this.getDisplayOptions(
                  xtypes[0],
                  xmodels[0],
                  xtypes[1],
                  xmodels[1],
                  response.data.xlimMin
                );
          this.$refs.bubblechart.setData(false, this.closeChartdata, disopt);
          this.loading = false;
        })
        .catch((error) => {
          this.$q.notify({
            message: `${error}`,
            color: "negative",
            position: "bottom",
          });
        });
    },

    setTitle(typemodel, axmodel) {
      var graphtitle;
      if (this.dimension == 1) {
        graphtitle = typemodel[0] + ": " + axmodel[0];
      } else {
        graphtitle =
          typemodel[0] == typemodel[1]
            ? typemodel[0] + ": " + axmodel[0] + "::" + axmodel[1]
            : typemodel[0] +
              "::" +
              typemodel[1] +
              ": " +
              axmodel[0] +
              "::" +
              axmodel[1];
      }
      return graphtitle;
    },

    getDisplayOptions(xtype, xmodel, ytype, ymodel, xlimMin) {
      const pad = 100 * (this.dimension > 1);
      const squee = 5 * (this.dimension == 1);

      var graphtitle = this.setTitle([xtype, ytype], [xmodel, ymodel]);
      return {
        aspectRatio: 1, //aspectRatio = r:  can get a width/height=2 graph with r = 1, find out a sol
        devicePixelRatio: 3,
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        // animation: {
        //   duration: 5000,
        //   easing: 'easeOutQuart',
        // },
        layout: {
          padding: {
            right: pad, //show label at right of xmax
            bottom: pad + squee,
            top: squee,
            left: squee * 2,
          },
        },

        plugins: {
          datalabels: {
            // anchor: function (context) {
            //     // var value = context.dataset.data[context.dataIndex];
            //     // return value.x < 1000 ? 'end' : 'center';
            //     // return 'right' ;
            //     return 'bottom' ;
            // },
            // align: function (context) {
            //     var value = context.dataset.data[context.dataIndex];
            //     return  'end';
            // },
            color: function (context) {
              // var value = context.dataset.data[context.dataIndex];
              // return value.x < 50 ? context.dataset.borderColor : 'white';
              return context.dataset.borderColor;
            },
            // textAlign: 'right',
            // font: {
            // weight: 'bold',
            // },
            // formatter: function (value, context) {
            //     return context.dataset.label + '\n' + Math.round(value.x);
            // },
            offset: 1,
            rotation: this.labelrotation,
            // padding: 200,
            clamp: true,
            display: this.labeldisplay, //'auto',
            anchor: "center", //    'center', 'start' 'end'
            align: "right", //(this.dimension == 1)?"bottom" : "right"  //'center' 'start''end''right' 'bottom' 'left' 'top':
          },
        },

        title: {
          display: true,
          text: graphtitle,
        },
        scales: {
          xAxes: [
            {
              // display: true,
              // gridLines:[{    drawBorder: true, display: true,color:'rgb(255, 159, 64)'}],
              //position:'right',
              ticks: {
                display: this.dimension > 1,
                suggestedMin: this.dimension > 1 ? xlimMin : 0,
              },

              gridLines: {
                display: this.dimension > 1,
                //drawOnChartArea: this.dimension>1,
              },

              scaleLabel: {
                display: this.dimension > 1,
                labelString: xmodel,
              },
            },
          ],

          yAxes: [
            {
              gridLines: {
                drawOnChartArea: this.dimension > 1,
              },
              //position: (this.dimension == 1)?"top" : "bottom" ,

              scaleLabel: {
                display: true,
                labelString: this.dimension > 1 ? ymodel : xmodel,
              },
            },
          ],
        },
      };
    },

    labeldisplaychanged(v) {
      this.$store.commit("showHideLanguageSelector", v == "selected");
      this.$store.commit("showHideLanguageButton", v == "selected");
      // this.showLanguageSelector = (v == 'selected')
      this.$refs.bubblechart.setDisplayLabels(v);
    },
  },
};
</script>
<style>
.q-item {
  font-size: 10px;
}
.q-checkbox .q-checkbox__check {
  background-color: inherit;
}
</style>
