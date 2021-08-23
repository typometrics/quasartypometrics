<template>
  <div class="bg-white full-width">
    <!-- <q-card-section class="bg-blue-grey-8">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 text-white text-center">Bubble Chart</div>
        </div>
      </div>
    </q-card-section> -->
    <div class="col" style= "position: relative;  width:50vw">
    <!-- <q-card-section style="position: relative;  width:40vw"> -->
      <canvas id="bubble-chart"></canvas>
    <!-- </q-card-section> -->
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels.min.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.defaults.global.animation.duration = 2000;
Chart.defaults.diagonalBubble = Chart.defaults.bubble;
var custom = Chart.controllers.bubble.extend({
    draw: function(ease) {
        // Call super method first
        // this.chart.chart.animating=true;
        // console.log(666,this.chart.chart)
        Chart.controllers.bubble.prototype.draw.call(this, ease);
        var ctx = this.chart.chart.ctx;
        ctx.strokeStyle='lightGrey'
        var ca = this.chart.chart.chartArea
        ctx.beginPath();
        ctx.moveTo(ca.left,ca.bottom);
        ctx.lineTo(ca.right,ca.top);
        ctx.stroke(); 
        ctx.save(); 
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.chart.chart.width, this.chart.chart.height);
        ctx.restore();
    }
});
Chart.controllers.diagonalBubble = custom;


Chart.defaults.simpleBubble = Chart.defaults.bubble;
var custom1 = Chart.controllers.bubble.extend({
    draw: function(ease) {
        // Call super method first
        // this.chart.chart.animating=true;
        // console.log(666,this.chart.chart)
        Chart.controllers.bubble.prototype.draw.call(this, ease);
        var ctx = this.chart.chart.ctx;
        ctx.strokeStyle='lightGrey'
        var ca = this.chart.chart.chartArea
        ctx.beginPath();
        ctx.moveTo(ca.left,ca.bottom);
        ctx.lineTo(ca.left,ca.top);
        ctx.stroke(); 
        ctx.save(); 
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.chart.chart.width, this.chart.chart.height);
        ctx.restore();
    }
});
Chart.controllers.simpleBubble = custom1;



export default {
  props: ["chartdata", "displayoptions"],
  computed: {
  
  },

  data () {
    return {
      mainChart : null,
      dim: 2,
      // thislabeldisplay: null
    }
  },


  mounted () {
    this.mainChart =  this.createChart('bubble-chart')
    // console.log(3333,this.mainChart)
    // console.log(3333,this.mainChart.chartArea.bottom);
 

//    
  },
  methods: {
    changeDim(newDim){
      this.dim = newDim;
      this.mainChart.destroy();
      this.displayoptions.aspectRatio = newDim/2;//(newDim == 1)?2:1;
      //console.log("3 ratiooo ",this.mainChart.options.aspectRatio);
      this.mainChart = this.createChart('bubble-chart');
      this.mainChart.canvas.parentNode.style.width =(newDim == 1)?'44vh':'88vh'; //'24vw':'48vw';
    },

    setData(dataset, displayoptions) {
      //console.log('+++bubble',dataset)
      this.mainChart.data.datasets = dataset;
      this.mainChart.options = displayoptions;
      //console.log("1 setdata ratiooo ",this.mainChart.options.aspectRatio, this.displayoptions.aspectRatio );
      this.mainChart.update();
     
    },
    setDisplayLabels: function(v) {
      console.log('----bubble',v)
      this.mainChart.options.plugins.datalabels.display = v;
      this.mainChart.update();
   
    },
 

    createChart (chartId) {
      console.log(555,this.displayoptions.animation)
      const ctx = document.getElementById(chartId)
      console.log("--------------------ctx",ctx, "\ndimension", this.dim);
      const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        //type: 'diagonalBubble', //scatter also works but tooltip is different
        //type:'bubble', ////scatter also works but tooltip is different
        type: (this.dim == 1)?'simpleBubble' :'diagonalBubble', //if 'bubble' there is no background when download
        //tooltipCaretSize:0,
        data: this.chartdata,
        options: this.displayoptions
      })
      return myChart
    },


  
  }
}


</script>

<style>
</style>
