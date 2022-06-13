import React from 'react'
import classes from './Pagination.module.css'
import classNames from 'classnames'
import { getPagesArray } from '../../../utils/pages'

export default function Pagination({ totalPages, page, changePage }) {
  let pagesArray = getPagesArray(totalPages)

  return (
    <div className={classes.page__wrapper}>
      {pagesArray.map((p) => (
        // <span className={page === p ? 'page page__current' : 'page'}>
        <span
          key={p}
          onClick={() => changePage(p)}
          className={classNames(classes.page, {
            [classes.page__current]: page === p,
          })}>
          {p}
        </span>
      ))}
    </div>
  )
}
