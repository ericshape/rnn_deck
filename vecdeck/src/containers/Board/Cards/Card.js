import React, {Component, PropTypes} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'


export default class Card extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    star: PropTypes.func.isRequired,
    y: PropTypes.number,
  }

  render() {
    let {style, item, star, isHighlighted} = this.props;
    let glyph = 'star-empty';

    if (typeof style === "undefined") {
      style = {};
    }


    if (item.star) {
      glyph = 'star';
      style.background = '#ffffb3';
    }
    if (item.highlight) {
      style.background = '#ffffb3';
    }

    return (
      <div style={style} className="item" id={style ? item.id : null}>
        <div className="item-name">{`${item.user.screen_name}`}</div>
        <div className="item-container">
          <div className="item-content">
            <div className="item-author">{`${item.user.name}`}</div>
            <div dangerouslySetInnerHTML={ {__html: item.html_text} }></div>
          </div>
        </div>
        <div className="item-perfomers">
          <div className="add-perfomers" onClick={() => {
            this.props.star(this.props.y);
          }}>
            <Glyphicon glyph={glyph}/>
          </div>
          <div className="delete-perfomers">
            <Glyphicon glyph="remove"/>
          </div>
        </div>
      </div>);
  }

}
