import Web3 from 'web3';
import axios, { AxiosResponse, AxiosError } from 'axios';

declare global {
    interface Window {
        ethereum:any;
        web3: any;
    }
}

let account:string;

export const provider = () => {
    if(window.ethereum !== 'undefined'){
        return window.ethereum;
    }

    //old version of metamask
    if(window.web3 !== 'undefined'){
        return window.web3.currentProvider;
    }

    //fallback
    return new Web3.providers.HttpProvider('http://localhost:9545');
}

export const startWeb3 = async () => {
    return new Promise(async (resolve:Function, reject:Function) => {
        if(window.ethereum !== 'undefined'){
            window.ethereum.enable()
                .then(() => {
                    resolve(new Web3( provider() ));
                })
                .catch((e:any) => {
                    reject(e);
                });
            
            return;
        }

        //old version of metamask
        if(window.web3 !== 'undefined'){
            return resolve(new Web3( provider() ));
        }

        //fallback
        resolve(new Web3( provider() ));
    });
}

export const initContract = async (web3:Web3) => {
    return new Promise(async (resolve:Function, reject:Function) => {
        await axios.get(`contracts/GgwpToken.json`)
            .then(async (resp: AxiosResponse) => {
                const GgwpTokenContract = resp.data;
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = GgwpTokenContract.networks[networkId];

                resolve(new web3.eth.Contract(
                    GgwpTokenContract.abi,
                    deployedNetwork && deployedNetwork.address
                ));
                
                /* GgwpToken.deployed().then( (tokenInstance:any) => {
                    
                }); */
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });
}


export const getAccount = (web3:Web3) => {
    return new Promise( (resolve:Function, reject:Function) => {
        web3.eth.getCoinbase((error, account) => {
            if(error === null){
                resolve( account );
            } else {
                reject( error );
            }
        })
        .catch(error => {
            reject( error );
        });
    });
}
