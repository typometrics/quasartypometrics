<template>
  <q-page class="full-width row no-wrap justify-around items-start content-between q-col-gutter-lg" >
    <div class="">
      <div class="col-4" style= "position: relative;"  >
		  
          <bubble-chart ref="bubblechart" class="col-2" :chartdata="chartdata" :displayoptions="displayoptions" ></bubble-chart>
      </div>
    </div>

    <div class="col-2 self-center">
		<q-spinner color="primary" size="10em" :class="{ hidden : !loading }" :thickness="10"/>
      <div class="column q-col-gutter-lg">
          <!-- <div class="q-pa-md"> -->
        <!-- <q-form @submit="showIt" class="q-gutter-md"> -->
        <q-form class="q-gutter-md">
          <div class="column q-gutter-lg  justify-center">
                  <q-space />
            <!-- <div class="col-2">
              <q-select
                v-model="scheme"
                :options="schemeoptions"
                @input="getOptions()"
                label="annotation scheme"
              /> 
            </div> 
             -->

            
            <div class="q-gutter-y-lg" >
                <q-btn-toggle dense
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
              <q-select
                v-model="xtypemodel"
                :options="xtypeoptions"
                @input="getOptions()"
                label="measure x-Axis"
              />
            </div>

            <div class="col-2">
              <q-select
                v-model="xmodel"
                use-input
                hide-selected
                fill-input
                input-debounce="300"
                :options="fxoptions"
                @filter="filterOpt"
                @input="getChartdata()"
                label="x-Axis" 
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
              :max="100"
              label
              :label-value="(xminocc>0)?'at least '+xminocc+' occurrences for '+xmodel:'no filter on minimum occurrences for '+xmodel"
              @change="getChartdata()"
            />
            
            

            <!-- <q-table
            title="cloud form distance"
            :rows="rows"
            :columns="columns"
            row-key="id"
            v-model:pagination="pagination"
            :loading="loading"
            :filter="filter"
            @request="onRequest"
            binary-state-sort
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

          </q-table> -->

            <div class="col-2">
              <q-select :class="{ hidden:(dimension<2) }" 
                v-model="ytypemodel"
                :options="ytypeoptions"
                @input="getOptions()"
                label="measure y-Axis"
              />
            </div>

            <div class="col-2">
              <q-select :class="{ hidden:(dimension<2) }" 
                v-model="ymodel"
                use-input
                hide-selected
                fill-input
                input-debounce="300"
                :options="fyoptions"
                @filter="filterOpt"
                @input="getChartdata()"
                label="y-Axis"
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

            <q-slider :class="{ hidden:(dimension<2) }" 
              v-model="yminocc" 
              :min="0" 
              :max="100"
              label
              :label-value="(yminocc>0)?'at least '+yminocc+' occurrences for '+ymodel:'no filter on minimum occurrences for '+ymodel"
              @change="getChartdata()"
            />
            <!-- <div class="col-1">
              <q-btn label="Show" dense type="submit" color="primary" no-caps />
            </div> -->
            <!-- <q-btn label="Download graph" color="primary" no-caps dense/> -->
            <q-btn-group spread>
              <q-btn flat dense icon="cloud_download" color="primary" @click="downloadGraphAsPng()">
                <q-tooltip :delay="300" content-class="text-white bg-primary" >download the graph as png</q-tooltip>
              </q-btn>
              <q-btn flat dense icon="cloud_download" color="orange" @click="exportData()">
                <q-tooltip :delay="300" content-class="text-white bg-secondary" >export data as .json</q-tooltip>
              </q-btn>
            </q-btn-group>


            <q-btn label="Try" @click="trystuff()" color="white" no-caps >
				<q-tooltip :delay="300" content-class="text-white bg-primary" >temporary button for development</q-tooltip>
			</q-btn>
          </div>
        </q-form>

        <q-space/>
        <div class="q-pa-lg">
          <q-option-group
            v-model="labeldisplay"
            :options="labeldisplayoptions"
            color="primary"
            inline
            dense
            @input="labeldisplaychanged"
          />
          <q-toggle 
            v-model="squareit" 
            label="square the chart" 
            icon="border_all"
            @input="drawit"
            />
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
            track-color="white"
            @change="drawit"
          >
                {{ labelrotation }}°
                <q-tooltip :delay="300" content-class="text-white bg-primary" >label rotation</q-tooltip>
          </q-knob>
            <!-- 
   size="150px"
               
             :thickness="0.22"
              -->
           
        </div>
      </div>
    </div>
  
  </q-page>
