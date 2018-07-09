// @flow

/**
 * @file flow-type.js 类型定义文件
 * @author exodia(d_xinxin@163.com)
 */

import type {Dispatch as ReduxDispatch} from 'redux';

// 分页数据结构
export type Pager = { current?: number, pageSize?: number, total?: number };

// 排序数据结构
export type Sort = Array<{ field: string, order: 'descend' | 'ascend' }>;

// 筛选数据结构
export type Filters = { [field: string]: any };

// 数据获取函数
export type Fetcher = (query: ListQuery) => Promise<ListResult>;

// 异常处理函数
export type ErrorHandler = (error: Error) => void;

// 列表查询
export type ListQuery = {
  filters?: Filters,
  page?: Pager,
  sort?: Sort
};

// 列表结果
export type ListResult = {
  results: Array<any>,
  total: number,
  current?: number
};

// 列表状态数据结构
export type ListState = {
  results: Array<any>, // 列表结果
  selections: Array<any>, // 列表选中项
  loading: boolean, // 是否加载中
  pager?: Pager, // 分页信息
  filters?: Filters, // 筛选信息
  sort?: Sort // 排序信息
};

// 列表集合状态
export type ReduxListState = { [id: string]: ListState };

export type Thunk = (dispatch: ReduxDispatch, getState: () => ReduxListState) => Promise<void> | void

export type Action = {
  type: string,
  payload: any,
  meta?: { [filed: string]: any },
  error?: boolean
}

// 列表actionCreators
export type ListActionCreators = {
  fetch: (query: ListQuery) => Thunk,
  updateResults: (results: any[]) => Thunk,
  updateSelections: (selections: any[]) => Action,
  updatePager: (page: Pager) => Action,
  updateFilters: (filters: Filters) => Action,
  updateSort?: (sort: Sort) => Action
}
