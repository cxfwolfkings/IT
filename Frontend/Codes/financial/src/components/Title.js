// 函数定义组件
function Title(props) {
    return <h1>Hello, {props.name}</h1>
}
// 箭头函数语法
const Title = props => <h1>Hello, {props.name}</h1>
// 解构赋值语法
const Title = ({ name }) => <h1>Hello, {name}</h1>