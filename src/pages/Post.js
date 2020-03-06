import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { get } from 'request-promise-native'
import Link from 'react-router-dom/Link'
import PostViewSkeleton from '../components/skeletons/PostView'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: { width: '100%', height: '100%', maxWidth: '100vw' },
  hubs: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    wordBreak: 'break-word',
    width: '100%',
    background: theme.palette.background.default,
  },
  hubLink: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textDecoration: 'none',
  },
  container: {
    overflow: 'auto',
    width: '100%',
    height: '100%',
  },
  authorBar: { marginTop: theme.spacing(2.5) },
  avatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
  author: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    fontWeight: 500,
    fontSize: 14,
  },
  ts: {
    color: theme.palette.text.hint,
    fontWeight: 500,
    fontSize: 14,
  },
  title: {
    fontWeight: '800',
    fontFamily: 'Google Sans',
    fontSize: 28,
    lineHeight: '34px',
    wordBreak: 'break-word',
    hyphens: 'auto',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  text: {
    '& img': {
      maxWidth: '100%',
      width: '100%',
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& a:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
    '& pre': {
      width: '100%',
      maxWidth: '100%',
      maxHeight: 320,
      overflow: 'auto',
      tabSize: 4,
      border: '1px solid ' + theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.background.default,
      // margin: 0
    },
    '& code': {
      width: '100%',
      height: '100%',
      // margin: theme.spacing(3)
    },
  },
}))

const getPost = id =>
  get(`https://m.habr.com/kek/v1/articles/${id}/?fl=ru&hl=ru`, { json: true })

const Post = props => {
  const [post, setPost] = useState()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(() => {
    const get = async () => setPost((await getPost(id)).data)
    get()
  }, [])

  if (post) document.title = post.article.title

  return post ? (
    <div className={classes.root + ' ' + classes.container}>
      <Container className={classes.hubs}>
        {post.article.hubs.map((hub, i) => (
          <Typography key={i} variant="caption">
            <Link className={classes.hubLink} to={'/hub/' + hub.alias}>
              {hub.title}
            </Link>
            {post.article.hubs.length - 1 !== i && ', '}
          </Typography>
        ))}
      </Container>
      <Divider />
      <Container>
        <Grid
          className={classes.authorBar}
          container
          direction="row"
          alignItems="center"
        >
          <Avatar src={post.article.author.avatar} className={classes.avatar} />
          <Typography className={classes.author}>
            {post.article.author.login}
          </Typography>
          <Typography className={classes.ts}>
            {moment(post.article.time_published).fromNow()}
          </Typography>
        </Grid>
        <Typography className={classes.title}>{post.article.title}</Typography>
        <Typography
          className={classes.text}
          dangerouslySetInnerHTML={{ __html: post.article.text_html }}
        ></Typography>
      </Container>
    </div>
  ) : (
    <PostViewSkeleton />
  )
}

export default Post
