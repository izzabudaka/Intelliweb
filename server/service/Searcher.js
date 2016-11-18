const {Wit, log} = require('node-wit');
const client = new Wit({accessToken: 'AIzaSyCdXimkwNFZgVICv2awOhK8Tvk5e7BqNiM'});

var parse_query = function(query, callback){
  client.message(query, {})
  .then((data) => {
    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    callback(data.entities)
  })
  .catch(console.error);
}

this.search = function(query, cards, callback){
  parse_query(query, function(parsed){
    if(parsed.intent.value == "github"){
      var attribute = parsed.attribute.value
      var condition = parsed.condition.value
      result = []
      async.forEach(cards, function(card){
        if(card[attribute] > condition)
          result.push(card)
      }).then(function(){
        return result
      })
    }
  })
}
