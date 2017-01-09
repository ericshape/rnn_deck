import React, {Component, PropTypes} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

// const propTypes = {
//   item: PropTypes.object.isRequired,
//   style: PropTypes.object
// };
//
// const Card = (props) => {
//
//   const { style, item } = props;
//   let glyph = 'star-empty';
//   if(item.star == true){
//     glyph = 'star';
//   }
//
//   return (
//     <div style={style} className="item" id={style ? item.id : null}>
//       <div className="item-name">{item.user.screen_name}</div>
//       <div className="item-container">
//         <div className="item-content">
//           <div className="item-author">{`${item.user.name}`}</div>
//           <div>{`${item.text}`}</div>
//         </div>
//       </div>
//       <div className="item-perfomers">
//         <div className="add-perfomers" onClick={()=>{
//           console.log("In clicked Glyph");
//           glyph = 'star'
//         }}>
//           <Glyphicon glyph={glyph} />
//         </div>
//         <div className="delete-perfomers">
//           <Glyphicon glyph="remove"/>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// Card.propTypes = propTypes;
//
// export default Card;
//
//


//------------------------------------------------------------------

export default class Card extends Component {

  constructor() {
  super()
  this.state = {glyph: 'star-empty'}
  }

  render() {

    const { style, item, star } = this.props;
    // let glyph = 'star-empty';
    // if(item.star){
    //   glyph = 'star';
    //   console.log('----------HHHHHH--------------');
    // }

    return (
      <div style={style} className="item" id={style ? item.id : null}>
        <div className="item-name">{`${item.user.screen_name}`}</div>
        <div className="item-container">
          <div className="item-content">
            <div className="item-author">{`${item.user.name}`}</div>
            {/*<div>{`${item.text}`}</div>*/}
            <div dangerouslySetInnerHTML={ { __html: item.html_text } }></div>
            {/*<div>{item.text}</div>*/}
          </div>
        </div>
        <div className="item-perfomers">
          <div className="add-perfomers" onClick={() => {
            {/*this.setState({glyph: (glyph == 'star-empty')? 'star': 'star-empty'});*/}
            this.setState({glyph: (this.state.glyph == 'star-empty')? 'star': 'star-empty'});
            this.props.star(item.id);
          }}>
            <Glyphicon glyph={this.state.glyph}/>
            {/*<Glyphicon glyph={glyph}/>*/}
          </div>
          <div className="delete-perfomers">
            <Glyphicon glyph="remove"/>
          </div>
        </div>
      </div>
    );
  }
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
    style: PropTypes.object,
    star: PropTypes.func.isRequired
};




{/*Card.propTypes = propTypes;*/}
//
// export default Card;

