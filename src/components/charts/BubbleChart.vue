<template>
  <div class = 'bg-white full-width row' >
    <!-- <q-card-section class="bg-blue-grey-8">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 text-white text-center">Bubble Chart</div>
        </div>
      </div>
    </q-card-section> -->
    <div class="col-2" :style="canvasWidth" >
    <!-- <q-card-section style="position: relative;  width:40vw"> -->
      <canvas id="bubble-chart"></canvas>
    <!-- </q-card-section> -->
    </div>

    <div class = "col">
    <div :class="{ hidden:!showClose }" :style="dim==1?'position: relative; width:23vw':'position: relative; width:35vw'" >
      <canvas id="bubble-chart1" ></canvas>
    </div> </div>

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
  props: ["chartdata", "displayoptions","closeChartdata"],
  

  data () {
    return {
      mainChart : null,
      closeChart: null,
      dim: 2,
      //showClose:false,
      // thislabeldisplay: null
    }
  },


  mounted () {
    this.mainChart =  this.createChart(true,'bubble-chart')
    this.closeChart =  this.createChart(false,'bubble-chart1')

    // console.log(3333,this.mainChart)
    // console.log(3333,this.mainChart.chartArea.bottom);
//    
  },

   computed: {
    showClose(){
      return this.$store.state.showCloseGraph;
    },
    canvasWidth(){
      var sty= (this.showClose && this.dim==2)? "position : relative; width:35vw":"position: relative; width:50vw";
      return (this.dim==1)?"position : relative; width:23vw":sty;
    },

  },
  methods: {
    changeDim(newDim){
      this.dim = newDim;
      this.mainChart.destroy();
      this.closeChart.destroy();
      this.displayoptions.aspectRatio = newDim/2;//(newDim == 1)?2:1;
      
      this.mainChart = this.createChart(true,'bubble-chart');
      this.mainChart.canvas.parentNode.style.width =(this.dim == 1)?'44vh':'88vh';
      console.log("width========= ",this.mainChart.canvas.parentNode.style.width);    
      this.closeChart = this.createChart(false,'bubble-chart1');
      this.closeChart.canvas.parentNode.style.width ='35vw';//(this.dim == 1)?'500px':'60vh';
      
    },

    setData(main,dataset, displayoptions) {
      //console.log('+++bubble',dataset)
      if(main){
        this.mainChart.data.datasets = dataset;
        this.mainChart.options = displayoptions;
        this.mainChart.update();
      }else{
        this.closeChart.data.datasets = dataset;
        this.closeChart.options = displayoptions;
        this.closeChart.update();
      }
     
    },
    setDisplayLabels: function(v) {
      //for mainChart
      console.log('----bubble',v)
      this.mainChart.options.plugins.datalabels.display = v;
      this.mainChart.update();
   
    },
 

    createChart (main, chartId) {
      //console.log(555,this.displayoptions.animation)
      const ctx = document.getElementById(chartId)
      console.log("--------------------ctx",ctx, "\ndimension", this.dim);

      const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        //type: 'diagonalBubble', //scatter also works but tooltip is different
        //type:'bubble', ////scatter also works but tooltip is different
        type: (this.dim == 1)?'simpleBubble' :'diagonalBubble', //if 'bubble' there is no background when download
        //tooltipCaretSize:0,
        data: main?this.chartdata:this.closeChartdata,
        options: this.displayoptions,        
      });
      //myChart.canvas.parentNode.style.width =(this.dim == 1)?'44vh':'88vh';
      return myChart
    },


  
  }
}


</script>

<style>
</style>
