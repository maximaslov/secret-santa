import React from "react";
import Snowfall from 'react-snowfall';
import styles from "./App.module.css"
import { useState } from "react";
import MainPage from './components/MainPage/MainPage';
import StartPage from './components/StartPage/StartPage';
import SecretSantaPage from './components/SecretSantaPage/SecretSantaPage';
import NewCompany from './components/NewCompany/NewCompany';
import ResultPage from './components/ResultPage/ResultPage';
import {SantaApi} from './api';
import Loader from "./components/Loader/Loader";
import background from "./../src/img/background.jpg";
import backgroundMobile from "./../src/img/background-mobile.png";
import Error from './components/Error/Error'

//mockapi.io 
//e-mail: secretsanta2023app@gmail.com
//password: SecretSanta2023App

function App() {
  const [companyInputValue, setCompanyInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [currentCompany, setCurrentCompany] = useState(null);
  const [nameInputValue, setNameInputValue] = useState('');
  const [membersInputValue, setMembersInputValue] = useState('');
  const [newCompanyPassword, setNewCompanyPassword] = useState('');
  const [totalMembers, setTotalMembers] = useState(null);
  const [result, setResult] = useState(null);
  const [state, setState] = useState({
    showMainPage: true,
    showStartPage: false,
    showSecretSantaPage: false,
    showNewCompanyPage: false,
    showResultPage: false,
    showNewCompanyMembersInput: false,
    showNewCompanyNameInputs: false,
    showFriendsList: false,
    showLoader: false,
    disabled: true,
    disabledNewCompanyBtn: true,
    showConnectionError: false,
    showInctruction: false,
    showCurrentCompany: false,
    showMemberNumberInputError: false,
    showTotalMembersInputError: false,
    showPasswordInputError: false,
    showAllhaveSantaError: false,
    showIncorrectPasswordError: false,
    showNameMotFoundError: false,
    showLanguageError: false,
    showEmptyFieldError: false,
    showCompanyNumberError: false,
    showCompanyNotFoundError: false,
  });


  const serverConnectionError = () => {
      setState({
        ...state, 
        showLoader: false,
        showConnectionError: true,
        showSecretSantaPage: false,
        disabled: true,
      })
      setTimeout(() => {
        setState({
          ...state, showConnectionError: false,
          disabled: true,
        })
      }, 3000)
  }

  const hideMainPage = () => {
    setState({
      ...state,
      showMainPage: false,
      showStartPage: true,
    })
  }

  const updateCompanyInputText = (text) => {
    setCompanyInputValue(text)
  }

  const updateCompanyInputPassword = (password) => {
    setPasswordInputValue(password);
  }

  const getCompanyError = () => {
    serverConnectionError();
    setPasswordInputValue('');
    setCompanyInputValue('');
  }

  const allHaveSantasError = () => {
        setState({
          ...state,
          showStartPage:true,
          showSecretSantaPagen: false,
          showLoader: false,
          showAllhaveSantaError: true,
        })
        setCompanyInputValue('')
        setPasswordInputValue('')
        setTimeout(() => {
          setState({
            ...state, showAllhaveSantaError: false,
          })
        },3000)
  }

  const actualMembersControl = (res) => {
    const friends = res.data.friends;
      const falseStatuses = [];
      for(let i = 0; i < friends.length; i++){
        if(friends[i].status === false) {
          falseStatuses.push(i)
        }
      }
      if (falseStatuses.length === friends.length) {
        allHaveSantasError();
        return false;
      } else {
        return true;
      }
  }

  const isValidPassword = (res) => {
    return res.data.password === passwordInputValue;
  }
  const showCompanyNotFoundError = () => {
    setState({
      ...state, showCompanyNotFoundError: true,
    })
    setPasswordInputValue('');

    setTimeout(() => {
      setState({
        ...state, showCompanyNotFoundError: false,
      })
    }, 3000)
  }
  
  const passwordError = () => {
          setCompanyInputValue('')
          setPasswordInputValue('')
          setState({
            ...state,
            showLoader: false,
            showIncorrectPasswordError: true,
          })
          setTimeout(() => {
            setState({
              ...state, showIncorrectPasswordError: false,
            })
          }, 3000)
  }

  const setLocalCurrentCompany = (res) => {
    setCurrentCompany(res.data)
    setState({
      ...state,
      showSecretSantaPage: true,
      showLoader: false,
      showStartPage: false,
    })
  }

  const getCurrentCompanyFromApi = () => {
    SantaApi.get(companyInputValue)
      .then((res) => {
        if(isValidPassword(res)) {
          if(actualMembersControl(res)) {
            setLocalCurrentCompany(res);
          }
        } else {
          passwordError();
        }
        console.log(typeof(res.data.password));
        console.log(typeof(passwordInputValue));
      }).catch(e => {
        if(e.response?.status === 500){
          showCompanyNotFoundError()
        }else {getCompanyError();}
      })
  }

  const getCurrentCompany = (companyId) => {
    setState({
      ...state,
      showStartPage: false,
      showFriendsList: false,
      showLoader: true,
      showConnectionError: false,
    })
    setCompanyInputValue(companyId);
    getCurrentCompanyFromApi();
  }

  const setCurrentCompanyOnServer = (company) => {
    setState({
      ...state,
      showConnectionError: false,
      showStartPage: false,
      showFriendsList: false,
      showLoader: true,
    })
    SantaApi.post(company).then((res) => {
      console.log('На сервер улетело:');
      console.log(res.data);
      setCurrentCompany(res.data)})
      .then(() => {
        setState({
          ...state,
          showLoader: false,
          showFriendsList: false,
          showSecretSantaPage: true,
          showCurrentCompany: true,
        })
    }).catch((e) => serverConnectionError())
    
  }

  const showNameNotFoundErr = () => {
    setState({
      ...state, showNameMotFoundError: true,
    })
    setNameInputValue('');
  }

  const createNewCompany = () => {
    setState({
      ...state,
      showStartPage: false,
      showNewCompanyPage: true,
      showNewCompanyMembersInput: true,
    })
  }
    
  const selectRandomMember = (actualFriendsList, currentMember) => {
    const randomIndex = Math.floor(Math.random() * actualFriendsList.length);
    const selectedMember = actualFriendsList[randomIndex];
    const newFriendsList = [];
    for(let i = 0; i < currentCompany.friends.length; i++) {
        if(currentCompany.friends[i].id === selectedMember.id) {
          currentCompany.friends[i].status = false;
        }
        newFriendsList.push(currentCompany.friends[i]);
    }
    setState({
      ...state,
      showLoader: true,
      showSecretSantaPage: false,
    })
    SantaApi.put(currentCompany, newFriendsList).then(res => {
      console.log('На сервере обновили:')
      console.log(res.data)
      setCurrentCompany(res.data)})
        .then(() => {
          setState({
            ...state,
            showLoader: false,
            showSecretSantaPage: false,
          })
          setResult(selectedMember.name)
      }).then(() => showResult())
        .catch(e => serverConnectionError())

    console.log("Айдишка юзера:" + actualFriendsList[randomIndex].id)
  }

  const showResult = () => {
    setState({
      ...state,
      showSecretSantaPage: false,
      showResultPage: true,
    })
  }
  
  const isMember = (member) => {
    return currentCompany.friends.includes(member)
  }

  const showRandomMember = () => {
    if(currentCompany !== null) {
      const currentMember = currentCompany.friends.filter(e => e.name === nameInputValue)[0];
    if(!isMember(currentMember)) {
      showNameNotFoundErr();
    }
    else {
      const actualFriendsList = currentCompany.friends.filter(e => e.name !== currentMember.name && e.status);
      console.log('Список без текущего имени всех у кого статус фолс')
      console.log(actualFriendsList)
      // if(actualFriendsList === []) {
      //   SantaApi.updateCompanyStatus(currentCompany)
      //   .then(() => alert('Немає участників без подарунків'))
      // }
      selectRandomMember(actualFriendsList, currentMember);
    }
    } else {
      serverConnectionError();
    }
    
  }

  const updateNameInputText = (text) => {
    setNameInputValue(text)
  }

  const updateNewCompanyTotalMembers = (number) => {
    setMembersInputValue(number);
  }

  const showMembersNamesInputs = () => {
    setTotalMembers(membersInputValue);
    setState({
      ...state,
      showNewCompanyMembersInput: false,
      showNewCompanyNameInputs: true,
      showFriendsList: true,
    })
  }

    return (
      <div className={styles.appWrapper}>
        <div className={styles.background}>
         <img src={background} alt="background"/>
        </div>
        <div className={styles.backgroundMobile}>
         <img src={backgroundMobile} alt="background"/>
        </div>
         <Snowfall />
        <div className={styles.appWrapperContent}>
           <Error 
            nameInputValue={nameInputValue}
            state={state}/>

          {state.showMainPage && <MainPage 
            state={state}
            setState={setState}
            isActiveInctructionBtn={state.isActiveInctructionBtn}
            hideMainPage={hideMainPage} />}

          {state.showStartPage && (
            <StartPage
              state={state}
              setState={setState}
              companyInputValue={companyInputValue}
              passwordInputValue={passwordInputValue}
              updateCompanyInputPassword={updateCompanyInputPassword}
              updateCompanyInputText={updateCompanyInputText}
              getCurrentCompany={getCurrentCompany}
              createNewCompany={createNewCompany}
            />
          )}

          {state.showSecretSantaPage && (
            <SecretSantaPage
              state={state}
              setState={setState}
              showRandomMember={showRandomMember}
              nameInputValue={nameInputValue}
              updateNameInputText={updateNameInputText}
            />
          )}

          {state.showNewCompanyPage && (
            <NewCompany
              membersInputValue={membersInputValue}
              updateNewCompanyTotalMembers={updateNewCompanyTotalMembers}
              state={state}
              setState={setState}
              createNewCompany={createNewCompany}
              showMembersNamesInputs={showMembersNamesInputs}
              totalMembers={totalMembers}
              getCurrentCompany={getCurrentCompany}
              setCurrentCompanyOnServer={setCurrentCompanyOnServer}
              setNewCompanyPassword={setNewCompanyPassword}
              newCompanyPassword={newCompanyPassword}
            />
          )}

          {state.showResultPage && 
            <ResultPage 
            state={state}
            result={result}
            newCompanyPassword={newCompanyPassword}
            currentCompany={currentCompany} />}

          {state.showLoader && 
            <Loader/>}
        </div>
      </div>
    );
  }
  
  export default App;