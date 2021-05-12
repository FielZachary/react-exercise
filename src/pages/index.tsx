import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fetchList} from "../app/redux/item/item.slice";
import {fetchProductList} from "../app/redux/product/product.slice";
import {fetchUserList} from "../app/redux/user/user.slice";
import {fetchToDoList} from "../app/redux/todo/todo.slice";
import {addToDo} from "../app/redux/todo/todo.slice";
import {deleteToDo} from "../app/redux/todo/todo.slice";
import {editToDo} from "../app/redux/todo/todo.slice";
import {useAppDispatch, useAppSelector} from "../app/redux/hooks";
import {ToDo} from "../domain/entities/ToDo";

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
      dispatch(addToDo(new ToDo(valueAdd)))
  }
  const handleChange = (e) => {
      valueAdd = e.target.value
      console.log(valueAdd)
  }
  const handleDelete = (todo) => {
    dispatch(deleteToDo(todo))
  }
  const handleEditChange = (e) => {
      valueEdit = e.target.value
      console.log(valueEdit)
  }
  const handleEditSubmit = (e, todo) => {
      e.preventDefault()
      const newToDo = {...todo, title: valueEdit}
      dispatch(editToDo(newToDo))
    }
  const handleEditForm = (todo) => {
      console.log('ht')
      return (
          <div>
              <form onSubmit={(e) => handleEditSubmit(e, todo)}>
                  <p>Edit a to do</p>
                  <input type={'text'} onChange={handleEditChange}/>
              </form>
          </div>
      )
  }
  let valueEdit = ""
  let valueAdd = ""
  return (
      <div>
        <button onClick={handleClick} disabled={loading}>
          Refresh
        </button>
        <ul>
          {toDo.map((todo) => (
              <li key={todo.id}>
                  {todo.title}
                  <button onClick={() => handleDelete(todo)} />
                  {handleEditForm(todo)}
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
