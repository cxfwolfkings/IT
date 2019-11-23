import React from 'react';

/**
 * props.children 是组件 props 当中一个特殊的属性。
 * 我们传递 props 的时候不是通过 JSX 标签上的属性名传递的。
 * 通过 props.children 获取到的内容，是组件 JSX 标签当中嵌套的内容
 * @param {*} param0 
 */
const Link = ({ children }) => (
    <li>
        <a href="/#">{children}</a>
    </li>
);

export default Link;