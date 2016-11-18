class Stash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rootStyle ={
      
    };
    let items = window.stashed_items.map(item=><window.Card data={item}/>);
    return (
        <div style={rootStyle}>
            {items}
        </div>
    );
  }

}

window.Stash = Stash;