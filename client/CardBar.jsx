class CardBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      height:this.props.height + "px",
      background:"red"
    };
    console.log(this.props.height);
    return (
      <div style={{overflowY:"scroll"}}>
        <div style={rootStyle}>
          
        </div>
      </div>
    );
  }
}

window.CardBar = CardBar;