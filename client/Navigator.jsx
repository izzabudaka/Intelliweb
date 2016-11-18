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
        borderRadius:"10px",border:"1px solid rgba(0,0,0,0.03)"
    };
    let inputStyle={
        width:"100%",
        height:"100%",
        background:"rgba(0,0,0,0.03)",
        paddingRight:"10px"
    };
    console.log("rendering:" + this.props.url);
    return (
      <div style={rootStyle}>
        <div style={inputHolderStyle}><input style={inputStyle} defaultValue={this.props.url}/></div>
        
        <span style={{
                display:"inline-block",
                position:"absolute",fontSize:"15pt",
                top:"5px",right:"15px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer",
                borderRadius:"5px",border:"1px solid rgba(0,0,0,0.05)"
            }} onClick={this.openStash.bind(this)}>
                ☆
        </span>
      </div>
    );
  }

  openStash(){
      this.props.openStash();
  }

}

window.Navigator = Navigator;