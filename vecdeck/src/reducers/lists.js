import {Record} from 'immutable';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  ADD_LIST,
  SEARCH_LIST,
  TOGGLE_DRAGGING
} from '../actions/lists';

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  lists: [],
  tweets: [],
  isDragging: false
});
/* eslint-enable new-cap */
const initialState = new InitialState;


export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set('isFetching', true);
    case GET_LISTS:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', false)
          .set('tweets', action.tweets)
          .set('lists', action.lists);
      });
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const {lastX, lastY, nextX, nextY} = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case MOVE_LIST: {

      console.log("In reducers/lists.js");
      const newLists = [...state.lists];
      // const {listId, searchString} = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case ADD_LIST: {
      const newLists = [...state.lists];
      const {lastX, nextX} = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case SEARCH_LIST: {
      const newLists = [...state.lists];
      const {listId, searchString} = action;

      newLists[listId].cards = state.tweets.filter(function (tweet) {
        console.log('------------------------------');
        if (!searchString || searchString.length === 0) {
          return true;
        }

        let searched = false;
        // split search text on space
        let searchTerms = searchString.split(' ');
        // search for single terms.
        // this reduces the item list step by ste
        searchTerms.forEach(function (term) {
          if (term && term.length) {
            if (tweet.text.includes(term) || tweet.user.name.includes(term) || tweet.user.screen_name.includes(term)) {
              searched = true;
            }
          }
        });

        return searched;
      });

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }
    case TOGGLE_DRAGGING: {
      return state.set('isDragging', action.isDragging);
    }
    default:
      return state;
  }
}
