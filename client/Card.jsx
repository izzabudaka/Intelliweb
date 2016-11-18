
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rootStyle = {
      width:"240px",
      borderRadius:"10px",
      border:"1px solid rgba(0,0,0,0.05)",
      margin:"10px",
      background:"white",
      overflowY:"scroll",
      display:"inline-block",
      position:"relative",
      boxShadow:"0px 0px 33px 0px rgba(0,0,0,0.19)",
      overflowX:"hidden"
    };

    for (var attrname in this.props.style) { rootStyle[attrname] = this.props.style[attrname]; }


    // let cardData = [
    //     {type:2,payload:{url:"https://assets-cdn.github.com/images/modules/open_graph/github-mark.png",icon:true}},
    //     {type:0,payload:{text:"Project X"}},
    //     {type:1,payload:{title:"Stars",subtitle:"585"}},
    //     {type:1,payload:{title:"Forks",subtitle:"111"}},
    //     {type:1,payload:{title:"Description",subtitle:"This project is about skjdnakjbdalsbndjabsjdhbasdh dajabssdkbahsdhkasb dhjashjd ashb asjhb jas"}},
    //     {type:3,payload:{text:"See repo", url:"http://github.com"}},
    //     {type:2,payload:{url:"http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg",icon:false}},
    // ];xw


    let elements = this.props.data.map(function(x) {
        return Card.getElement(x.type,x.payload,this.props);
    }.bind(this));
    

    return (
      <div style={rootStyle} onMouseLeave={()=>this.props.onMouseOut()}>
            {elements}
            <span style={{
                display:"inline-block",
                position:"absolute",
                top:"5px",right:"0px",width:"30px",height:"30px",textAlign:"center",cursor:"pointer"
            }} onClick={this.stash.bind(this)}>
                ☆
            </span>

      </div>
    );
  }

  stash(e){
      e.target.remove();
      if(window.stashed_items == undefined) {
          window.stashed_items = [this.props.data];
      }else{
          window.stashed_items.push(this.props.data);
      }
  }

    static hashCode(str) {
        if(str == undefined)return;
    return str.split('').reduce((prevHash, currVal) =>
        ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
    }

    componentDidUpdate(){
        
        if(this.props == undefined)return;
        if(this.props.data.filter(x=>x.type==4)[0]==undefined)return;
        if(document.getElementById("canvasx")==undefined)return;
        console.log(document.getElementById("canvasx"));
        let props = this.props;
        setTimeout(function(){
            var myChart = new Chart(document.getElementById("canvasx"), {
            type: 'radar',
            data: props.data.filter(x=>x.type==4)[0].payload["data"]
        });
        },5000)
    }

  chartCanvas;
  static getElement(type,payload,props){
      let key = Math.random();
      if(type == 0){
          return <h1 key={key} style={{
              margin:"0px",
              textAlign:"center",
            padding:"5px",
            paddingTop:"8px",
            paddingBottom:"8px",
            fontSize:"11pt",
            color: "#222" || 'gray',
            background:"rgba(0,0,0,0.00)",fontWeight:"400",borderBottom:"1px solid rgba(0,0,0,0.05)",whiteSpace:"nowrap"
          }}>
            {payload["text"]}
          </h1>
      }
      else if(type == 1){
          return <div key={key}>
            <h1 style={{
                margin:"8px",
                marginTop:"14px",
                color:"#222"  || 'gray',
                fontSize:"12pt",
            }}>
                {payload["title"]}
            </h1>

            <h2 style={{
                margin:"8px",
                fontSize:"11pt",
                color:"#222"  || 'gray',
                wordWrap:"break-word",
                maxHeight: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {payload["subtitle"]}
            </h2>
          </div>
      }
      else if(type == 2 && payload["icon"] == true){
          return <div key={key} style={{
              width:"100%",textAlign:"center",
              paddingTop:"5px"
          }}>
            <img style={{
                maxHeight:"60px",maxWidth:"60px",display:"inline-block"
            }} src={payload["url"]}/>
          </div>
      }
      else if(type == 2){
          return <div key={key} style={{
              width:"100%",textAlign:"center",
              marginBottom:"5px"
          }}>
            <img style={{
                width:"240px",maxWidth:"240px",display:"inline-block"
            }} src={payload["url"]}/>
          </div>
      }
      else if(type == 3){
          return <div key={key} style={{
            marginTop:"5px",
            marginBottom:"5px",
            marginLeft:"5px",
            marginRight:"5px",
            borderRadius:"5px",
            border:"1px solid rgba(0,0,0,0.05)",
            cursor:"pointer",
            backgroundColor: payload["background"] || "inherit"
          }} onClick={() => props.onURLClicked(payload["url"])}>
                <h1 style={{
                margin:"0px",
                textAlign:"center",
                padding:"5px",
                paddingTop:"8px",
                paddingBottom:"8px",
                fontSize:"11pt",
                color: "#222"  || 'inherit',
                background:"rgba(0,0,0,0.00)",fontWeight:"400",borderBottom:"1px solid rgba(0,0,0,0.025)"
            }}>
                {payload["name"]}
            </h1>
          </div>
      }
      else if(type == 4){
          return <div>
                       <canvas id="canvasx" width="400" height="400"></canvas>
          </div>
      }
  }

  drawChart(){
      console.log(this.props.data.filter(x=>x.type==4));
      console.log(this.props.data.filter(x=>x.type==4).length > 0);
      if(this.props.data.filter(x=>x.type==4).length>0) {
          console.log(this.chartCanvas);
          if(this.chartCanvas == undefined) return;
          var myRadarChart = new Chart(this.chartCanvas.getDOMNode(), {
                type: 'radar',
                data: this.props.data.filter(x=>x.type==4).payload
          });
      }
  }

  onURLClicked(url){
      this.props.onURLClicked(url);
  }
}

window.Card = Card;