</template>


<script>
import api from "../boot/backend-api";
import BubbleChart from "../components/charts/BubbleChart";
import { ref } from 'vue'
import { exportFile } from 'quasar'
// import Vue from 'vue'
var canvas = require('canvas');
// var jsdom = require('jsdom');
    // C2S = require('canvas2svg');

// var document = jsdom.jsdom();
// var ctx = new C2S({document: document});

var pngfilename='graph.png';
function savePngAs(blob,filename ) { 
  // console.log(this.yoptions) 
  const url = window.URL.createObjectURL(blob);
  console.log("savePng url = ",url);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', pngfilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default {
  name: "PageIndex",
  components: {
    BubbleChart
  },

  data() {
    console.log("plot current page ", this.$route);
    this.$store.commit('setPage', true);

    return {
      chartdata: null,
      plotData: null,
      scheme:'SUD',
      schemeoptions:['SUD', 'UD'],
      xtypemodel: 'direction',
      ytypemodel: 'direction',
      xtypeoptions: ["direction", "distance", "distribution"],
      ytypeoptions: ["direction", "distance", "distribution"],
      loading:false,
      dimension: 2,
      xmodel: 'subj',
      ymodel: 'comp',
      fxoptions: ["subj", "comp"],
      fyoptions: ["subj", "comp"],
      xoptions: ["subj", "comp"],
      yoptions: ["subj", "comp"],
      labelrotation: 0,
      nblang:0,
      xminocc:0,
      yminocc:0,
      xymax:100,
      xlimMax:100,
      xlimMin:0,
      squareit: false,
      testit: true,
      labeldisplay: 'auto',
      labeldisplayoptions: [
        {
          label: 'no labels',
          value: false
        },
        {
          label: 'auto',
          value: 'auto'
        },
        {
          label: 'all labels',
          value: true
        }
      ],
      dimensionOptions:[
                      {label: 'Graph 1D', value: 1},
                      {label: 'Graph 2D', value: 2},
                     // {label: 'Graph 3D', value: 3},
                    ],
      rows: [],//ref([]),
      filterTable: '',//ref(''),
      loadingTable: false,//ref(false),
      pagination: [{
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    }]

     
    };
  },
    computed: {
      displayoptions() {return this.getDisplayOptions()},
		  schema () {
			   return this.$store.state.sche
			}
    },

	  watch: {
      schema (newSchema, oldSchema) {
        console.log(`We have ${newSchema} now, yay!`);
        this.scheme=newSchema;
        this.getOptions()

      }
  },

  mounted() {
    this.$refs.bubblechart.mainChart.canvas.parentNode.style.width ='88vh',//'50vw';//'88vh';
    this.getTypes()
    
    // this.getChartdata();
  },
  methods: {
    trystuff() { // used for testing with the test button, to be commented out for production
      console.log('trying...')
		// this.$store.commit('increment');
		  console.log('schema...',this.schema)
      console.log(this.chartdata)
      console.log(this.$refs.bubblechart.mainChart.chart.data.datasets)
    //   // [0].data.x)
    //   this.chartdata[0].data[0].x=this.chartdata[0].data[0].x+10;
    //   this.drawit()
    },
    // chartdata() {return this.getChartdata()},
    
    setDimension(dim){
      this.dimension = dim;
      this.labelrotation = 0;
      //if (dim == 1){ this.labelrotation = 90;}
      this.getChartdata();
      //console.log("2 change dim ratio", this.getDisplayOptions().aspectRatio);
      this.$refs.bubblechart.changeDim(dim);
      this.$refs.bubblechart.setData(this.chartdata, this.getDisplayOptions());
    },

    getTypes() {
      // console.log('getTypes')
      api
      .getTypes()
      .then(response => {
        // console.log('response.data.types',response.data.types)
        // both choices in the measure selection are the same:
        this.xtypeoptions = response.data.types;
        this.ytypeoptions = response.data.types;
        this.getOptions();
        
      })
      .catch(error => {
        this.$q.notify({
          message: `getTypes: ${error}`,
          color: "negative",
          position: "bottom"
        });
      });
     },
    
    goodSelection(opts) {
      console.log("goodSelection");
      if (this.scheme == 'SUD'){
        if (opts.includes('subj')) return 'subj'
        if (opts.includes('VERB-comp:obj-NOUN')) return 'VERB-comp:obj-NOUN'
      }
      if (this.scheme == 'UD'){
        if (opts.includes('nsubj')) return 'nsubj'
        if (opts.includes('obj')) return 'obj'
      }
      return opts[0]
    },

    async getOptions() {
		this.loading=true;
      // console.log("getOptions",this.xoptions,  this.yoptions)
      var xoptions = await this.getRelationsOptions(this.xtypemodel);
      if ((xoptions !== undefined) && !xoptions.includes(this.xmodel)) this.xmodel = this.goodSelection(xoptions);
      this.xoptions = xoptions
      
      var yoptions = await this.getRelationsOptions(this.ytypemodel);
      if ((yoptions !== undefined) && !yoptions.includes(this.ymodel)) this.ymodel = this.goodSelection(yoptions);
      this.yoptions = yoptions;

      this.getChartdata();
    },

    async getRelationsOptions(tymo) {
      // console.log('getRelationsOptions',tymo)
      try {
          const x = await api.getOptions({ type: tymo})
          return x.data.options
        }
        catch (error) {
          console.log(error);
        }
      },

    filterOpt (val, update) {
        if (val == '') {
          //console.log("hhhhhhh,    \n",this.xoptions)
          update(() => {
            this.fxoptions = this.xoptions
            this.fyoptions = this.yoptions
            //console.log(this.fxoptions);
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          this.fxoptions = this.xoptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          //console.log("after filter: ", this.fxoptions);
          this.fyoptions = this.yoptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },

    
    downloadGraphAsPng() {
      pngfilename = this.getDisplayOptions().title.text+'.png';
      this.$refs.bubblechart.mainChart.canvas.toBlob(function(blob) {
          savePngAs(blob, pngfilename);
      });
      this.$q.notify({message:`File download started`,color: "positive"});

    },

    exportData(){
      const filename = this.getDisplayOptions().title.text+'.json';
      //console.log("len = ", this.chartdata.length);

      this.plotData = ""
      for (var i in this.chartdata){
        this.plotData += '\n{\n"label": '+ JSON.stringify(this.chartdata[i]['label'])+',\n'+
                           '"data": '+ JSON.stringify(this.chartdata[i]['data'])+"\n}\n,"
      }
      //console.log("type = ", typeof this.plotData);
      this.plotData = '['+ this.plotData.substring(0, this.plotData.length-1)+']';

      const status = exportFile(filename, this.plotData, 'text/json');
      if (status == true){
        this.$q.notify({message:`Json file download started`,color: "positive"});
      }else{
        this.$q.notify({ message: `Download error: ${status}`, color: "negative"});
      }

    },


    drawit(){
      //console.log(999,newdata)
      var disopt = this.getDisplayOptions();
      if (this.squareit && (this.dimension>1)) {
        disopt.scales.yAxes[0].ticks = {min:0, max:this.xymax};
        disopt.scales.xAxes[0].ticks = {min:0, max:this.xlimMax, fontFamily: 'Lato',
           fontColor: "#abc",
           fontSize: 12,
           };
      }
      // ,mirror:true minRotation: 30
      // else {
      //   disopt.scales.yAxes[0].ticks = {};
      //   disopt.scales.xAxes[0].ticks = {};
      // }
        
      this.$refs.bubblechart.setData(this.chartdata, disopt);
      //console.log("1.5 ratio draw", disopt.aspectRatio );
	  this.loading=false;
    },
  
    getChartdata() {
      //console.log("get chart dat dimension ", this.dimension);
		if (!(this.xoptions.includes(this.xmodel)) )
			{console.log('choice not among options. returned');return}
		this.loading=true;

    const graphPara = {'axtypes': [this.xtypemodel], 'ax':[this.xmodel], 'axminocc':[this.xminocc]};
    if (this.dimension >1){ //2d
      graphPara['axtypes'].push(this.ytypemodel);
      graphPara['ax'].push(this.ymodel);
      graphPara['axminocc'].push(this.yminocc);
    }
    //todo 3d
		api
			.getData({ 
                  //xtype: this.xtypemodel, x:this.xmodel, xminocc:this.xminocc,
                  //ytype: this.ytypemodel, y:this.ymodel, yminocc:this.yminocc
                  axtypes : graphPara['axtypes'],  ax : graphPara['ax'],  axminocc : graphPara['axminocc'], dim: this.dimension
                  })
        .then(response => {
            this.nblang = response.data.nblang;
            console.log(this.nblang);
            this.xymax = response.data.xymax;
            this.xlimMax = response.data.xlimMax;
            this.xlimMin = response.data.xlimMin;
            this.$q.notify({
              message: `That worked! Check out the cloud of `+this.nblang+` languages!`,
              color: "positive",
              position: "bottom"
            });
            if (this.chartdata) // copy into old data to get the dots moving
              {
                const lang2data = response.data.chartdata.reduce(function(result, item) {
                    result[item.label[0]] = item; return result}, {});

                for (let [index, la] of this.chartdata.entries()) {
                  if (la.label[0] in lang2data) {
                    la.data = lang2data[la.label[0]].data;
                    delete lang2data[la.label[0]];
                  }
                  else this.chartdata.splice(index,1)
                }
                console.log(lang2data)
                for (var la in lang2data)
                {
                  console.log(la);
                  this.chartdata.push(lang2data[la])
                }
              }
            else this.chartdata = response.data.chartdata;  
            this.drawit();
          })
        .catch(error => {
            this.$q.notify({
              message: `${error}`,
              color: "negative",
              position: "bottom"
            });
        });
    },

    getDisplayOptions() {
      const pad = 100*(this.dimension>1);
      const squee = 5*(this.dimension == 1);
      var graphtitle;
      if(this.dimension == 1){
        graphtitle = this.xtypemodel+': '+this.xmodel;
      }else{
        graphtitle = (this.xtypemodel==this.ytypemodel) ? this.xtypemodel+': '+this.xmodel+'::'+this.ymodel : this.xtypemodel+'::'+this.ytypemodel+': '+this.xmodel+'::'+this.ymodel;
      }
      // const r = (this.dimension == 2)?1:2; 
      //console.log("0 options ratio",r);
      console.log("x min", this.xlimMin);

      return {
        aspectRatio:1, //aspectRatio = r:  can get a width/height=2 graph with r = 1, find out a sol
        devicePixelRatio:3,
        responsive: true,
        maintainAspectRatio: true,
        legend: { display:false},
        // animation: {
        //   duration: 5000,
        //   easing: 'easeOutQuart',
        // },
        layout: {
          padding: {
            right: pad, //show label at right of xmax
            bottom: pad+squee, 
            top: squee,
            left : squee*2
          }
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
                return  context.dataset.borderColor ;
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
            anchor: 'center', //    'center', 'start' 'end'
            align: 'right'//(this.dimension == 1)?"bottom" : "right"  //'center' 'start''end''right' 'bottom' 'left' 'top':

          }
        },

        title: {
          display: true,
          text: graphtitle
        },
        scales: {

          xAxes: [{
            // display: true,
            // gridLines:[{    drawBorder: true, display: true,color:'rgb(255, 159, 64)'}],
            //position:'right',
            ticks: {
              display: this.dimension>1,
              suggestedMin:(this.dimension>1)?this.xlimMin:0,
            },

            gridLines: {
              display:this.dimension>1,
              //drawOnChartArea: this.dimension>1,
            },

            scaleLabel: {
              display: this.dimension>1,
              labelString: this.ymodel
            }
          }],

          yAxes: [{
            gridLines: {
              drawOnChartArea: this.dimension>1,
            },
            //position: (this.dimension == 1)?"top" : "bottom" ,

            scaleLabel: {
              display: true,
              labelString: this.xmodel,
            }
          }]
        },
        
        }      
    },

    labeldisplaychanged(v){ 
     this.$refs.bubblechart.setDisplayLabels(v)
		}


  }
};
</script>

