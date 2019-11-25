import React from 'react';
import AddTodo from '../containers/AddTodo';
//import TodoList from './TodoList';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

import 'todomvc-app-css/index.css';

const TodoApp = () => (
    <section className="todoapp">
        <AddTodo/>
        {/* <TodoList todos={todos}/> */}
        <VisibleTodoList />
        <Footer/>
    </section>
);

export default TodoApp;