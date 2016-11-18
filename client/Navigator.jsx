class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      position:"relative",width:"100%",height:"100%",background:"#303030",color:"white"
    };
    let inputHolderStyle = {
        position:"absolute",
        left:"100px",top:"6px",bottom:"11px",right:"100px",
        borderRadius:"10px",border:"0px solid rgba(0,0,0,0.03)"
    };
    let inputStyle={
        width:"100%",
        height:"100%",
        background:"rgba(255,255,255,0.05)",
        border:"0px solid rgba(255,255,255,0.08)",
        paddingRight:"0px",borderRadius:"0px",paddingLeft:"5px",color:"white"
    };

    console.log("rendering:" + this.props.url);
    return (
      <div style={rootStyle}>
      <h1 style={{
        textAlign:"center",
        color:"white"  ,
        fontFamily:"Helvetica",fontSize:"14pt",fontWeight:"100",
        margin:0,
        paddingTop:"10px"
      }}>
      {this.props.title}
      </h1>
      <div style={{height:"40px",position:"absolute",left:0,right:0,bottom:0}}>
        <div style={inputHolderStyle}><input style={inputStyle} defaultValue={this.props.url}/></div>
        
        <span style={{
                display:"inline-block",
                position:"absolute",fontSize:"15pt",
                top:"2px",right:"15px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer",
                borderRadius:"5px",border:"1px solid rgba(0,0,0,0.05)",lineHeight:"30px",verticalAlign:"middle"
            }} onClick={this.openStash.bind(this)}>
                ☆
        </span>

        <span style={{
                display:"inline-block",
                position:"absolute",fontSize:"15pt",
                top:"2px",left:"15px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer",
                borderRadius:"5px",border:"1px solid rgba(0,0,0,0.05)",lineHeight:"30px",verticalAlign:"middle"
            }} onClick={this.openStash.bind(this)}>
                ◄
        </span>

        <span style={{
                display:"inline-block",
                position:"absolute",fontSize:"15pt",
                top:"2px",left:"45px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer",
                borderRadius:"5px",border:"1px solid rgba(0,0,0,0.05)",lineHeight:"30px",verticalAlign:"middle"
            }} onClick={this.openStash.bind(this)}>
                ►
        </span>

        <span style={{
                display:"inline-block",
                position:"absolute",fontSize:"15pt",
                top:"2px",right:"100px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer",
                borderRadius:"5px",border:"1px solid rgba(0,0,0,0.05)",lineHeight:"30px",verticalAlign:"middle"
            }} onClick={this.openStash.bind(this)}>
                ↺
        </span>
        </div>
      </div>
    );
  }

  openStash(){
      this.props.openStash();
  }

}

window.Navigator = Navigator;