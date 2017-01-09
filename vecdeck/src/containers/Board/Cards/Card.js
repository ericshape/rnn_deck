import React, { PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const galPng = require('../../../assets/images/gal.png');
const delPng = require('../../../assets/images/del.png');


const Card = (props) => {
  const { style, item } = props;

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">{item.user.screen_name}</div>
      <div className="item-container">
        <div className="item-content">
          <div className="item-author">{`${item.user.name}`}</div>
          <div>{`${item.text}`}</div>
        </div>
      </div>
      <div className="item-perfomers">
        <div className="add-perfomers">
          {/*<Glyphicon glyph="star" />*/}
          <Glyphicon glyph="star-empty" />
        </div>
        <div className="delete-perfomers">
          <Glyphicon glyph="remove"/>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
