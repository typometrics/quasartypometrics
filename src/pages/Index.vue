<template>
  <q-page class="flex flex-center">
    <!-- <div  class="row" > -->
      <div class="fit column  justify-around items-stretch content-stretch q-gutter-md">
      <!-- autogrow  :shadow-text="textareaShadowText"  hint=""    @keydown="processTextareaFill"
        @focus="processTextareaFill" 
        class="q-pa-md q-gutter-sm"  autogrow
          rows="110"  ref="claimstextarea"
        -->
        <q-form @submit="uploadIt" class="q-gutter-md">
      <q-input
        class = "col-grow"
        v-model="claimstext"
        type="textarea"
        filled
        label="Paste your claim set here"
        style="overflow: auto"
        @focus="selecttextarea" 
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      />
       <div>
        <q-btn label="Upload" type="submit" color="primary" no-caps/>
      </div>
    
    <div class=" column">
      <q-editor
        v-model="descriptionhtml"
        :definitions="{
          save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: saveWork
          },
          upload: {
            tip: 'Upload to cloud',
            icon: 'cloud_upload',
            label: 'Upload',
            handler: uploadIt
          }
        }"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          ['upload', 'save']
        ]"
        class="descriptioneditor"
      />
    </div>
    </q-form>
    </div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
  </q-page>
</template>

<script>
import api from '../boot/backend-api';


