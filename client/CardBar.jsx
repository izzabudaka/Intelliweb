class CardBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      height:this.props.height + "px"
    };
    var heights = [];
    console.log(this.props.height / 250);
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
    for(var i = 0; i < this.props.height / 250;i++){
      var cards = [];
      if(this.props.buckets[i] != undefined){
        this.props.buckets[i].forEach((data) => cards.push(<window.Card data={data} onURLClicked={(url)=>this.props.onURLClicked(url)}/>));
      }
      heights.push(<div style={{width:"100%",overflow:"scroll"}}><div style={{height:"250px",width:"1500px"}}>
         {cards}
       </div></div>);
    }


    return (
      <div style={{overflowY:"scroll"}}>
        <div style={rootStyle}>
          {heights}
        </div>
      </div>
    );
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