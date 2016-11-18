
class CardBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCards : props.cards
    };
  }
  render() {
    let rootStyle ={
      height:this.props.height + "px",
      overflowY:"scroll"
    };
    // for(var i = 0; i < this.props.height / 250;i++){
    //   heights.push(<div style={{width:"100%",overflow:"scroll"}}><div style={{height:"250px",width:"750px"}}>
    //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
    //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
    //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
    //   </div></div>)
    // }
    // let remainder = (this.props.height % 250);
    // if(remainder > 0) heights.push(<div style={{height:remainder+"px"}}/>);
    // this.props.loaded(this);
    let cards = this.state.filteredCards.map(data => <window.CardStub data={data} onURLClicked={(url)=>this.props.onURLClicked(url)}/>);

   let inputStyle={
        width:"100%",
        height:"100%",
        background:"rgba(0,0,0,0.05)",
        paddingRight:"0px",paddingLeft:"5px",color:"black",
        fontSize:"11pt",border:"none"
    };
    return (
      <div style={{overflowY:"hidden",overflowX:"scroll",paddingBottom:"400px"}}>
        <div style={rootStyle}>
          <div>
            <div style={{height:"40px",width:"100%"}}>
              <input style={inputStyle} placeholder="Search and filter" onKeyPress={this.startSearch.bind(this)}/>
            </div>
          </div>
          {cards}
          <div><i className="fa fa-spinner" aria-hidden="true" style={{margin:"20px"}}></i></div>

        </div>
      </div>
    );
  }
  
  startSearch(e) {
      if (e.key === 'Enter') {
        console.log("searching");
        console.log(this.props.request);
          this.props.request({
                    url:"http://127.0.0.1:3000/search",
                    method:"POST",
                    json:true,
                    body:{cards:this.props.cards,query:e.target.value}
                }, function(err, response, body){
                  console.log(body);
                      this.setState({
                        filteredCards : body
                      });
                });
      }
  }

  updateScrollPosition(value){
    if(ReactDOM.findDOMNode(this) != undefined) {
      // console.log(ReactDOM.findDOMNode(this).scrollTop);
      // console.log(value);
      ReactDOM.findDOMNode(this).scrollTop = value + "px";
    }
  }
}

window.CardBar = CardBar;