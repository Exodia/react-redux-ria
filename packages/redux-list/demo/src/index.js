// @flow

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';
import reduxList from '@react-redux-ria/redux-list';
import {fetcher} from './service';
import ListTable from './components/ListTable';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    filters: [
      {text: 'Joe', value: 'Joe'},
      {text: 'Jim', value: 'Jim'}
    ],
    filterMultiple: false
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
    filters: [
      {text: '10', value: 10},
      {text: '11', value: 11}
    ]
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    sorter: true
  }
];

const List1 = reduxList({list: 'list1', fetcher: fetcher})(ListTable);
const List2 = reduxList({list: 'list2', fetcher: fetcher})(ListTable);

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <div>
          <h1>List1</h1>
          <List1
            columns={columns}
            className={'list1'}
            pagination={{
              showTotal: total => `共 ${total} 条记录`
            }}
          />
        </div>

        <div>
          <h1>List2</h1>
          <List2 columns={columns} className={'list1'} />
        </div>
      </Fragment>
    </Provider>
  )
}

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(<App />, root);
}
