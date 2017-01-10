import React, {Component, PropTypes} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export default class Card extends Component {

  constructor() {
  super()
  this.state = {glyph: 'star-empty'}
  }

  render() {

    const { style, item, star } = this.props;
    let glyph = 'star-empty';
    if(item.star){
      glyph = 'star';
    }

    return (

      <div style={style} className="item" id={style ? item.id : null}>
        <div className="item-name">{`${item.user.screen_name}`}</div>
        <div className="item-container">
          <div className="item-content">
            <div className="item-author">{`${item.user.name}`}</div>
            <div dangerouslySetInnerHTML={ { __html: item.html_text } }></div>
          </div>
        </div>
        <div className="item-perfomers">
          <div className="add-perfomers" onClick={() => {

            console.log('-----------------------------');
            console.log(this.state.glyph);
            console.log(this.state.glyph == 'star-empty');
            {/*if(this.state.glyph === 'star'){*/}
              {/*console.log("In this part")*/}
              {/*this.setState({glyph: 'star'});*/}
            {/*}  else {*/}
              {/*this.setState({glyph: 'star-empty'});*/}
            {/*}*/}
            {/*this.setState({glyph: (this.state.glyph == 'star-empty')? 'star': 'star-empty'});*/}
            console.log(this.state.glyph);
            this.props.star(this.props.y);
          }}>
            {/*<Glyphicon glyph={this.state.glyph}/>*/}
            <Glyphicon glyph={glyph}/>
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
    star: PropTypes.func.isRequired,
  y: PropTypes.number
};




{/*Card.propTypes = propTypes;*/}
//
// export default Card;

