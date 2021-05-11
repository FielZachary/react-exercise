import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fetchList} from "../app/redux/item/item.slice";
import {fetchProductList} from "../app/redux/product/product.slice";
import {fetchUserList} from "../app/redux/user/user.slice";
import {fetchToDoList} from "../app/redux/todo/todo.slice";
import {addToDo} from "../app/redux/todo/todo.slice";
import {useAppDispatch, useAppSelector} from "../app/redux/hooks";

export default function Home() {
  const products = useAppSelector((state) => state.products.products)
  const users = useAppSelector((state) => state.users.users)
  const items = useAppSelector((state) => state.items.items)
  const toDo = useAppSelector((state) => state.todo.toDo)
  const loading = useAppSelector((state) => state.items.loading)
  const dispatch = useAppDispatch()
  const handleClick = () => {
      dispatch(fetchToDoList());
  }
  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(addToDo(value))
  }
  const handleChange = (e) => {
      value = e.target.value
      console.log(value)
  }
  let value = ""
  return (
      <div>
        <button onClick={handleClick} disabled={loading}>
          Refresh
        </button>
        <ul>
          {toDo.map((todo) => (
              <li>
                  {todo.name}
              </li>
          ))}
        </ul>
          <form onSubmit={handleSubmit}>
              <p>Add a to do:</p>
              <input
                  type="text"
                  onChange={handleChange}
              />
          </form>
      </div>
  )
}
