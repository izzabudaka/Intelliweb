class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      position:"relative",width:"100%",height:"100%"
    };
    let inputHolderStyle = {
        position:"absolute",
        left:"100px",top:"6px",bottom:"11px",right:"100px",
        borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)"
    };
    let inputStyle={
        width:"100%",
        height:"100%",
        background:"",
        paddingRight:"10px"
    };
    console.log("rendering:" + this.props.url);
    return (
      <div style={rootStyle}>
        <div style={inputHolderStyle}><input style={inputStyle} defaultValue={this.props.url}/></div>
      </div>
    );
  }

}

window.Navigator = Navigator;