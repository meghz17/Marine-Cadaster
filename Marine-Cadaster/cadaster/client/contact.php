<?php require_once 'main-template.php'; ?>

<?php template("Marine Cadastre - Contact Page", content(), 2); ?>

<?php function content() { ob_start(); ?>

   <div style="width: 1200px; margin-top: 3%">
	   
	  	
	  	
		<div class="cardWrapper">
		  <div class="card">
		    <div class="cardFace front">
				<!--Harini-->
			    <div class="thumbnail" style="width: 256px; height: 500px; float: left">
			      <img src="/images/harini.png" style="width: 256px; height: 324px;"></img>
			      <div class="caption">
			        <h3 align="center">Harini</h3>
					</div>
			    </div>
		    
		    </div>
		    <div class="cardFace back">
		    	<h1>Harini</h1>
		    </div>
		  </div>
		</div>
	  	
	  	<div class="cardWrapper">
		  <div class="card">
		    <div class="cardFace front">
			   	<!--Bhavya-->
			    <div class="thumbnail" style="width: 256px; height: 400px; float: left">
			      <img src="/images/bhavya.png" width="350px" height="350px"></img>
			      <div class="caption">
			        <h3 align="center">Bhavya</h3>
					</div>
			    </div>
		    		    
		    </div>
		    <div class="cardFace back">
		    	<h1>Bhavya</h1>
		    </div>
		  </div>
		</div>
	
	    
	    
	    <div class="cardWrapper">
		  <div class="card">
		    <div class="cardFace front">
			  	<!--Lucky-->
			    <div class="thumbnail" style="width: 256px; height: 500px; float: left">
			      <img src="/images/lucky.png" width="256px" height="256px"></img>
			      <div class="caption">
			        <h3 align="center">Navya</h3>
					</div>
			    </div>
		    		    		    
		    </div>
		    <div class="cardFace back">
		    	<h1>Navya</h1>
		    </div>
		  </div>
		</div>
	    
	    
	    
	    <div class="cardWrapper">
		  <div class="card">
		    <div class="cardFace front">
			    <!--Sahiti-->
			    <div class="thumbnail" style="width: 256px; height: 400px; float: left">
			      <img src="/images/sahithi.png" width="256px" height="256px"></img>
			      <div class="caption">
			        <h3 align="center">Sahiti</h3>
					</div>
			    </div>
		    		    		    		    
		    </div>
		    <div class="cardFace back">
		    	<h1>Sahiti</h1>
		    </div>
		  </div>
		</div>
	    
	    
	    
	  	
	  <div class="cardWrapper">
		  <div class="card">
		    <div class="cardFace front">
				<!--Ray-->
			    <div class="thumbnail" style="width: 256px; height: 400px; float: left">
			      <img src="/images/Ray.png" width="256px" height="256px"></img>
			      	<div class="caption">
			        	<h3 align="center">Ray</h3>
					</div>
			    </div>
		    		    		    		    		    
		    </div>
		    <div class="cardFace back">
		    	<h1>Ray</h1>
		    </div>
		  </div>
		</div>
	  	
	  	
	    
	    
   			
   	</div>
   	<script type="text/javascript">
		  //IE doesn't transform-style:preserve-3d.
		 // for IE try http://codepen.io/rhernando/pen/vjGxH
		
		
		 //using TweenLite.set() takes care of all vendor-prefixes
		 TweenLite.set(".cardWrapper", {perspective:800});
		 TweenLite.set(".card", {transformStyle:"preserve-3d"});
		 TweenLite.set(".back", {rotationY:-180});
		 TweenLite.set([".back", ".front"], {backfaceVisibility:"hidden"});
		
		 $(".cardWrapper").hover(
		   function() {
		     TweenLite.to($(this).find(".card"), 1.2, {rotationY:180, ease:Back.easeOut});
		   },
		   function() {
		     TweenLite.to($(this).find(".card"), 1.2, {rotationY:0, ease:Back.easeOut});  
		   }
		 );
		
		 //a nice little intro;)
		 //TweenMax.staggerTo($(".card"), 1, {rotationY:-180, repeat:1, yoyo:true}, 0.1);
		
		 /* learn more about GSAP JS:
		 http://www.greensock.com/gsap-js/
		
		 more codepen samples:
		 http://codepen.io/collection/jmHAn
		
		 basics:
		 http://codepen.io/collection/ifybJ
		
		 */
	</script>   
<?php return ob_get_clean(); } ?>