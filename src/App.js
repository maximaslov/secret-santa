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
  });

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
    alert('Немає зʼєднання з сервером')
        setState({
          ...state,
        })
        setPasswordInputValue('');
        setCompanyInputValue('');
  }

  const allHaveSantasError = () => {
    alert('В поточної компанії у всіх є таємний санта');
        setState({
          ...state,
          showStartPage:true,
          showMainPage: true,
          showSecretSantaPagen: false,
          showLoader: false,
        })
        setCompanyInputValue('')
        setPasswordInputValue('')
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

  const passwordError = () => {
    alert('Невірний пароль')
          setCompanyInputValue('')
          setPasswordInputValue('')
          setState({
            ...state,
            showLoader: false,
          })
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
        if(isValidPassword) {
          if(actualMembersControl(res)) {
            setLocalCurrentCompany(res);
          }
        } else {
          passwordError();
        }
        // setState({
        //   ...state,
        //   showSecretSantaPage: false,
        //   showLoader: false,
        //   showStartPage: true,
        // })
        console.log(typeof(res.data.password));
        console.log(typeof(passwordInputValue));
      }).catch(e => getCompanyError())
  }

  const getCurrentCompany = (companyId) => {
    setState({
      ...state,
      showStartPage: false,
      showFriendsList: false,
      showLoader: true,
    })
    setCompanyInputValue(companyId);
    getCurrentCompanyFromApi();
  }

  const setCurrentCompanyOnServer = (company) => {
    setState({
      ...state,
      showStartPage: false,
      showSecretSantaPage: true,
      showFriendsList: false,
    })
    SantaApi.post(company).then((res) => {
      console.log('На сервер улетело:')
      console.log(res.data)
      setCurrentCompany(res.data)
    }); 
    
  }

  const showNameNotFoundErr = () => {
    alert(`Імʼя "${nameInputValue}" відсутнє в поточній компанії`)
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
    
  const selectRandomMember = (actualFriendsList) => {
    const randomIndex = Math.floor(Math.random() * actualFriendsList.length);
    const selectedMember = actualFriendsList[randomIndex];
    const newFriendsList = [];
    for(let i = 0; i < currentCompany.friends.length; i++) {
        if(currentCompany.friends[i].id === selectedMember.id) {
          currentCompany.friends[i].status = false;
        }
        newFriendsList.push(currentCompany.friends[i])
        
        
    }
    SantaApi.put(currentCompany, newFriendsList).then(res => {
      console.log('На сервере обновили:')
      console.log(res.data)
      setCurrentCompany(res.data)
      setResult('Ви будете таємним сантой у' + ' ' + selectedMember.name)
    })

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
    const currentMember = currentCompany.friends.filter(e => e.name === nameInputValue)[0];
    if(!isMember(currentMember)) {
      showNameNotFoundErr();
    }
    else {
      const actualFriendsList = currentCompany.friends.filter(e => e.name !== currentMember.name && e.status);
      console.log('Список без текущего имени всех у кого статус фолс')
      console.log(actualFriendsList)
      if(actualFriendsList === []) {
        SantaApi.updateCompanyStatus(currentCompany)
        .then(() => alert('Немає участників без подарунків'))
      }
      selectRandomMember(actualFriendsList);
      showResult();
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
         <Snowfall />
        <div className={styles.appWrapperContent}>
          {state.showMainPage && <MainPage hideMainPage={hideMainPage} />}

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

          {state.showResultPage && <ResultPage result={result} />}
          {state.showLoader && <Loader/>}
        </div>
      </div>
    );
  }
  
  export default App;