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
      overflowY:"scroll"
    };

    let cardData = [
        {type:2,payload:{url:"https://assets-cdn.github.com/images/modules/open_graph/github-mark.png"}},
        {type:0,payload:{text:"Project X"}},
        {type:1,payload:{title:"Stars",subtitle:"585"}},
        {type:1,payload:{title:"Description",subtitle:"This project is about skjdnakjbdalsbndjabsjdhbasdh dajabssdkbahsdhkasb dhjashjd ashb asjhb jas"}},
        {type:3,payload:{text:"See repo", url:"http://github.com"}},
        {type:3,payload:{text:"Star this", url:"http://github.com"}},
    ];

    let elements = cardData.map(function(x) {
        return this.getElement(x.type,x.payload);
    }.bind(this));
   
    return (
      <div style={rootStyle}>
            {elements}
      </div>
    );
  }

  getElement(type,payload){
      if(type == 0){
          return <h1 style={{
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
          return <div>
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
      else if(type == 2){
          return <div style={{
              width:"100%",textAlign:"center",
              paddingTop:"5px"
          }}>
            <img style={{
                maxHeight:"60px",maxWidth:"60px",display:"inline-block"
            }} src={payload["url"]}/>
          </div>
      }
      else if(type == 3){
          return <div style={{
            marginTop:"5px",
            marginBottom:"5px",
            marginLeft:"5px",
            marginRight:"5px",
            borderRadius:"5px",
            border:"1px solid rgba(0,0,0,0.05)",
            cursor:"pointer"
          }}>
                <h1 style={{
                margin:"0px",
                textAlign:"center",
                padding:"5px",
                paddingTop:"8px",
                paddingBottom:"8px",
                fontSize:"11pt",
                background:"rgba(0,0,0,0.00)",fontWeight:"400",borderBottom:"1px solid rgba(0,0,0,0.025)"
            }}>
                {payload["text"]}
            </h1>
          </div>
      }
  }
}

window.Card = Card;