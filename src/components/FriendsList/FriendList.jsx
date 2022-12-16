import React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
 
 export const FriendList = (props) => {
  const membersAmount = new Array(props.totalMembers);
  const friendsArray = []
  for(let i = 0; i < membersAmount.length; i++ ){
    friendsArray.push('');
  }

  const createNewCompany = (values) => {
    const newCompany = {id: null, password: props.newCompanyPassword, friends: []}
    const friendsList = values.friends.map((e,i) => {
      return {id: i+1, name: e, status: true}
    })
    
    newCompany.friends = [...friendsList];
    props.setCurrentCompanyOnServer(newCompany);
  }

  return (
    <div>
      <h1>Friend List</h1>
      <Formik
        initialValues={{ friends: [...friendsArray] }}
        onSubmit={values => {createNewCompany(values)}}>
          {(
          { values }) => (
          <Form>
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div>
                  {values.friends && values.friends.length > 0 ? (
                    values.friends.map((friend, index) => (
                      <div key={index}>
                        <Field name={`friends.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push('')}>
                      {/* show this when user has removed all friends from the list */}
                      Add a friend
                    </button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
        </Formik>
    </div>
  );
 }

 export default FriendList;