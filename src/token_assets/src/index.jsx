import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';

const init = async () => { 
  const authClient=await AuthClient.create();

  if(await authClient.isAuthenticated()){
    handleAuthenticated(authClient);
  }else{
    await authClient.login({
      identityProvider: "https://identity.ico.app/#authorize",
      onSuccess:()=>{
        handleAuthenticated(authClient);
      }
    })
  }

}

async function handleAuthenticated(authClient){
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


