 <style>
    .title
    {
        /*class 类选择器， 以 . 显示
      background-color:rgb(242, 245, 198);
      font-family: Arial;*/
      color:rgb(0, 0, 102);
      font-family:verdana;
      
    }

    .subtitle
    {
      color:black;
      font-family: Arial;
      background-color:	FloralWhite;
    }

    .menu{
      color:cadetblue;
      
    }
    .link{
      color:	RoyalBlue;
    }
    .section{
      font-style:italic;

      color:rgb(0,0,102);

    }


</style>


<template>
<q-page class="full-width row no-wrap justify-around content-between q-gutter-lg" >
  
  
  <div padding class="text-justify q-pl-xl text-body1 col-9" >

    <div padding id = 'intro' >   
      <br/>
      <h4 class = "title" >Introduction</h4>
      <p >
      <h5 class = "subtitle">Definition of typometrics</h5>

     Typometrics is the open field of the study of the distribution of languages in a distributional scatter diagram based on empirical measures on raw or annotated corpora.
     It is a sub field of quantitative typology that attempts to compare languages. In some sense, typometrics is typology without types 
      <a href = "https://www.glossa-journal.org/article/id/5397/" class = "link"> (Gerdes et al. 2021)</a>
      </p>

      <p>
      <h5 class = "subtitle">About our web site </h5>

      In this web site, we present the graphical representation as scatter plots of measures on syntactically annotated corpora of 
      the <a href = "https://universaldependencies.org/" class = "link">Universal Dependencies project</a>,
      in the<a href = "http://surfacesyntacticud.github.io/" class = "link"> Surface-Syntactic scheme (SUD)</a> 
      and the standard UD format. We provide one-dimensional and two-dimensional plots.
      <br/><br/>
      Currently, with UD version 2.8, there are 114 languages (half of which are Indo-European) and 5 types of measures:<br/>
      <p style = "text-decoration: underline;text-align: center;">direction, distance, distribution, tree height, and Menzerath</p> Each type of measure consists of a list of measures. 
      For example, the distance measure type contains the global average of the distance of all relations for a given language L. 
      The distance measure also contains the average over each specific type of dependency relations, such as the average distance of 
      the subject relation. More details on each measure type is provided in Section <span class = 'section'>Different measures</span> below.
      <br/><br/>
      Furthermore, any measure with less than 50 occurrences is removed from the dataset in order to assure significant measurements.
      <br/><br/>
      From these measurements and scatter plots, we can interpret each one-dimensional and two-dimensional graph by analysing the cloud form with different patterns (see <span class = 'section'>Interpretation of graphs</span>) 
       and computations of distance between graphs (see <span class = 'section'>Similarity measures</span> ). 
       </p>


    </div>
    <br/>
    <div padding id = 'measures'>
      <hr />
      <p>
        <h4 class = "title">Different measures</h4>
        <h5 class = "subtitle">Direction </h5>
        The measure “direction” shows the percentage of <b>head-initial</b> relations in a language. In other words, the percentage of relations where the head is to the left of its dependent.
