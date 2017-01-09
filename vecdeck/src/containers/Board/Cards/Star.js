/**
 * Created by Yali on 1/9/17.
 */

import React, {Component, PropTypes} from 'react';

export default class Cards extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    canDrop: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  };

  render() {
    const {connectDropTarget, x, cards, isOver, canDrop} = this.props;
    const {placeholderIndex} = this.state;

    return connectDropTarget(
      <div className="desk-items">
        {cardList}
      </div>
    );
  }
}

