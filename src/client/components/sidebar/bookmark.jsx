/**
 * history select
 */

import {memo} from 'react'
import ItemList from '../setting-panel/list'
import TreeList from '../setting-panel/tree-list'
import _ from 'lodash'
import {
  Icon,
  Tooltip
} from 'antd'
import copy from 'json-deep-copy'

const {prefix, getGlobal} = window
const c = prefix('common')
const m = prefix('menu')
const e = prefix('control')
const sshConfigItems = copy(getGlobal('sshConfigItems'))

export default memo((props) => {
  let {
    bookmarkGroups = [],
    listStyle,
    openedCategoryIds
  } = props
  const onClickItem = (item) => {
    props.modifier({
      openedSideBar: ''
    })
    props.onSelectBookmark(item.id)
  }
  let props0 = {
    bookmarks: [
      ...(props.bookmarks || []),
      ...sshConfigItems
    ],
    type: 'bookmarks',
    onClickItem,
    listStyle
  }
  let bookmarkGroupsTotal = sshConfigItems.length
    ? [
      ...bookmarkGroups,
      {
        title: 'ssh-config',
        id: 'ssh-config',
        bookmarkIds: sshConfigItems.map(d => d.id)
      }
    ]
    : bookmarkGroups
  let bookmarkSelect = bookmarkGroups.length > 1
    ? (
      <TreeList
        {...props}
        {...props0}
        shouldComfirmDel
        staticList
        bookmarkGroups={bookmarkGroupsTotal}
        onClickItem={onClickItem}
        expandedKeys={openedCategoryIds}
        onExpand={openedCategoryIds => {
          props.modifyLs({
            openedCategoryIds
          })
        }}
      />
    )
    : (
      <ItemList
        {...props0}
        list={props0.bookmarks || []}
        onClickItem={item => props.onSelectBookmark(item.id)}
      />
    )
  return (
    <div
      className="sidebar-panel bookmarks-panel animate-fast"
      {..._.pick(props, ['onMouseEnter', 'onMouseLeave'])}
    >
      <div className="pd1y pd2t pd2x">
        <div className="fix">
          <div className="fleft">{c('bookmarks')}</div>
          <div className="fright">
            <Tooltip title={e('newSsh')}>
              <Icon
                type="plus-circle"
                className="font16 mg1x mg2l pointer iblock control-icon icon-do-edit"
                onClick={props.onNewSsh}
              />
            </Tooltip>
            <Tooltip title={`${m('edit')} ${c('bookmarks')}`}>
              <Icon
                type="edit"
                className="font16 mg1x mg2l pointer iblock control-icon icon-do-edit"
                onClick={props.onNewSsh}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="pd2x">
        {bookmarkSelect}
      </div>
    </div>
  )
})