For example, the result of measurement on ‘subj’ direction of English is 7.2, which means in English, there are on average 7.2% of subjects located on the right side of the verb. Moreover, the point of English is put at 7.2 on the axis of the unidimensional diagram.
          <div class="q-pa-md q-gutter-sm row items-start">
              <q-img
                src="~assets/directionPart.png"
                loading="lazy"
                style="max-width: 400px; height: 300px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                part of graph direction::subj
              </div>
              </q-img>
            </div>

          <p><br/>
            The standard Direction measure combines all relations of the same function name.
             The following measure type allows for more fine-grained observations:

             <h6 class = "subtitle">Direction-cfc </h6>
             “cfc” stands for category-function-category for each dependency relation consisting of head-function-dependent, e.g. the couple (She, is) in the sentence “She is happy”  is an instance of AUX-subj-PRON, where C = AUX, F = subj and
               the dependent’s C = PRON. Similar to “direction”, “direction-cfc” measures the percentage of <b>head-initial cfc </b>relations in a language.
          </p>
        </p>
      </div>

      <div id = "distance">
        <br/>
      <p>
        <h5 class = "subtitle">Distance </h5>
        “Distance” calculates the average difference between positions of dependent and its governor. 
        The results for each function are weighted by this function’s occurrences.
        For example, In the graph below, the couple (I, ‘m) with deprel ‘subj’ has a distance ‘-1’, computed as dependent_id - head_id = 1-2

          <div class="q-pa-md q-gutter-sm row items-start">
              <q-img
                src="~assets/dependencyTree.png"
                loading="lazy"
                style="max-width: 800px; height: 300px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                Figure2(example at website of SUD)
              </div>
              </q-img>
            </div>

        </p>
         <h6 class = "subtitle">Distance-cfc </h6>
         “cfc” means head-function-dependent, as the explanation about “direction-cfc”, “distance-cfc” interpretes the average 
         difference between the dependent and head in a given cfc relation in a language. For instance, “distance-cfc:AUX-subj-PRON” provides the mean distance of PRON_ID - AUX_ID.

          <h6 class = "subtitle">Distance-abs </h6>
          The measure “distance-abs” computes the absolute distance between each dependent and its head, regardless of the direction. 
          More specifically, the “distance-abs” between (I, ‘m) is abs(dependent_id - head_id) = |1-2| = 1
      </div>


      <div id = "distribution">
        <br/>
      <p>
        <h5 class = "subtitle">Distribution </h5>
        <div class = "row">
        <div class = "col-7">“Distribution” measures the relative frequencies of dependency relation functions, computed by quotient of occurrences of a function and the total number of functions in relevant language. 
<br/><br/>For example, there are about 27.6% ‘comp:obj’ relations in the language Tagalog.</div>
             <div class="q-pa-md q-gutter-sm col-5 items-start">
              <q-img
                src="~assets/distributionPart.png"
                loading="lazy"
                style="max-width: 400px; height: 300px;float:right;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
               part of graph "distribution: comp:obj"
              </div>
              </q-img>
            </div>
            </div>
      </p>
      </div>

      <p id = "treeHeight">
        <br/>
        <h5 class = "subtitle">Tree Height</h5>
        <div class = "row">
        <div class = "col-6">This measure calculates the average height of dependency trees of sentences in the treebank  for each language.

<br/><br/>For example, the French sentence “c’est plus au niveau de la fac” have a tree height 4.
</div>
             <div class="q-pa-md q-gutter-sm col-6 items-start">
              <q-img
                src="~assets/treeHeight.png"
                loading="lazy"
                style="max-width: 400px; height: 350px;float:right;"
              >
              <!--<div class="absolute-bottom text-subtitle2 text-center">
                part of graph "distribution: comp:obj"
              </div>-->
              </q-img>
            </div>
            </div> 
        </p>

      <p id = "menzerath">
        <br/>
        <h5 class = "subtitle">Menzerath </h5>
        This measure type is the implementation of the analysis in this paper: 
        <a href = "https://gerdes.fr/papiers/2021/The%20Co-Effect%20of%20Menzerath-Altmann%20Law%20and%20Heavy%20Constituent%20Shift%20in%20Natural%20Languages.pdf" style="color:Navy;">
        Xinying Chen, Kim Gerdes, Sylvain Kahane, Marine Courtin. The Co-Effect of Menzerath-Altmann Law and Heavy Constituent Shift in Natural Languages. Proceedings of Qualico 2021.
        </a>
        <br/>
        <div style="background-color:	MintCream;">
          <br/>
        <a href = "https://en.wikipedia.org/wiki/Menzerath%27s_law" style="color:Navy;">Menzerath’s  law</a>: The increase of the size of a linguistic construct results in a decrease of the average  size  of  its components.
        <br/><a href = "https://en.wikipedia.org/wiki/Heavy_NP_shift" style="color:Navy;">Heavy Constituent Shift</a>: “heavy constituents” that are composed of more words(and syllables) than “light constituents”, tend to be shifted to the end of the clause.
