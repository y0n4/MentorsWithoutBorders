/*
  Reducers produce the state of the application
  Reducers take in two first parameters: initial state and an action
  Next state is calculated based on the action type
  Should return the initial state if no matching actions

  import { CHANGE_VIEW } from '../constants/action-types';

  const initialState = {
    view: 'main'
  };

  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case CHANGE_VIEW:
        return { ...state, view: 'somethingElse' }; <-- not sure if correct since state is supposed to be immutable
      default:
        return state;
    }
  };

  export default rootReducer;


  Tip: The spread operator is not valid yet therefore include
  "plugins": ["transform-object-rest-spread"]
  inside .bablerc
*/

import { CHANGE_VIEW } from '../constants/action-types';

const initialState = {
  view: 'main',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return { ...state, view: 'somethingElse' };
    default:
      return state;
  }
};

export default rootReducer;
