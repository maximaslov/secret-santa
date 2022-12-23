import React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import styles from "./FriendsList.module.css";
 
 export const FriendList = (props) => {
  
  const membersAmount = new Array(props.totalMembers);
  const friendsArray = []
  for(let i = 0; i < membersAmount.length; i++ ){
    friendsArray.push('');
  }

  const showEmptyFieldError = (error) => {
    props.setState({
        ...props.state, showEmptyFieldError: true,
    })
    setTimeout( () => {
        props.setState({
            ...props.state, showEmptyFieldError: false,
        })}, 3000)
  }

  const showTotalMembersInputError = () => {
    props.setState({
        ...props.state, showTotalMembersInputError: true,
    })
    setTimeout( () => {
        props.setState({
            ...props.state, showTotalMembersInputError: false,
        })}, 3000)
  }

  const createNewCompany = (values) => {
    if(values.friends.includes('')) {
      showEmptyFieldError();
    } else if(values.friends.length <3) {
      showTotalMembersInputError();
    } else {
      const newCompany = {id: null, password: props.newCompanyPassword, friends: []}
    const friendsList = values.friends.map((e,i) => {
      return {id: i+1, name: e, status: true}
    });

    newCompany.friends = [...friendsList];
    props.setState({
      ...props.state,
      showCurrentCompany: true,
  })
    props.setCurrentCompanyOnServer(newCompany);
    }    
  }

  return (
    <div className={styles.friendsListContainer}>
      <h3 className={styles.text}>Список учасників</h3>
      <Formik
        initialValues={{ friends: [...friendsArray] }}
        onSubmit={values => {createNewCompany(values)}}>
          {(
          { values }) => (
          <Form className={styles.form}>
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div>
                  {values.friends && values.friends.length > 0 ? 
                  (
                    values.friends.map((friend, index) => {
                      return (
                        <div 
                          className={styles.field}
                          key={index}>
                          <Field 
                            placeholder="Введіть імʼя"
                            name={`friends.${index}`} />
                          <button
                            className={styles.minus}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            className={styles.plus}
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')}
                          >
                            +
                          </button>
                        </div> )
                    })
                  ) : (
                    
                      <div 
                        className={styles.addMembersbutton}>
                          <button type="button" onClick={() => arrayHelpers.push('')}>
                            Додати учасників
                          </button>
                      </div>  
                    
                    
                  )}
                    <div className={styles.button}>
                      <button 
                       type="submit">Далі</button>
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