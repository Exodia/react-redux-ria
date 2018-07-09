// @flow
/**
 * @file createActionCreators.js 列表actionCreators创建函数
 * @author exodia(d_xinxin@163.com)
 */
import {UPDATE_LOADING, UPDATE_SELECTIONS, UPDATE_PAGER, UPDATE_FILTERS, UPDATE_RESULTS} from './actionTypes';

import type {
  ListQuery,
  Fetcher,
  ListActionCreators,
  Pager,
  ErrorHandler,
  Filters,
  ListState,
  Thunk
} from './flow-types';

// 数据源的key字段，先用id，后面再根据场景需求开放配置
const INDEX_KEY = 'id';

type ActionCreatorsConfig = {
  identifier: string,
  fetcher: Fetcher,
  errorHandler: ErrorHandler,
  selector: (state: { [identifier: string]: ListState }) => ListState
}

/**
 * 列表actionCreators对象创建函数
 *
 * @param identifier {string} 列表唯一标识
 * @param fetcher {Fetcher} 数据获取函数
 * @param errorHandler {ErrorHandler} 异常处理函数
 * @param selector {Function} 列表状态选择器
 * @return {ListActionCreators} 列表actionCreators方法对象
 */
export default function create(
  {identifier, fetcher, errorHandler, selector}: ActionCreatorsConfig
): ListActionCreators {

  const createAction = (type, payload, meta = {identifier}) => ({type, payload, meta});

  const updatePager = (page: Pager) => createAction(UPDATE_PAGER, page);

  const updateSelections = (selections: any[]) => createAction(UPDATE_SELECTIONS, {selections});

  const updateFilters = (filters: Filters) => createAction(UPDATE_FILTERS, {filters});

  const updateResults = (results: any[]): Thunk => (dispatch, getState) => {

    dispatch(createAction(UPDATE_RESULTS, {results}));

    const selections = selector(getState()).selections.filter(
      key => results.some(v => v[INDEX_KEY] === key)
    );

    dispatch(updateSelections(selections));
  };

  const fetch = (params: ListQuery = {}): Thunk => async dispatch => {
    dispatch(createAction(UPDATE_LOADING, {loading: true}));

    if (params.filters) {
      dispatch(updateFilters(params.filters));
    }

    try {
      const {results, current, total} = await fetcher(params);
      dispatch(updateResults(results));
      dispatch(updatePager({current, total}));
    }
    catch (e) {
      errorHandler(e);
    }
    finally {
      dispatch(createAction(UPDATE_LOADING, {loading: false}));
    }
  };

  return {
    fetch,
    updateResults,
    updatePager,
    updateSelections,
    updateFilters
  };
}
