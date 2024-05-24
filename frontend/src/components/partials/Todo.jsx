import React from 'react';
import moment from 'moment/moment'
import PropTypes from 'prop-types'
import { deleteTodoApi, markTodoApi } from '../../services/api';
import { toast } from 'react-toastify';

const Todo = ({ todo = {
    date: new Date(),
    isCompleted: false,
    desc: ''
}, setRefreshList }) => {

    const handleDelete = async () => {
        const result = await deleteTodoApi({
            todo_id: todo._id
        })
        if (result.data.status === 200) {
            setRefreshList(new Date())
            toast('Deleted')
        } else {
            toast('Failed to delete, please try again')
        }
    }

    const handleMarkTodo = async () => {
        const result = await markTodoApi({
            todo_id: todo._id
        })
        if (result.data.status === 200) {
            setRefreshList(new Date())
            toast(result.data.message)
        } else {
            toast('Failed to mark, please try again')
        }
    }
    return (

        <div className="col-sm-3 mx-3 my-2 alert bg-light">
            <div className="card-header">
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </div>
            <div className="card-body">
                <h4 className="card-title" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }} >
                    {todo.desc}
                </h4>
                <p className="card-text">
                    {moment(todo.date).fromNow()}
                </p>
            </div>
            <div className="actionButtons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="deleteButton">
                    <button style={{ background: 'red' }} onClick={handleDelete}>Delete</button>
                </div>
                <div className="markTodo">
                    <button onClick={handleMarkTodo} style={{ background: 'lightgreen' }}> {todo.isCompleted ? 'Mark Uncomplete' : 'Mark Complete'} </button>
                </div>
            </div>
        </div>
    );
}

Todo.propTypes = {
    todo: PropTypes.shape({
        date: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        desc: PropTypes.string.isRequired,
        // Assuming date is a string, adjust if it's another type
        // define other properties of todo if necessary
    }).isRequired
};

export default Todo
// Todo.defaultProps = {
//     todo: {
//         date: 'default date',
//         isCompleted: false,
//         desc: 'default todo'
//         // Provide a default date or other default values
//         // other default properties
//     }
// };
// function Hello({ name }) {
//     return <div>Hello {name}</div>;
//     // 'name' is missing in props validation
// }
// class Hello extends React.Component {
//     render() {
//         return <div>Hello {this.props.firstname} {this.props.lastname}</div>;
//         // 'lastname' type is missing in props validation
//     }
// }
// Hello.propTypes = {
//     firstname: PropTypes.string.isRequired
// }