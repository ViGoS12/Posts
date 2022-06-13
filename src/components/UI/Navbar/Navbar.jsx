import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context'
import MyButton from '../button/MyButton'
import classes from './Navbar.module.css'

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className={classes.navbar}>
      <MyButton onClick={logout}>Exit</MyButton>
      <div className={classes.navbar__links}>
        <Link to='/about'>О сайте</Link>
        <Link to='/posts'>Посты</Link>
        <Link to='/randomLink'>Ошибочный линк</Link>
      </div>
    </div>
  )
}