For example, in the following sentences (from Ross (1967:306)):
<br/>
<div style = "text-indent:30px;">
a. I’ll <b>give</b> some <b>to my good friend from Akron</b>. </div>
<div style = "text-indent:30px;">
b. I’ll <b>give to my good friend from Akron</b> some.<br/>
</div>
‘some’ is a “light constituent” and “to my good friend from Akron” is much heavier than “some”. As a result the b. sentence is awkward because the heavy constituent appears before the light constituent. 
       </div>
       <br/>
       With this measure, we study the co-effect of <i>Menzerath-Altmann law (MAL)</i> 
       and <i>Heavy Constituent Shift (HCS)</i> phenomenon that are both relevant to constituent size in humain natural languages.

       <div></br>
         More specifically,  we consider two types of clauses:<br/>
<div style = "text-indent:30px;">1) XAB (there are two complements A and B to the right of word X, and A precede B)</div>
<div style = "text-indent:30px;">2) XC (Only one complement C is to the right of X)</div>
<br/>
With X a verbal head and A, B, C complements of X with the dependency tag ‘subj’, ‘comp’, ‘mod’, or ‘udep’
<br/>
Then we denote a, b and c as the size of A, B and C. For instance, ”I’ll <b>give</b> some 
<b>to my good friend from Akron</b>.” belongs to type XAB, with a = 1 and c = 6.<br/>
For each clause, we collect, compute and store a, b and c, as well as their mean value on the whole treebank.
<br/>
<br/>
Moreover, by comparing the average value of a and c, we can observe that a
&lt;
 c,  which explains the co-effect of MAL and HCS.

We trust that further interesting phenomena can be observed on the different Menzerath plots. 
</div>        
        </p>

      <div id = 'graphs'>
        <hr/>
      <h4 class = "title">Intepretation of graphs</h4>
      The measurement results are visualised on 1D and 2D scatter plots. <br/>
One-dimensional plots allow us to visualize the distribution of the various measures we have performed on the treebanks, two-dimensional plots bring two measures in relation to one another.


       <h5 class = "subtitle">Graph details (makers and colors ) </h5>
       <div>Languages on our scatter plots are grouped by rough language classes and represented differently with various markers and colors: 
</div>
<ul style = "text-indent:10px;">
  <li>Indo-European languages: triangles</li>
  <ul>
  <li>
    <div>Indo-European-Romance: brown &nbsp; 
      <q-img
          src="~assets/triangleBrown.png"
          loading="lazy"
          style="max-width: 21px; height: 21x;"/>
          </div>
  </li>
  <li>
    <div>Indo-European-Baltoslavic: purple &nbsp; 
      <q-img
          src="~assets/trianglePurple.png"
          loading="lazy"
          style="max-width: 19px; height: 19px;"/>
          </div>
  </li>
  <li> <div>Indo-European-Germanic, including the English Creole Naija: olive &nbsp; 
    <q-img
          src="~assets/triangleOlive.png"
          loading="lazy"
          style="max-width: 19px; height: 19px;"/>
          </div>
     </li>
  <li><div>Other Indo-European: blue &nbsp;
    <q-img
          src="~assets/triangleBlue.png"
          loading="lazy"
          style="max-width: 18px; height: 18px;"/>
          </div>
  </li>
  </ul>
<br/>
  <li><div>Sino-Austronesian: limeGreen star &nbsp;
    <q-img
          src="~assets/greenStar.png"
          loading="lazy"
          style="max-width: 22px; height: 22px;"/>
          </div>
    </li>
  <li> <div>Agglutinating languages: red plus signs 
    <q-img
          src="~assets/plusRed.png"
          loading="lazy"
          style="max-width: 24px; height: 24px;"/>
          </div>
     </li>

  <li>
    <div> Afroasiatic and Semitic': orange X signs&nbsp;
    <q-img
          src="~assets/xorange.png"
          loading="lazy"
          style="max-width: 21px; height: 21px;"/>
          </div>
    </li>
  <li><div>Tupian: grey star &nbsp;
    <q-img
          src="~assets/greyStar.png"
          loading="lazy"
          style="max-width: 22px; height: 22px;"/>
          </div>
    </li>

