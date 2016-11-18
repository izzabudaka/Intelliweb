var Card = require('../model/Card').Card;
 
this.get_default = function(link, callback){
  var card = Card()
  card.addTitle(link)
  return card
}