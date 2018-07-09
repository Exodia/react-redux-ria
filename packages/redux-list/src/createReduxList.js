// @flow

/**
 * @file createReduxList.js redux list hoc 创建函数
 * @author exodia(d_xinxin@163.com)
 */
import {PureComponent, createElement} from 'react';
import create from './createActionCreators';
import hoistStatics from 'hoist-non-react-statics'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import type {ErrorHandler, Fetcher, ListActionCreators, ListState} from './flow-types';
import type {ComponentType} from 'react';

// hoc list decorator 配置
type HOCListConfig = {
  list: string, // 列表 id
  fetcher: Fetcher, // 列表数据获取函数
  errorHandler?: ErrorHandler, // 异常处理函数
  selector?: (state: Object) => Object // redux list状态选择器，默认为 state => state.list
};

const defaultListSelector = state => state.list;
const defaultErrorHandler = e => {throw e;};

const idSet = new Set();

export default function createReduxList(config: HOCListConfig) {
  const {
    list: identifier,
    fetcher,
    selector = defaultListSelector,
    errorHandler = defaultErrorHandler
  } = config;

  if (idSet.has(identifier)) {
    throw new Error(`identifier '${identifier}' has been used!`);
  }

  idSet.add(identifier);

  const actionCreators = create({
    identifier,
    fetcher,
    errorHandler,
    selector: state => selector(state)[identifier]
  });

  return function (Component: ComponentType<*>) {

    const connector = connect(
      state => ({listData: selector(state)[identifier]}),
      dispatch => ({
        list: bindActionCreators(actionCreators, dispatch)
      })
    );

    class List extends PureComponent<{ list: ListActionCreators, listData: ListState, ...* }> {

      static listIdentifier: string = identifier;
      static wrappedComponent: ComponentType<*> = Component;
      static displayName = 'redux-list(' + (Component.displayName || Component.name) + ')';

      componentDidMount() {
        this.props.list.fetch();
      }

      render() {
        return this.props.listData ? createElement(Component, {...this.props}) : null;
      }
    }
    const ConnectedList = hoistStatics(connector(List), Component);

    return ConnectedList;
  }
}
