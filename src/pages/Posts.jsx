import React, { useEffect, useRef, useState } from 'react'
import PostFilter from '../components/PostFilter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'
import MyModal from '../components/UI/MyModal/MyModal'
import { usePosts } from '../hooks/usePosts'
import '../styles/App.css'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'
import { getPageCount, getPagesArray } from '../utils/pages'
import Pagination from '../components/UI/pagination/Pagination'
import { useObserver } from '../hooks/useObserver'
import MySelect from '../components/UI/select/MySelect'

function Posts() {
  //=>Состояния
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, isPostsLoaded, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      console.log(response.headers)
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    }
    //<=Состояния
  )

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className='App'>
      <MyButton style={{ marginTop: '20px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{ margin: '15px 0' }}></hr>
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: -1, name: 'Показать всё' },
        ]}></MySelect>
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Список 1'
      />
      <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}>
          <Loader />
        </div>
      )}
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}></Pagination>
    </div>
  )
}

export default Posts
