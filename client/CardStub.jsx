class CardStub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering:false,
      coords:{x:0,y:0},
      loaded:false
    };
  }

  render() {
    let rootStyle ={
      width:"95%",
      borderRadius:"10px",
      border:"1px solid rgba(0,0,0,0.05)",
      margin:"10px",
      background:"white",
      cursor:"pointer",
      display:"inline-block",transition:"opacity 1.5s, transform 1.5s",opacity:this.state.loaded ? 1:0,transform:this.state.loaded ? "" : "scale(0.5)"
    };
    let title = this.props.data.filter(x=>x.type == 0)[0].payload["text"];
    let card = <window.Card onMouseOut={this.mouseLeave.bind(this)} data={this.props.data} style={{
      position:"fixed",visibility:this.state.hovering?"visible" : "hidden",
      left:this.state.coords.left+"px",top:this.state.coords.top+"px",
      zIndex:99999,width:this.state.coords.width
  }}/>;
    return (
      <div style={rootStyle} onMouseEnter={this.mouseEnter.bind(this)}> 
            <h1 key={title} style={{
              margin:"0px",
              textAlign:"center",
            padding:"5px",
            paddingTop:"8px",
            paddingBottom:"8px",
            fontSize:"11pt",
            background:"rgba(0,0,0,0.00)",fontWeight:"400",
            height:"50px",
            lineHeight:"50px",
            verticalAlign:"middle"
          }}>
            {title}
          </h1>

          {card}
          <i style={{
            position:"absolute",
            lineHeight:"50px",verticalAlign:"center"
          }} className="fa fa-eye"/>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(()=>this.setState({loaded:true}),1500);
  }

  mouseEnter(e) {
      if(this.state.hovering) return;
      this.setState({hovering:true, coords:{
        left:e.target.getBoundingClientRect().left-10,
        top:e.target.getBoundingClientRect().top-10,
        width:e.target.getBoundingClientRect().width-10
      }});
  }

  mouseLeave(e) {
          this.setState({hovering:false});
  }

}

window.CardStub = CardStub;