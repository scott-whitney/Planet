import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Header, Form, Segment, Message, List, Pagination, Button, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { length, required } from 'redux-form-validators';
import axios from 'axios';
import requireAuth from './../../hoc/requireAuth';
import DatePicker from 'react-datepicker';
import moment from "moment";
// import { getUserTodos, updateCompleteUserTodoById, deleteTodoById } from '../../actions/allTodos';
import { AUTH_USER, POST_MESSAGE, GET_MESSAGE } from '../../actions/types';
import { getAllMessages } from './../../actions/message';


// import UserTodoListItems from './UserTodoListItems';

class MessageBoardContainer extends Component {

  state = {
    startDate: new Date()
  }; handleChange = date => { this.setState({ startDate: date }); };


  // NEXT STEPS:
  // X 1.  connect 'onSubmit' to the backend
  // X 2.  add the area for messages to show up in
  // 3.  connect the messages area to the backend to get all messages
  // ??? 4.  BACKEND BROKEN FIX 052520!!
  // 5.  create a function to get all of the messages to be rendered into the comments area

  // QUESTIONS TO ASK:
  // 1.  how do we get all the messages from the database and display them here?
  // 2.  POST http://localhost:3000/api/dashboard 400 (Bad Request) <--- what on earth is this

  // componentDidMount will go here to get all the messages from the database
  // componentDidMount(){
  //   getAllMessages();
  // }

  onSubmit = async (formValues, dispatch) => {
    console.log(formValues);
    try {
      // change the post route here
      // const { data } = await axios.post('/api/dashboard', formValues,  { headers: { 'authorization': localStorage.getItem('token')}});;
      await axios.post('/api/dashboard', formValues, { headers: { 'authorization': localStorage.getItem('token') } })
      dispatch({ type: POST_MESSAGE });

      // localStorage.setItem('token', data.token);
      // dispatch({ type: AUTH_USER, payload: data.token });
      // this.props.history.push('/alltodos');
    } catch (e) {
      throw e;
    }
  }
  renderInput = ({ input, meta }) => {
    return (
      <div>
        <Comment.Group>
          <Header as='h3' dividing>
            Message Board
         </Header>

          <Comment>
            {/* <Comment.Avatar src='/images/avatar/small/matt.jpg' /> */}
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

        </Comment.Group>

        <Form reply>
          <Form.TextArea
            {...input}
            fluid
            error={meta.touched && meta.error}
            autoComplete='off'
            placeholder="Add your comment here"
          />

          <Button
            content='Add Reply'
            labelPosition='left'
            icon='edit'
            primary
            onClick={this.onSubmit}
          />
        </Form>
      </div>

    )
  }


  render() {

    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>

            <h2 align='left'>Add Your Message Here</h2>

            <Field
              name='text'
              validate={
                [
                  required({ msg: 'Please add a message' })
                ]
              }
              component={this.renderInput}
            />

          </Segment>
        </Form>
      </div>
    )
  }
}

export default requireAuth(reduxForm({
  form: 'CreateEvent'
})(MessageBoardContainer));

//  ====================== OLD CODE FOR REFERENCE =======================
// // this is the message board.  use this component in an events page (will probably go in kerry's page).
// // import this to whatever component you plan on using this in.
// // POSSIBLE NEXT STEPS FOR THIS COMPONENT:  
// // X 1.  this may need to be a container.
// // 2.  for every user, make a comment thing (will probably have to use map).

// import React, { Component } from 'react'
// import { Button, Comment, Form, Header } from 'semantic-ui-react'
// // import { POST_MESSAGE } from './../../actions/types';
// import { postMessage } from './../../actions/message';
// import { reduxForm, Field, SubmissionError } from 'redux-form';
// import requireAuth from './../../hoc/requireAuth';

// // NEXT STEPS:
// // X 1.  turn this into a container
// // X 2.  move this into the containers folder
// // 3.  create an onSubmit function like in in the UserTodoList index.js
// //     -the onSubmit function should make an axios POST request to whatever the backend called it
// // 4.  see form below (where button is)
// // 5.  add a 'componentDidMount() function that will get all user events


// class MessageBoardContainer extends Component {

//   // function to hit the backend should go here
//   // going to '/api/user/eventsdashboard/'
//   // when a comment gets posted should be associated with the event id

//   // 1.  target the text from the text box and console.log it to make sure we're actually getting it
//   // 2.  the comment box is basically a form
//   // 3.  we probably need to use redux-form here

//   // onSubmit = async (formValues, dispatch) => {
//   //   // console.log(formValues);
//   //   // alert("You clicked the Add Reply button");

//   // }

//   onSubmit = async (formValues, dispatch) => {
//     console.log(formValues);
//     // try {
//     //   const { data } = await axios.post('/api/event/create', formValues,  { headers: { 'authorization': localStorage.getItem('token')}});;
//     //   localStorage.setItem('token', data.token);
//     //   // dispatch({ type: AUTH_USER, payload: data.token });
//     //   this.props.history.push('/alltodos');
//     // } catch (e) {
//     //   throw new SubmissionError({
//     //     password: 'Wrong pin',
//     //     _error: 'No event to join!'
//     //   });
//     // }
//   }

//   renderInput = ({ input, meta }) => {
//     return (
//       <Form reply>
//           <Form.TextArea 
//             {...input}
//             fluid
//             error={ meta.touched && meta.error }
//             autoComplete='off'
//             placeholder='Add your message here!'
//           />
//           <Button 
//             content='Add Reply' 
//             labelPosition='left' 
//             icon='edit' 
//             primary 
//             onClick={this.onSubmit} 
//           />
//       </Form>
//     );
//   }


//   render() {

//     const { handleSubmit, invalid, submitting, submitFailed } = this.props;
//     return (

//       <Comment.Group>
//         <Header as='h3' dividing>
//           Message Board
//         </Header>

//         <Comment>
//           {/* <Comment.Avatar src='/images/avatar/small/matt.jpg' /> */}
//           <Comment.Content>
//             <Comment.Author as='a'>Matt</Comment.Author>
//             <Comment.Metadata>
//               <div>Today at 5:42PM</div>
//             </Comment.Metadata>
//             <Comment.Text>How artistic!</Comment.Text>
//             <Comment.Actions>
//               <Comment.Action>Reply</Comment.Action>
//             </Comment.Actions>
//           </Comment.Content>
//         </Comment>

//       </Comment.Group>

//         <Field
//           name='message'
//           component={this.renderInput}
//         />

//         {/* 1.  Form will need an 'onSubmit' prop
//       2.  the onSubmitProp will run a handleSubmit function
//       3.  the handlesubmit function will take the onSubmit function as an argument */}

//         {/* <Form reply>
//           <Form.TextArea />
//           <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.onSubmit} />
//         </Form> */}

//       </Comment.Group>
//     );
//   }

// }

// // export default MessageBoardContainer;

// export default requireAuth(reduxForm({
//   form: 'CreateEvent'
// })(MessageBoardContainer));
