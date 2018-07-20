// @flow

/**
 * @file reducer.js.js redux list reducer
 * @author exodia(d_xinxin@163.com)
 */

import {
  UPDATE_FILTERS,
  UPDATE_RESULTS,
  UPDATE_LOADING,
  UPDATE_SELECTIONS,
  UPDATE_PAGER
} from './actionTypes';

import type {ListState, ReduxListState, Action} from './flow-types';

const getInitialState = (): ListState => ({
  results: [],
  selections: [],
  loading: false,
  filters: {},
  pager: undefined
});

export default function reducer(state: ReduxListState = {}, action: Action): ReduxListState {
  // 根据标识符判断是否要接管此次action
  if (!action.meta || !action.meta.identifier) {
    return state;
  }

  const {type, meta: {identifier}} = action;

  // 获取当前列表状态
  const listState = state[identifier] || getInitialState();

  const subState = state[identifier];
  const subReducer = mapReducer[type];
  return subReducer ? {
    ...state,
    [identifier]: {
      ...listState,
      ...subReducer(subState, action)
    }
  } : state;
}

const spreadReducer = (state: ListState, action): ListState => ({...state, ...action.payload});

const mapReducer = {

  [UPDATE_LOADING]: spreadReducer,

  [UPDATE_RESULTS]: spreadReducer,

  [UPDATE_SELECTIONS]: spreadReducer,

  [UPDATE_FILTERS]: spreadReducer,

  [UPDATE_PAGER]: (state: ListState, {payload}): ListState => ({
    ...state,
    pager: {...state.pager, ...payload}
  })
};
