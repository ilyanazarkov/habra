import React from 'react'
import { Typography } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
}))

export const Specialisation = ({
  user,
  classes: additionalClasses,
}: ComponentWithUserParams) => {
  const classes = useStyles()
  return user.description_html ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Специализация</Typography>
      <Typography>{user.specializm}</Typography>
    </div>
  ) : null
}
