import styled from "styled-components"
import './App.css';
import { injected } from "./components/wallets/connectors";
import { useWeb3React } from "@web3-react/core"
import { useState } from "react";
const Button = styled.button`
  color:white;
  font-size: 1em;
  margin:20px;`
let flag: boolean = false;

function App() {
  const [liquidity , setLiquidity] = useState<any>(true);
  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()


  async function connect() {
    flag = true;
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }

  }

  async function disconnect() {
    flag = false;
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }


  return (
    <>
      {
        <div className="connectbtn">{!flag ? <Button onClick={connect}>Connect</Button> : <Button onClick={disconnect}> DisConnect</Button>}</div>
      }

      <br />
      {
        flag ? <span>Connected{account} , ChainID : {chainId} </span> : <span></span>
      }
      <div className="parent-wrapper">
        <div className="child-wrapper">
         <div className="data">
         <div className="combined-button"><button className="add" onClick={()=>{setLiquidity(true)}}>ADD</button> <button className="remove" onClick={()=>{setLiquidity(false)}}>REMOVE</button><button className="remove">SWAP</button></div>
         { liquidity && <><div  className="combined-input">
            <div style={{margin:'5px'}}>
              <span>BUSD</span> <span style={{float:'right'}}>balance</span>
            </div>
            <input type="number" placeholder="0.00"/>
          </div>
          <div  className="combined-input">
            <div style={{margin:'5px'}}>
              <span>BUSD</span> <span style={{float:'right'}}>balance</span>
            </div>
            <input type="number" placeholder="0.00"/>
          </div>
          <div className="combine-data">
            <div><span style={{color:'grey'}}><b>Slippage tolerance: 0.5%</b></span></div>
            <div><span style={{color:'grey'}}><b>Transaction deadline: 15 min</b></span></div>
          </div>
          <div className="combine-data">
            <div><span style={{color:'grey'}}><b>1BUSD = 2.495727 BUST</b></span></div>
            <div><span style={{color:'grey'}}><b>1BUST = 0.400685 BUSD</b></span></div>
          </div>
          <div className="combine-data">
            <div>
              <button>Add Liquidity</button>
            </div>
          </div> </>}

          { !liquidity && <>
            <div className="combined-button"><button>25%</button> <button>50%</button><button>75%</button><button>100%</button></div>
          <div  className="combined-input">
            <div className="tkn"><span>Pooled Token</span></div>
            <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUST-LP</span>
            </div>
            <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUSD</span>
            </div>
            <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUST</span>
            </div>
           
          </div>
          <div  className="combined-input">
            <div className="tkn"><span>Selected Token</span></div>
          <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUST-LP</span>
            </div>
            <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUSD</span>
            </div>
            <div style={{margin:'5px'}}>
              <span>------</span> <span style={{float:'right'}}>BUST</span>
            </div>
          </div>
          <div className="combine-data">
            <div>
              <button>Remove Liquidity</button>
            </div>
          </div> </>}
         </div>
        </div>
      </div>
    </>
  );
}

export default App;
