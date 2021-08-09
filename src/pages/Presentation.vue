 <style>
    .subtitle
    {
        /*class 类选择器， 以 . 显示
      background-color:rgb(242, 245, 198);
      font-family: Arial;*/
      color:rgb(0, 0, 102);
      font-family:verdana;
      
    }
    .menu{
      color:cadetblue;
      
    }
</style>


<template>
<q-page class="full-width row no-wrap justify-around items-start content-between q-col-gutter-lg" >
  <div class="full-width text-left q-pa-md" >

  <!--  <div style= "position: relative;"> -->

      <h4 class = "subtitle" >Typometrics definition</h4>
      <h4 class = "subtitle">Different measures</h4>
      <h4 class = "subtitle">Intepretation of graphs</h4>
      <h4 class = "subtitle" >Graph details </h4>
      <h4 class = "subtitle" >Others </h4>
        
     
    <!--  </div>

      <div >-->
      <q-drawer 
      
      show-if-above
      v-model="drawerRight"
      side="right"
      class = "menu"
      :width = "200"
      :breakpoint= "500"
      bordered
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
          <q-item clickable v-ripple>
             <!--  <q-item-section avatar>
               <q-icon name="inbox" /> 
              </q-item-section>-->

              <q-item-section class = "text-subtitle1">
                Typometrics definition
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>

              <q-item-section class = "text-subtitle1">
               Different measures
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>

              <q-item-section class = "text-subtitle1">
                Intepretation of graphs
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section class = "text-subtitle1">
                Graph details 
              </q-item-section>
            </q-item>

              <q-item clickable v-ripple>
              <q-item-section class = "text-subtitle1">
                Others
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-drawer>

   <!-- </div>-->
  </div>
        
  </q-page>
</template>

<script >
export default {
  name: 'Presentation',
  data(){
    console.log("presentation current page ", this.$route);
    this.$store.commit('setPage', false);
    return{
      page:'presentation',
    }
  }
}
</script>
