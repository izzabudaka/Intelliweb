class CardBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      height:this.props.height + "px"
    };
    console.log(this.props.height);
    var heights = [];
    for(var i = 0; i < this.props.height / 250;i++){
      heights.push(<div style={{height:"250px"}}><window.Card/></div>)
    }
    let remainder = (this.props.height % 250);
    if(remainder > 0) heights.push(<div style={{height:remainder+"px"}}/>);
    this.props.loaded(this);
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
      console.log(ReactDOM.findDOMNode(this).scrollTop);
      console.log(value);
      ReactDOM.findDOMNode(this).scrollTop = value + "px";
    }
  }
}

window.CardBar = CardBar;