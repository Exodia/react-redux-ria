// @flow

import React, {PureComponent} from 'react';
import {Table} from 'antd';
import type{Filters, ListActionCreators, ListState, Pager} from '@react-redux-ria/redux-list';

export type ListTableProps = {
  list: ListActionCreators,
  listData: ListState,
  pagination?: Object,
  columns: Array<Object>,
  className?: string
}

type Sort = { field: string, order: 'descend' | 'ascend' };

export default class ListTable extends PureComponent<ListTableProps> {

  onSelect = (keys: any[]) => this.props.list.updateSelections(keys);

  onChange = (pagination: Pager, filters: Filters, sort: Sort) => {
    this.props.list.fetch({
      page: pagination,
      sort: [sort],
      filters
    });
  };

  render() {
    const data = this.props.listData;
    const rowSelection = {
      selectedRowKeys: data.selections,
      onChange: this.onSelect
    };

    const pagination = this.props.pagination && data.pager
      ? {...data.pager, ...this.props.pagination}
      : false;

    return (
      <div className={this.props.className}>
        <Table
          rowKey="id"
          dataSource={data.results}
          columns={this.props.columns}
          rowSelection={rowSelection}
          pagination={pagination}
          loading={data.loading}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
