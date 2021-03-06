import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../../actions/lists';

import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';
import SearchBar from './SearchBar';

function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.addList = this.addList.bind(this);


    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };

    this.searchList = this.searchList.bind(this);
    this.rankList = this.rankList.bind(this);
    this.copyList = this.copyList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.star = this.star.bind(this);
  }

  componentWillMount() {
    this.props.getLists(10);
  }

  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  moveCard(lastX, lastY, nextX, nextY) {
    this.props.moveCard(lastX, lastY, nextX, nextY);
  }

  moveList(listId, nextX) {
    console.log("In board.js");
    const { lastX } = this.findList(listId);
    console.log(lastX);
    this.props.moveList(lastX, nextX);
  }

  addList(listId){

    const { lastX } = this.findList(listId);
    this.props.addList(lastX);

  }

  searchList(listId, tags){

    console.log(listId);
    // change "hello world" into real input.
    // this.props.searchList(listId, searchString);
    this.props.searchList(listId, tags);
  }

  rankList(listId, rank){
    this.props.rankList(listId, rank);
  }

  copyList(listId){

    console.log(listId);
    // change "hello world" into real input.
    this.props.copyList(listId);
  }


  deleteList(listId){

    console.log(listId);
    // change "hello world" into real input.
    this.props.deleteList(listId);
  }


  star(listId, cardId){
    this.props.star(listId, cardId);
  }


  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];

    return {
      list,
      lastX: lists.indexOf(list)
    };
  }


  render() {
    const { lists } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <CustomDragLayer snapToGrid={false} />

        {lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            copyList={this.copyList}
            deleteList={this.deleteList}
            moveCard={this.moveCard}
            moveList={this.moveList}
            addList={this.addList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}

            searchList={this.searchList}
            rankList={this.rankList}
            rank={item.rank}

            star={this.star}
          />
        )}
      </div>
    );
  }
}