export default {
  name: 'PageIndex',
  data () {
    return {
      claimstext: 'After you define a new button,' +
        ' you have to make sure to put it in the toolbar too!',
      descriptionhtml: '',
    }
  },
   mounted(){ 
        this.computeEditorContent(); 
       
    },
  methods: {
      selecttextarea(ev) {
          // console.log('ev', ev);
          ev.target.select()
          // cm.refresh();
          // cm.execCommand('selectAll');
       
    },
   
    
   
    uploadIt () {
      // console.log(this.claimstext)
      // api.API this.$axios({ url: 'draft', baseURL: "http://127.0.0.1:8000/algodraftapp/"}) 'draft',
      // api.postClaims( {'cats':456})
      api.postClaims( {'claimstext':this.claimstext})
			.then(response => { 
        // console.log(66565,response.data)
        this.$q.notify({message: `That worked! Check out the description draft!`, color:'positive', position: 'bottom'});
        this.descriptionhtml=response.data['descriptionhtml']
			})
			.catch(error => {
				// this.$store.dispatch("notifyError", {error: error}); 
				this.$q.notify({message: `${error}`, color:'negative', position: 'bottom'});
      }) 
      
      // this.$q.notify({
      //   message: 'Server unavailable. Check connectivity.',
      //   color: 'blue',
      //   textColor: 'white',
      //   icon: 'warning'
      // })
    },
    computeEditorContent () {
      console.log(456)
      this.claimstext=      `1. A method, comprising:
displaying a scrollable list of content items;
receiving input associated with a scroll command;
based on the scroll command, displaying a scrollable refresh trigger; and
in response to determining, based on the scroll command, that the scrollable refresh trigger has been activated, refreshing the scrollable list of content items.

2. The method of claim 1, wherein the scrollable refresh trigger scrolls with the scrollable list of content items.

3. The method of claim 1, wherein the scrollable refresh trigger indicates the time at which the scrollable list of content items was last refreshed.

4. The method of claim 1, further comprising:
based on the scroll command, providing a first instruction associated with displaying the scrollable refresh trigger; and
in response to determining that the scrollable refresh trigger is fully displayed, providing a second instruction associated with activating the scrollable refresh trigger.

5. The method of claim 1, further comprising:
in response to determining that the scroll command was completed while the scrollable refresh trigger was fully displayed, determining that the scrollable refresh trigger has been activated.

6. The method of claim 1, further comprising:
in response to determining that the scroll command was completed while the scrollable refresh trigger was not fully displayed, determining that the scrollable refresh trigger has not been activated.

7. The method of claim 1, further comprising:
in response to determining that a refresh operation has completed, automatically scrolling the scrollable list of content items such that the scrollable refresh trigger is not displayed.

8. The method of 1, further comprising:
in response to displaying the scrollable refresh trigger, providing first audio feedback; and
in response to determining that the scrollable refresh trigger has been activated, providing second audio feedback.

9. The method of claim 1, wherein the scrollable list of content items includes a plurality of discrete content items arranged chronologically.

10. The method of claim 1, wherein the received input represents touch-based user input.

11. A non-transitory computer-readable medium comprising computer-executable instructions stored thereon that, when executed by a processor, cause the processor to:
display a scrollable list of content items, the scrollable list of content items including a plurality of discrete content items arranged chronologically;
receive input associated with a scroll command, the input representing touch-based user input;
based on the scroll command, display a scrollable refresh trigger configured to scroll with the scrollable list of content items;
in response to determining that the scrollable refresh trigger is fully displayed, provide an instruction associated with activating the scrollable refresh trigger;
in response to determining that the scroll command was completed while the scrollable refresh trigger was fully displayed, refresh the scrollable list of content items; and
in response to determining that the scrollable list of content items has been refreshed, automatically scroll the scrollable list of content items such that the scrollable refresh trigger is not displayed.

12. The non-transitory computer-readable medium of claim 11, wherein the scrollable refresh trigger indicates the time at which the scrollable list of content items was last refreshed.

13. The non-transitory computer-readable medium of claim 11, further comprising instructions that cause the processor to perform:
in response to displaying the scrollable refresh trigger, providing first audio feedback; and
in response to determining that the scrollable refresh trigger has been activated, providing second audio feedback.

14. A non-transitory computer-readable medium, comprising instructions that when executed cause a processor to:
display a scrollable list of content items;
receive input associated with a scroll command;
display a scrollable refresh trigger based on the scroll command; and
refresh the scrollable list of content items in response to a determination, based on the scroll command, that the scrollable refresh trigger has been activated.

15. The non-transitory computer-readable medium of claim 14, wherein the scrollable refresh trigger scrolls with the scrollable list of content items.

16. The non-transitory computer-readable medium of claim 14, wherein the scrollable refresh trigger indicates the time at which the scrollable list of content items was last refreshed.

17. The non-transitory computer-readable medium of claim 14, further comprising instructions that when executed cause the processor to:
provide a first instruction associated with displaying the scrollable refresh trigger based on the scroll command; and
provide a second instruction associated with activating the scrollable refresh trigger in response to determination that the scrollable refresh trigger is fully displayed.

18. The non-transitory computer-readable medium of claim 14, further comprising instructions that when executed cause the processor to:
determine that the scrollable refresh trigger has been activated in response to a determination that the scroll command was completed while the scrollable refresh trigger was fully displayed.

19. The non-transitory computer-readable medium of claim 14, further comprising instructions that when executed cause the processor to:
automatically scroll the scrollable list of content items such that the scrollable refresh trigger is not displayed in response to determining that a refresh operation has completed.

20. The non-transitory computer-readable medium of claim 14, further comprising instructions that when executed cause the processor to:
provide first audio feedback in response to displaying the scrollable refresh trigger; and
provide second audio feedback in response to determining that the scrollable refresh trigger has been activated. `
// .replace(/(?:\r\n|\r|\n)/g, '<br>');
  // console.log( this.$refs.claimstextarea)
  // this.$refs.textarea.style.height = "";this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px"
    },


     saveWork () {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
  }
}
// .descriptioneditor {font-family: "Arial Narrow", Arial, sans-serif;font-stretch: condensed;}

</script>
<style lang="stylus">
h1 { font-size: 4rem;line-height:4rem }
h2 { font-size: 3rem;line-height:3rem }
p {font-size: 16px;  text-align: justify; text-justify: inter-word;}
.descriptioneditor {font-family: Arial, sans-serif;}

.blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "“" "»";
}
.blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
.blockquote p {
  display: inline;
}
</style>