<br/>
<li>
  <div>Other languages : black circles  &nbsp;
    <q-img
          src="~assets/ptsBlack.png"
          loading="lazy"
          style="max-width: 19px; height: 19px;"/>
          </div>
  
The language families of these languages contain less than 5 languages in our dataset, such as Niger-Congo and Dravidian languages as well as Basque
</li>

</ul>
       <h5 class = "subtitle">Interpretation </h5>
        <div><b>unidimensional graph</b><br/>
        For example, on the 1D diagram “direction: subj”, most language points are located on the left of axes, with percentages less than 50%, which means that subjects of most languages in our dataset prefer head-initial than head-final.
        </div>
             <div class="q-pa-md q-gutter-sm row items-start">
              <q-img
                src="~assets/graph1d0.png"
                loading="lazy"
                style="max-width: 1000px; height: 300px;float:right;"
              >
             <!-- <div class="absolute-bottom text-subtitle2 text-center">
               part of graph "distribution: comp:obj"
              </div>-->
              </q-img>
            </div>

<div>
<b>bidimensional graph</b> <br/>

The two-dimensional diagram “direction subj:: comp: obj” below visualises the percentage of subjects and objects on the right of the verb (V) on average, followed by a graph with a part of this diagram.
<br/>
<br/>
The position of a language point depends on the analysis results of this language on measures of axis x and y. For example, 0.386% of subjects and 7.351% of objects in Japanese are on the right of the governor. As a consequence, we put the Japanese point at the left-bottom corner of the diagram. By taking the same measures on all treebanks, we obtain the 2D scatter plot.
             <div class="q-pa-md q-gutter-sm row items-start">
                <q-img
                src="~assets/graph2dPart.png"
                loading="lazy"
                style="max-width: 900px; height: 300px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
               part of graph "distribution: subj::comp:obj"
              </div>
              </q-img>

              <q-img
                src="~assets/graph2dAna.png"
                loading="lazy"
                style="max-width: 600px; height: 600px;float:right;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                graph "distribution: comp:obj"
              </div>
              </q-img>
            </div>
  </div>
  Some of the language clouds have specific recognizable geometric forms, such as for the following graph  (Figure2 of the typometrics article Gerdes et al. 2021) that shows the percentage of pronominal versus nominal objects on the right of the verb:, we can recognize a triangle pattern.

  <br/><br/>
  As we can see, in this figure, y &#62; x is almost true, therefore, we can conclude that for almost every language, the percentage of nominal objects on the right of its verbs is more than that of pronominal objects following a verb as its governor.  


 <div class="q-pa-md q-gutter-sm row items-start">
                <q-img
                src="~assets/pattern_tri.png"
                loading="lazy"
                style="max-width: 600px; height: 600px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
               triangle pattren example
              </div>
              </q-img>
              </div>

      </div>
      Please see more pattern and graph analysis methods in  <a href = "https://www.glossa-journal.org/article/id/5397/" class = "link"> (Gerdes et al. 2021)</a>
<br/>



      <div id = "similarity">
        <hr/>
      <h4 class = "title" >Similarity measures </h4>
      First and foremost, we divide measures mentioned above in five groups in consideration of their different natures:<br/>
the groups “distance” and “direction”:
“distance”: distance, distance-abs, distance-cfc<br/>
“direction”: direction, direction-cfc<br/>
as well as the groups “distribution”, “menzerath”, “treeHeight”.<br/>
In each group, we compute distances between each pair of scatter plots and try to find the most similar graph for every graph under different types of similarity measures. 

<h6 class = "subtitle">Movement of language points:</h6>
      <div>We call “distribution distance” the distance between the cloud points of two graphs (named graph1 and graph2) in the sense of language points distributions. In other words, if we want to form graph2 with points in graph1 and take language names into account, distribution_distance(graph1, graph2) is the average Euclidean distance that points in graph1 should move.
<br/><br/>
To obtain the results, for each language in both graph1 and graph2, we compute the Euclidean distance between its position on graph1 and on graph2,  then add up all these distances and divide this sum by number of languages taken into account as the average distribution distance between graph1 and graph2.

