class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rootStyle ={
      width:"180px",
      height:"230px",
      borderRadius:"10px",
      border:"1px solid rgba(0,0,0,0.05)",
      margin:"10px",
      background:"white",
      overflowY:"scroll",
      display:"inline-block",
      position:"relative"
    };

    // let cardData = [
    //     {type:2,payload:{url:"https://assets-cdn.github.com/images/modules/open_graph/github-mark.png",icon:true}},
    //     {type:0,payload:{text:"Project X"}},
    //     {type:1,payload:{title:"Stars",subtitle:"585"}},
    //     {type:1,payload:{title:"Forks",subtitle:"111"}},
    //     {type:1,payload:{title:"Description",subtitle:"This project is about skjdnakjbdalsbndjabsjdhbasdh dajabssdkbahsdhkasb dhjashjd ashb asjhb jas"}},
    //     {type:3,payload:{text:"See repo", url:"http://github.com"}},
    //     {type:2,payload:{url:"http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg",icon:false}},
    // ];

      let colourElement = this.props.data.filter((element) => {
        return element.type == 5;
      });

      console.log('HELLO');
      if (colourElement) {
          rootStyle.background = colourElement[0].payload.color;
      }

    let elements = this.props.data.map(function(x) {
        return Card.getElement(x.type,x.payload);
    }.bind(this));
    

    return (
      <div style={rootStyle}>
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

  static getElement(type,payload){
      let key = Card.hashCode(JSON.stringify(payload));
      if(type == 0){
          return <h1 key={key} style={{
              margin:"0px",
              textAlign:"center",
            padding:"5px",
            paddingTop:"8px",
            paddingBottom:"8px",
            fontSize:"11pt",
            background:"rgba(0,0,0,0.00)",fontWeight:"400",borderBottom:"1px solid rgba(0,0,0,0.05)"
          }}>
            {payload["text"]}
          </h1>
      }
      else if(type == 1){
          return <div key={key}>
            <h1 style={{
                margin:"8px",
                fontSize:"9pt"   ,fontWeight:"400" 
            }}>
                {payload["title"]}
            </h1>

            <h2 style={{
                margin:"8px",
                fontSize:"8pt",
                color:'gray',
                wordWrap:"break-word"
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
                width:"180px",maxWidth:"180px",display:"inline-block"
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
            cursor:"pointer"
          }} onClick={() => this.onURLClicked(payload["url"])}>
                <h1 style={{
                margin:"0px",
                textAlign:"center",
                padding:"5px",
                paddingTop:"8px",
                paddingBottom:"8px",
                fontSize:"11pt",
                background:"rgba(0,0,0,0.00)",fontWeight:"400",borderBottom:"1px solid rgba(0,0,0,0.025)"
            }}>
                {payload["name"]}
            </h1>
          </div>
      }
  }

  onURLClicked(url){
      this.props.onURLClicked(url);
  }
}

window.Card = Card;