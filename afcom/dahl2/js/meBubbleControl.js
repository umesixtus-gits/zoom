var bubbles = new Object() ;
var BUBBLE_FADE_TIMEOUT = 15000;
var BUBBLE_SHOW_AFTER_PAGE_DELAY = 200;

function BubbleState (isVisible, timerId) {
    this.isVisible = isVisible;
    this.timerId = timerId;
}
 
BubbleState.prototype.setHidden = function() {
    if(this.isVisible){
        clearTimeout(this.timerId); 
        this.isVisible = false;
    }
};

function hideBubble(bubbleId){
   if( bubbles[bubbleId] != null && bubbles[bubbleId].isVisible ){
      $('#'+bubbleId).hide();
      bubbles[bubbleId].setHidden();
   }
}

function showBubble(bubbleId){
   if( bubbles[bubbleId] == null || !bubbles[bubbleId].isVisible ){
      $('#'+bubbleId).show();
      
      // forcing CSS3PIE to reprocess the position of bubble (misplaced because it's initially hidden).
      if (window.PIE) {
          var bubbleObj =  $('#'+bubbleId).get(0);
          if( bubbleObj != null ){
             bubbleObj.fireEvent("onmove");
          }
          
          // fix for IE zooming problems (pointer was defomed)
          $('#'+bubbleId + ' .meBubblePointerInner').removeClass('meBubblePointerInner').addClass('meBubblePointerInner');
      }
      
      var timerId = setTimeout(function(){ hideBubble(bubbleId); }, BUBBLE_FADE_TIMEOUT);
      
      bubbles[bubbleId] = new BubbleState(true, timerId)  ;
   }
}

function showBubbleAfterPageLoaded(bubbleId){
   $(document).ready( function(){
      setTimeout( function(){ showBubble(bubbleId); }, BUBBLE_SHOW_AFTER_PAGE_DELAY);
   });
}

function hideAllBubbles(){
   for( var bubbleId in bubbles ){
      hideBubble(bubbleId);
   }
}

