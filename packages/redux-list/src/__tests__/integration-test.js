import reduxList, {reducer} from '../index';
import React, {PureComponent} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

describe('reduxList HOC Test', () => {
  let store = null;

  beforeEach(() => {
    store = createStore(
      combineReducers({
        list: reducer
      }),
      applyMiddleware(thunk)
    );
  });

  it('basic list actions', async () => {
    let promise = null;
    const fetcher = (query = {}) => {
      promise = Promise.resolve({
        results: [1, 2, 3, 4, 5],
        total: 100,
        current: query.page ? query.page.current : 1
      });
      return promise;
    };

    class List extends PureComponent {
      render() {
        return <div {...this.props} />;
      }
    }

    const HOCList = reduxList({list: 'testList', fetcher})(List);

    class App extends PureComponent {
      render() {
        return (
          <Provider store={store}>
            <HOCList />
          </Provider>
        );
      }
    }

    const component = renderer.create(<App />);

    let tree = component.toJSON();

    const initialState = {
      results: [],
      pager: undefined,
      loading: false,
      filters: {},
      selections: []
    };

    const responseState = {
      ...initialState,
      results: [1, 2, 3, 4, 5],
      pager: {current: 1, total: 100}
    };

    const getState = () => store.getState().list.testList;

    expect(getState()).toEqual({...initialState, loading: true});

    await promise;
    expect(getState()).toEqual(responseState);

    const selectionsState = {...responseState, selections: [1, 2, 3]};
    tree.props.list.updateSelections([1, 2, 3]);
    expect(getState()).toEqual(selectionsState);

    const pagerState = {...selectionsState, pager: {current: 2, pageSize: 20, total: 100}};
    tree.props.list.updatePager({current: 2, pageSize: 20});
    expect(getState()).toEqual(pagerState);

    const filtersState = {...pagerState, filters: {a: 1, b: 2}};
    tree.props.list.updateFilters({a: 1, b: 2});
    expect(getState()).toEqual(filtersState);

    expect(tree).toMatchSnapshot();

  });
});
