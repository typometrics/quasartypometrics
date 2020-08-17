<template>
  <q-page class="full-width row no-wrap justify-around items-start content-between q-col-gutter-lg" >
    <div class="">
      <div class="col-4"  >
          <bubble-chart ref="bubblechart" class="col-2" :chartdata="chartdata" :displayoptions="displayoptions" ></bubble-chart>
      </div>
    </div>

    <div class="col-2 self-center">
      <div class="column q-col-gutter-lg">
          <!-- <div class="q-pa-md"> -->
        <!-- <q-form @submit="showIt" class="q-gutter-md"> -->
        <q-form class="q-gutter-md">
          <div class="column q-gutter-lg  justify-center">
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
                :options="xoptions"
                @input="getChartdata()"
                label="x-Axis"
              />
            </div>
            <q-space/>
            <div class="col-2">
              <q-select
                v-model="ytypemodel"
                :options="ytypeoptions"
                @input="getOptions()"
                label="measure y-Axis"
              />
            </div>
            <div class="col-2">
              <q-select
                v-model="ymodel"
                :options="yoptions"
                @input="getChartdata()"
                label="y-Axis"
              />
            </div>
            <!-- <div class="col-1">
              <q-btn label="Show" dense type="submit" color="primary" no-caps />
            </div> -->
            <!-- <q-btn label="Download graph" color="primary" no-caps dense/> -->
            <q-btn flat dense icon="cloud_download" color="primary" @click="downloadGraphAsPng()">
               <q-tooltip :delay="300" content-class="text-white bg-primary" >download the graph as png</q-tooltip>
            </q-btn>
            <!-- <q-btn label="Try" @click="trystuff()" color="secondary" no-caps /> -->
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

        </div>
      </div>
    </div>
  
  </q-page>
</template>


<script>
import api from "../boot/backend-api";
import BubbleChart from "../components/charts/BubbleChart";
// import Vue from 'vue'

var pngfilename='graph.png';
function savePngAs(blob,filename ) { 
  // console.log(this.yoptions) 
  const url = window.URL.createObjectURL(blob);
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
    return {
      chartdata: null,
      xtypemodel: 'direction',
      ytypemodel: 'direction',
      xtypeoptions: ["direction", "distance", "distribution"],
      ytypeoptions: ["direction", "distance", "distribution"],
      
      xmodel: 'subj',
      ymodel: 'comp',
      xoptions: ["subj", "comp"],
      yoptions: ["subj", "comp"],

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
      ]
     
    };
  },
    computed: {
        
        displayoptions() {return this.getDisplayOptions()},
        
    },
  mounted() {
    this.$refs.bubblechart.mainChart.canvas.parentNode.style.width = '88vh';
    this.getTypes()
    // this.getChartdata();
  },
  methods: {
    trystuff() { // used for testing with the test button
      console.log('trying...')
    },
    // chartdata() {return this.getChartdata()},
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
      if (opts.includes('subj')) return 'subj'
      if (opts.includes('VERB-comp:obj-NOUN')) return 'VERB-comp:obj-NOUN'
      return opts[0]
    },

    async getOptions() {
      // console.log("getOptions",this.xoptions,  this.yoptions)
      var xoptions = await this.getRelationsOptions(this.xtypemodel);
      if ((xoptions !== undefined) && !xoptions.includes(this.xmodel)) this.xmodel = this.goodSelection(xoptions);
      this.xoptions = xoptions
      
      var yoptions = await this.getRelationsOptions(this.ytypemodel);
      if ((yoptions !== undefined) && !yoptions.includes(this.ymodel)) this.ymodel = this.goodSelection(yoptions);
      this.yoptions = yoptions

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

    
    downloadGraphAsPng() {
      pngfilename = this.getDisplayOptions().title.text+'.png';
      this.$refs.bubblechart.mainChart.canvas.toBlob(function(blob) {
          savePngAs(blob, pngfilename);
      });
      this.$q.notify({message:`File download started`,color: "positive"});
   

    },
   
  
    getChartdata() {
      // console.log('getChartdata')
      if (!(this.xoptions.includes(this.xmodel)) )
        {console.log(99999,'returned');return}
    
      api
        .getData({ 
                  xtype: this.xtypemodel, x:this.xmodel,
                  ytype: this.ytypemodel, y:this.ymodel
                  })
        .then(response => {
          // console.log(66565,this.xmodel)
          this.$q.notify({
            message: `That worked! Check out the cloud of languages!`,
            color: "positive",
            position: "bottom"
          });
          this.$refs.bubblechart.setData(response.data.chartdata, this.getDisplayOptions());
          return response.data.chartdata;
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
      return {
        aspectRatio:1,
        devicePixelRatio:3,
        maintainAspectRatio: true,
        legend: { display:false},
        // animation: {
        //   duration: 5000,
        //   easing: 'easeOutQuart',
        // },
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
            // rotation: 315
            // padding: 20
            clamp: true,
            display: this.labeldisplay, //'auto',
            anchor: 'center', //    'center', 'start' 'end'
            align: 'right' //'center' 'start''end''right' 'bottom' 'left' 'top':

          }
        },

        title: {
          display: true,
          text: (this.xtypemodel==this.ytypemodel) ? this.xtypemodel+': '+this.xmodel+'::'+this.ymodel : this.xtypemodel+'::'+this.ytypemodel+': '+this.xmodel+'::'+this.ymodel 
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.ymodel
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.xmodel
            }
          }]
        }
        }      
    },

    labeldisplaychanged(v) { 
     this.$refs.bubblechart.setDisplayLabels(v)
		},

  }
};
</script>

