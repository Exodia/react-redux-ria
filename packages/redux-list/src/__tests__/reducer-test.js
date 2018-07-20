import {reducer} from '../index';
import {
  UPDATE_LOADING,
  UPDATE_PAGER,
  UPDATE_SELECTIONS,
  UPDATE_FILTERS,
  UPDATE_RESULTS
} from '../actionTypes';

describe('list reducer Tests', () => {
  const getListState = () => {
    return {
      results: [],
      selections: [],
      loading: false,
      filters: {},
      pager: undefined
    };
  };

  const createAction = (type, id, payload) => {
    return {
      type,
      payload,
      meta: {
        identifier: id
      }
    };
  };

  const reduxListState = {
    list1: getListState(),
    list2: getListState(),
    list3: getListState()
  };

  const updateState = (state, type, id, payload) => {
    return reducer(
      state,
      createAction(type, id, payload)
    );
  };

  it('integration update state', () => {
    const pager = {
      current: 1,
      pageSize: 10,
      total: 100
    };

    const selections = [1, 2, 3];
    const results = {results: [1, 2, 3, 4, 5]};
    const filters = {
      filters: {
        filter1: [1, 2, 3],
        filter2: 'test'
      }
    };

    let newState = updateState(reduxListState, UPDATE_LOADING, 'list1', {loading: true});
    newState = updateState(newState, UPDATE_FILTERS, 'list2', filters);
    newState = updateState(newState, UPDATE_PAGER, 'list2', pager);
    newState = updateState(newState, UPDATE_RESULTS, 'list3', results);
    newState = updateState(newState, UPDATE_SELECTIONS, 'list3', selections);


    expect(newState).toEqual({
      ...reduxListState,
      list1: {
        ...reduxListState.list1,
        loading: true
      },
      list2: {
        ...reduxListState.list2,
        ...filters,
        pager
      },
      list3: {
        ...reduxListState.list3,
        ...results,
        ...selections
      }
    });
  });
});