<br/>
</div>

<h6 class = "subtitle">Cloud form</h6>
<div>To compare the similarity between clouds in two graphs (named graph1 and graph2), we do not consider points labels (i.e. language names), so that only the points’ positions are taken into account. In other words, We want to form graph2 with the points of graph1 no matter which language a point represents.  
<br/>
In this case, a mapping is necessary to match points from one graph to another, then we can compute the Euclidean distance between each matched points group and get the average as the cloud form distance. 
<br/>
Then we tried two distance algorithms. 
</div>

  <ol style = "list-style-type: lower-alpha">

    <li> <b>Dynamic time warping</b><br/>
    <div style = "background-color:AliceBlue;"><br/>
    Since a translation of point clouds does not change the cloud form, but results in a large difference of Euclidean distance, we try to fix the problem with Dynamic time warping (DTW). 
    <p><br/>
    If graph1 is a cloud with 3 points A, B, C and graph2 also consist of 3 points a, b, c. To compute a distance between clouds in graph1 and graph2 by the DTW algorithm, at the level of mapping, a point A in graph1 can be matched with several points a, b in graph2, because we can consider a, b as the same element of A but at different moments.
    <p/><p>
Let’s call this distance distDTW(graph1, graph2), first of all we need to calculate the Euclidean distance matrix (i.e. dist(A,a), dist(A,b). dist(A,c), dist(B,a)...). Based on this matrix, we can find a path from top-left to bottom-right that assures the sum of distances in this path is minimal, and with this sum and the number of matching pairs we can compute the average distance, which is the distDTW that we wanted.

    <br/>
    Furthermore, the distance is symmetrical: distDTW(graph1, graph2) and distDTW(graph2, graph1) give us the same distance and mappings, as shown the figures below:

     <div class="q-pa-md q-gutter-sm row items-start">
              <q-img
                src="~assets/DTW0.png"
                loading="lazy"
                style="max-width: 480px; height: 300px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center ">
               distance(gr1, gr2), matrice 3*4    
              </div>
              </q-img>
              &nbsp;
              <q-img
                src="~assets/DTW1.png"
                loading="lazy"
                style="max-width: 400px; height: 320px;"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
               distance(gr1, gr2), matrice 4*3    
              </div>
              </q-img>
      </div>


    </p>   </div></li>
<br/>
	However, the DTW algorithm can only go ahead from the first point to the last one, as time can’t go back. This is not the case of a two-dimensional cloud form, so we used a different algorithm based on the famous stable marriage matching problem:

<br/><br/>
    <li><b>Gale–Shapley algorithm</b> (stable marriage problem)<br/>

     <div style = "background-color:AliceBlue;"> <br/>
    The Gale–Shapley algorithm can produce a stable mapping of two series of elements that balances the demand of every element. 
    In our situation, we consider points in graph1 as “men”, and points in graph2 as “women” to match,
    then the algorithm is:

      <ol>
        <li>Set the preference list for “men” and “women” according to the Euclidean distance, so as to for each point, the first choice is the closest one.</li>
      <br/>
      <li>“Man” proposes to “woman” from the top of his preference list, in other words, from his first choice. When a “woman” is proposed to marry, she gives an approval if she is single, otherwise, she will choose the one she prefers between this man and her current partner according to her preference list.</li>
      <br/>
      <li>Repeat step 2) until a round where there is no single man.</li>
      <br/>
      <li>Accumulate the Euclidean distance of each couple as the distance between graph1 and graph2, then divide the total number of matching pairs to obtain the average distance.</li>
      </ol></div></li>
    </ol>
 </div>

      <div id = "others">
        <hr/>
      <h4 class = "title" >Others </h4>
        <div><b>Download</b>: use deep-orange button to download image with png format, and orange button to download points data of current graph with json format.
        </div>
        <br/>
        <div>
        <b>Contact</b>: </br>
         https://gerdes.fr</br>
         Site building and explanation by <a href = "https://gerdes.fr" class = "link">Kim Gerdes</a> and  <a href = "https://github.com/ziqianPeng" class = "link">Ziqian Peng</a>
        </div>

       <h5 class = "subtitle">References </h5>

       <div>
         1. Gerdes K. & Kahane S. & Chen X., (2021) <i>“Typometrics: From Implicational to Quantitative Universals in Word Order Typology”</i>, Glossa: a journal of general linguistics 6(1), p.17. doi: https://doi.org/10.5334/gjgl.764
