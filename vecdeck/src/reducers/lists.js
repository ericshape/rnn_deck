import {Record} from 'immutable';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  ADD_LIST,
  SEARCH_LIST,
  COPY_LIST,
  DELETE_LIST,
  STAR_CARD,
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
      const {listId, tags} = action;

      newLists[listId].tags = tags;
      newLists[listId].cards = state.tweets.filter(function (tweet) {

        if (tags.length == 0) {
          return true;
        }

        let searched = true;
        // split search text on space
        // let searchTerms = searchString.split(' ');
        // search for single terms.
        // this reduces the item list step by ste
        tags.forEach(function (term) {
          if (!(tweet.text.toLowerCase().includes(term.toLowerCase()) || tweet.user.name.toLowerCase().includes(term.toLowerCase()) || tweet.user.screen_name.toLowerCase().includes(term.toLowerCase()))) {
            // if (!(tweet.text.toLowerCase().includes(term.text.toLowerCase()) || tweet.user.name.toLowerCase().includes(term.text.toLowerCase()) || tweet.user.screen_name.toLowerCase().includes(term.text.toLowerCase()))) {
            searched = false;
          }
        });

        return searched;
      });

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }

    //
    //     case SEARCH_LIST: {
    //   const newLists = [...state.lists];
    //   const {listId, searchString} = action;
    //
    //   newLists[listId].cards = state.tweets.filter(function (tweet) {
    //     console.log('------------------------------');
    //     if (!searchString || searchString.length === 0) {
    //       return true;
    //     }
    //
    //     let searched = false;
    //     // split search text on space
    //     let searchTerms = searchString.split(' ');
    //     // search for single terms.
    //     // this reduces the item list step by ste
    //     searchTerms.forEach(function (term) {
    //       if (term && term.length) {
    //         if (tweet.text.toLowerCase().includes(term.toLowerCase()) || tweet.user.name.toLowerCase().includes(term.toLowerCase()) || tweet.user.screen_name.toLowerCase().includes(term.toLowerCase())) {
    //           searched = true;
    //         }
    //       }
    //     });
    //
    //     return searched;
    //   });
    //
    //   return state.withMutations((ctx) => {
    //     ctx.set('lists', newLists);
    //   });
    // }


    case COPY_LIST: {

      const newLists = [...state.lists];
      const {listId} = action;
      let len = newLists.length;
      let cards = JSON.parse(JSON.stringify(newLists[listId].cards));
      newLists.push({
        id: len,
        tags: newLists[listId].tags,
        suggestions: newLists[listId].suggestions,
        // name: faker.commerce.productName(),
        cards: cards
      });

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }

    case DELETE_LIST: {
      const newLists = [...state.lists];
      const {listId} = action;

      newLists.splice(listId, 1);

      newLists.forEach((list, i) => {
        list.id = i;
      });

      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }

    case STAR_CARD: {

      // reorder an array based on ID
      function reorder(arr) {
        arr.sort((a, b) => {
          if (a.id < 0 && b.id < 0) {
            return Math.abs(a.id) - Math.abs(b.id);
          } else {
            return a.id - b.id;
          }
        })
      }


      function highlight(newLists, listId, id) {
        newLists.forEach((iList, i) => {
          if (listId != i) {
            iList.cards.forEach((card) => {
              if (card.id == id) {
                card.highlight = true;
                card.id += 0.5;
              }
            })
          }
        });
      }

      function unHighlight(newLists, listId, id, cardId) {

        let count = 0;
        newLists.forEach((iList, i) => {
          if (listId != i) {
            iList.cards.forEach((card) => {
              if (card.id == -id) {
                count++;
              }
            })
          }
        });
        if (count == 0) {
          newLists.forEach((iList, i) => {
            if (listId != i) {
              iList.cards.forEach((card) => {
                if (Math.floor(card.id) == id && card.highlight) {
                  card.highlight = false;
                  card.id = Math.floor(card.id);
                }
              })
            }
          });
        } else {
          newLists[listId].cards[cardId].highlight = true;
          newLists[listId].cards[cardId].id +=0.5;
        }
      }

      let newLists = [...state.lists];
      const {listId, cardId} = action;
      let selectedList = newLists[listId].cards;

      if(selectedList[cardId].star){
        selectedList[cardId].id = Math.abs(selectedList[cardId].id);
        selectedList[cardId].star = false;
        unHighlight(newLists, listId, selectedList[cardId].id, cardId);
      } else {
        selectedList[cardId].star = true;
        selectedList[cardId].highlight = false;
        selectedList[cardId].id = - Math.floor(selectedList[cardId].id);
        highlight(newLists, listId, - selectedList[cardId].id)
      }

      reorder(selectedList);

      console.log("AFTER REORDER");
      console.log(newLists);
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
