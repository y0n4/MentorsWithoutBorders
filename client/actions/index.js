/*
  'Dispatch an action' in order to change the state
  Actions require a 'type' property to describe how to change state
  An action can take in a 'payload' which is potentially what is going to be
  added/changed in the state
  
  Ex.
  (  In order to avoid typos and other common errors, action types 
  are stored inside constants/action-types.js )
  
  import { CHANGE_VIEW } from '../constants/action-types';

  export const changeView = (view) => ({ 
    type: 'CHANGE_VIEW',
    payload: view
  });
*/