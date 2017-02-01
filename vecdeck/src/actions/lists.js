import faker from 'faker';
import fetch from 'isomorphic-fetch'
import Immutable from 'immutable';
// import tweets from 'tweet';
export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const ADD_LIST = 'ADD_LIST';
export const SEARCH_LIST = 'SEARCH_LIST';
export const RANK_LIST = 'RANK_LIST';
export const COPY_LIST = 'COPY_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';
export const STAR_CARD = 'STAR_CARD';


require('es6-promise').polyfill();
require('isomorphic-fetch');


export function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}


export function getLists(x){
  let url = "http://aurora.cs.vt.edu:5000/tweets/tweets/9";
  return dispatch => {
    dispatch({type: 'GET_LISTS_START', isFetching: false});

     fetch(url,
      {
        credentials: "same-origin",
        method: "get",
        // body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          console.log(response.json);

          var tweets, lists = update_tweets(response.json)  ;

          console.log(lists);
          console.log(tweets);

          dispatch({type: GET_LISTS, lists, tweets: tweets, isFetching: true});

        }
      });
  }
}


export function update_tweets(tweets) {

  tweets.map(function (d, i) {
    d.id = i+1;
    d.firstName = "hello";
    d.lastName = "world";
    d.title = "this is a tile";
    d.name = d.screen_name;
    d.html_text = d.text;
    d.star = false;
    d.highlight = false;
  });

  let lists = [];

  lists.push({
    id: 0,
    rank:'CREATE_TIME',
    name: faker.commerce.productName(),
    tags: [],
    suggestions: [],
    cards: JSON.parse(JSON.stringify(tweets))
  });

  console.log("In DISPATCH GET_LISTS")   ;
  return tweets, lists;

}

export function moveList(lastX, nextX) {
  console.log("moveList");

  console.log("In actions/lists.js");
  return (dispatch) => {
    dispatch({type: MOVE_LIST, lastX, nextX});
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  console.log("moveCard");
  return (dispatch) => {
    dispatch({type: MOVE_CARD, lastX, lastY, nextX, nextY});
  };
}

export function searchList(listId, tags){
  console.log("searchList");
  return (dispatch) => {
    // dispatch({type: SEARCH_LIST, listId, searchString});
    dispatch({type: SEARCH_LIST, listId, tags});
  }
}

export function rankList(listId, rank){
  console.log("rankList");
  return (dispatch) => {
    dispatch({type: RANK_LIST, listId, rank});
  }
}

export function copyList(listId){
  console.log("copyList");
  return (dispatch) => {
    dispatch({type: COPY_LIST, listId});
  }
}

export function deleteList(listId){
  console.log("deleteList");
  return (dispatch) => {
    dispatch({type: DELETE_LIST, listId});
  }
}

export function star(listId, cardId) {
  return (dispatch) => {
    dispatch({type: STAR_CARD, listId, cardId});
  }
}

export function toggleDragging(isDragging) {
  console.log("toggleDragging");
  return (dispatch) => {
    GGLE_DRAGGING, isDraggindispatch({type: TOg});
  };
}

// add list using a new list.
export function addList(isDragging) {
  console.log("addList");
  return (dispatch) => {
    dispatch({type: ADD_LIST, isDragging});
  };
}
