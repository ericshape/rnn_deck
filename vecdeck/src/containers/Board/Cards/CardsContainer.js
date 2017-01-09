import React, {Component, PropTypes} from 'react';
import {DropTarget, DragSource} from 'react-dnd';
import {Button, ButtonToolbar, Dropdown, MenuItem} from 'react-bootstrap'
// import Button from 'react-bootstrap/lib/Button'

import Cards from './Cards';
// import SearchBar from '../SearchBar';
import {WithOutContext as ReactTags} from 'react-tag-input';
import TagsInput from 'react-tagsinput';
// import 'react-tagsinput/react-tagsinput.css';


const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
        monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const {id: listId} = monitor.getItem();
    const {id: nextX} = props;
    if (listId !== nextX) {
      console.log("in CardsContainer.js");
      props.moveList(listId, props.x);
    }
  }
};


@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    copyList: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,

    searchList: PropTypes.func.isRequired,
  };

  render() {
    const {connectDropTarget, connectDragSource, item, x, moveCard, isDragging} = this.props;
    const opacity = isDragging ? 0.5 : 1;


    let tags = item.tags;

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{opacity}}>
        <div className="desk-head">
          <div className="desk-name">
            ListID: {item.id}
            {/*<ButtonToolbar>*/}
            <Button bsStyle="danger" bsSize="xsmall" style={{float: 'right', margin: '3px 3px 3px 3px'}}
                    onClick={() => {
                      let listId = this.props.item.id;
                      this.props.deleteList(listId);
                    }}>Delete</Button>

            <Button bsStyle="primary" bsSize="xsmall" style={{float: 'right', margin: '3px 3px 3px 3px'}}
                    onClick={() => {
                      let listId = this.props.item.id;
                      this.props.copyList(listId);
                    }}>Copy</Button>

          </div>

          <TagsInput value={tags} onChange={(tags) =>{
            let listId = this.props.item.id;
            console.log(tags);
            this.props.searchList(listId, tags);
          }} />
        </div>

        {/*<br/>*/}

        <Cards
          moveCard={moveCard}
          x={x}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    ));
  }
}
