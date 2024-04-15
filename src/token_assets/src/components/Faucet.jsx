import React, { useState } from "react";
import {token} from "../../../declarations/token"
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
import { canisterId } from "../../../declarations/token/index";

function Faucet() {
  const [isDisabled,setDisable]=useState(false);
  const [buttonText,setText]=useState("Take");
  async function handleClick(event) {
    setDisable(true);
    const authClient=await AuthClient.create();
    const identity=await authClient.getIdentity();
    const authenticatedCanister=createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });
    const result = await authenticatedCanister.payOut();
    setText(result);
    // setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAamn tokens here! Claim 10,000 DAMN coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
