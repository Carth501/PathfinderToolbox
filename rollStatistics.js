let statisticsMachine = {

    target_AC: 20,
    bab: 0,
    strength: 0,
    number: 5,
    
    initialize: function() {
        let me = this;
        this.updateResponse();
    },

    updateResponse: function(){
      if((this.bab + this.strength + 20) < this.target_AC)
      {
          this.number = 5;
      }  
      else if ((this.bab + this.strength + 1) >= this.target_AC)
      {
          this.number = 95;
      }
      else
      {
          this.number = 5 * (this.bab + this.strength + 20 - this.target_AC);
      }
      this.updatePercentageDisplayed(this.number);
    },

    updatePercentageDisplayed: function(number){
        
        $("#percentHit").val("%" + number);
    }
}
 
statisticsMachine.initialize();

$(document).ready(function() {
    $(".target_ac input").change(function () {
        statisticsMachine.target_AC = parseInt($(this).val());
        statisticsMachine.updateResponse();
    });
    $(".bab input").change(function () {
        statisticsMachine.bab = parseInt($(this).val());
        statisticsMachine.updateResponse();
    });
    $(".strength input").change(function () {
        statisticsMachine.strength = parseInt($(this).val());
        statisticsMachine.updateResponse();
    });
}); 