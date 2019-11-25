import React from 'react';
import Todo from './Todo';

/**
 * 注意，在引用 Todo 组件时传入了一个特殊的 key 值，这是 React 在进行列表渲染时辨别元素用的。
 * 我们用肉眼观察一个列表时可以确定一个列表当中的内容以及顺序，哪里增加、减少或者改变了一个列表项都可以观察得非常清楚。
 * 而 React 没有像我们人类一样的眼睛，如果不为列表中的每一个元素提供 key 值来让 React 更好地识别列表项，
 * 每当界面当中的列表元素发生改变时，React 就必须遍历所有的列表项才能够准确找到改变发生的位置，那样就会白白损耗许多性能。
 * @param {*} param0 
 */
const TodoList = ({ todos, onTodoClick }) => (
    <ul className="todo-list">
        {todos.map((todo) => (
            <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} content={todo.content} />
        ))}
    </ul>
);

export default TodoList;