<br/>2. Chen X., Gerdes K., Kahane S., Courtin M. (2021) <i>The Co-Effect of Menzerath-Altmann Law and Heavy Constituent Shift in Natural Languages</i>. Qualico.
<br/>
3. Code of typometrics project:<a href = "https://github.com/typometrics" class = "link"> https://github.com/typometrics</a> <br/>
4. Stable Matchings in Metric Spaces: <a href = "https://arxiv.org/pdf/1710.05262.pdf" class = "link"> https://arxiv.org/pdf/1710.05262.pdf</a> <br/>
5. Dynamic time warping:<a href = "https://github.com/talcs/simpledtw" class = "link"> https://github.com/talcs/simpledtw </a><br/>
<br/><br/>
</div>
      </div>
      </div>


      <q-drawer 
      overlay
      side="right"
      show-if-above
      class = "menu col-3 text-justify"
      :width = "250"
      :breakpoint= "500"
      bordered
      >

        <q-scroll-area class="col-3 fit" >

          <q-list class="menu-list">
             &nbsp; &nbsp; &nbsp; 

            <div v-for="(sect,idx) in sections">

            <div v-if="measures.includes(sect.name)" >
              <q-item clickable :active="sect.act" @click="toSection(sect.id,idx)" v-ripple >
              <q-item-section class = "text-subtitle2 text-weight-regular" style ="text-indent:10px">
                {{sect.name}}
              </q-item-section>
            </q-item>
              </div>

               <div v-else>
               <q-item clickable :active="sect.act" @click="toSection(sect.id,idx)" v-ripple  >
                  <q-item-section class = "text-subtitle1" >
                    {{sect.name}}
                  </q-item-section>
                </q-item> </div>
              
              </div>


          </q-list>
        </q-scroll-area>



    </q-drawer>

   <!-- </div>
   <div class="full-width text-left q-pa-md" > </div> -->

   

    </q-page>
   

        
  
</template>

<script >
function toSection(id){
      console.log("section");
      var elmnt = document.getElementById(id);
      elmnt.scrollIntoView();
}

export default {
  name: 'Presentation',

  data(){
    console.log("presentation current page ", this.$route);
    this.$store.commit('setPage', false);
    this.$store.commit('showCloseGr', false);

    function toSection(id){
      console.log("section data");
      var elmnt = document.getElementById(id);
      elmnt.scrollIntoView();
}
    
    return{
      page:'presentation',
      drawerRight:true,
      measures:["Direction","Distance","Distribution","Tree Height","Menzerath"],

      sections:[
        {
          id:"intro",
          name:"Introduction",
          act: true,
        },
        {
          id:'measures',
          name:"Different measures",
          act: false,
        },
        {
          id:"measures",
          name:"Direction",
          act:false
        },
        {
          id:"distance",
          name: "Distance",
          act:false,
        },
        {
          id:"distribution",
          name: "Distribution",
          act:false,
        },
        {
          id:"treeHeight",
          name: "Tree Height",
          act:false,
        },
        {
          id:"menzerath",
          name: "Menzerath",
          act:false
        },

        {
          id:"graphs",
          name:"Interpretation of graphs",
          act: false,
        },
        {
          id:"similarity",
          name:"Similarity measures",
          act: false,
        },
        {
          id:"others",
          name:"Others",
          act: false,
        }

      ],
    }
  },

  computed: {
  
  },

  methods:{
    toSection: function(id, idx){
      console.log("section, ",id.slice(0,7));
      var elmnt = document.getElementById(id);
      elmnt.scrollIntoView();
      for(let i = 0; i< this.sections.length; i++){
        if(this.sections[i].act){
          this.sections[i].act = false;
        }
      }
      this.sections[idx].act = true;
    },

  }

}
</script>
