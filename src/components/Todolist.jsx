import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Todolist({ host, token }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  //登入後 取得目前的代辦資料

  useEffect(() => {
    getTodos();
  }, [token]);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${host}/todos`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("資料取得囉！");
      console.log(response);
      setTodos(response.data.data);
    } catch (e) {
      console.log("資料取得出錯囉！");
      console.log(e);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${host}/todos`,
        { content: newTodo }, // 使用 newTodo 的值來建立新代辦事項
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("取得Todot成功了");
      console.log(response);
      setNewTodo(""); // 清空新代辦事項輸入欄
      getTodos();
      // 這裡可以考慮將新建立的代辦事項加入到 todo 陣列中，以避免再次抓取資料
    } catch (e) {
      console.log("取得Todo失敗了");
      console.log(e);
    }
  };

  // 刪除資料

  const deleteTodo = async (id) => {
    await axios.delete(`${host}/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
  };

  //編輯資料

  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id];
    await axios.put(`${host}/todos/${id}`, todo, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: "",
    });
  };

  // 變更狀態
  const toggleStatus = async (id) => {
    await axios.patch(
      `${host}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodos();
  };

  return (
    <>
      <section>
        <h1>Todo List</h1>
        <input
          type="text"
          name="list"
          placeholder="New Todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todolist</button>
        <div className="list">
          {todos.map((todo) => {
            console.log(todos);
            return (
              <>
                <ul>
                  <li key={todo.id}>
                    {todo.content} {todo.status ? "完成" : "未完成"}
                  </li>
                  <input
                    type="text"
                    placeholder="更新值"
                    onChange={(e) => {
                      const newTodoEdit = {
                        ...todoEdit,
                      };
                      newTodoEdit[todo.id] = e.target.value;
                      setTodoEdit(newTodoEdit);
                    }}
                  />
                  <button onClick={() => updateTodo(todo.id)}>Update</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => toggleStatus(todo.id)}>
                    Toggle State
                  </button>
                </ul>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Todolist;
