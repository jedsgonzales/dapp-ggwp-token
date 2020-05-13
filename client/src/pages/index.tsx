import React, { useState, useEffect, ReactElement } from "react";
import { Link } from "gatsby";
import Web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import { provider, startWeb3, initContract, getAccount } from '../web3/client';

import Layout from "../components/layout";
import {
    Grid, AppBar, IconButton, Toolbar, Typography, Button, Paper
  } from "@material-ui/core";

import { Icon, InlineIcon } from '@iconify/react';
import EthereumIcon from '@iconify/icons-mdi/ethereum';
import HandOkayIcon from '@iconify/icons-mdi/hand-okay';

interface State {
    web3Provider: any;
    web3: Web3 | null;
    token: any;
    account: string;
    balance: number | -1;
    chestBox: Array<number> | [];
    selection: 0 | 1;
    gameState: "prep" | "ready" | "announce" | "transacting" | "countdown" | '';
    countdown: number;
    network: {
        id: number;
        type: string;
    };
}

const IndexPage = () => {
    const [ web3Provider, setWeb3Provider ] = useState<State['web3Provider']>(null);
    const [ web3, setWeb3 ] = useState<State['web3']>(null);
    const [ token, setToken ] = useState<State['token']>(null);
    const [ account, setAccount ] = useState<State['account']>('');
    const [ ggwps, setGgwps ] = useState<State['balance']>(0);
    const [ chest, setChest ] = useState<State['chestBox']>([]);
    const [ gameState, setGameState ] = useState<State['gameState']>('');
    const [ selection, setSelection ] = useState<State['selection']>(0);
    const [ countdown, setCountdown ] = useState<State['countdown']>(0);
    const [ network, setNetwork ] = useState<State['network']['id']>(0);
    const [ networkType, setNetworkType ] = useState<State['network']['type']>(0);

    useEffect(() => {
        if(web3Provider === null){
            setWeb3Provider( provider() );
        } else {
            //provider has probably been updated already
            if(web3 === null)
                startWeb3()
                .then(_web3 => {
                    setWeb3(_web3 as Web3);
                })
                .catch(e => {
                    console.log(`Web3 Error: ${e}`);
                });
        }
    }, [web3Provider, web3]);

    useEffect(() => {
        if(web3 !== null){
            //get network ID
            web3.eth.net.getId()
                .then(id => {
                    setNetwork(id);
                });
            
            web3.eth.net.getNetworkType()
                .then(name => {
                   setNetworkType(name);
                });

            //start contract
            if(token === null)
                initContract(web3)
                .then(_token => {
                    console.log('token initialized');
                    setToken(_token);
                }).catch((e) => {
                    console.log(`Contract Error: ${e}`);
                });
            
            //get user account
            if(account === '')
                getAccount(web3)
                .then(_account => {
                    console.log('account initialized');
                    setAccount(_account as string);
                })
                .catch(e => {
                    console.log(`Account Error: ${e}`);
                });
        }
    }, [web3]);

    useEffect(() => {
        if(account !== '' && token !== null){
            console.log("account ", account);
            console.log("token ", token);
            token.methods.balanceOf(account).call()
                .then((result:any) => {
                    //console.log(result);
                    setGgwps(result);
                    setGameState('prep');
                });
        }
    }, [token]);

    //game state manager
    useEffect(() => {
        if(ggwps >= 0){
            if(gameState === 'prep'){
                fetch('/api/ball')
                    .then(res => res.json())
                    .then(prizeBox => {
                        setChest(prizeBox);
                        setGameState('ready');
                    });            
            }
        }
    }, [gameState]);

    useEffect(() => {
        if(countdown > 0){
            setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else {
            setGameState('prep');
        }
    }, [countdown]);

    const transact = () => {
        token.methods.grant(chest[selection]).send({ from: account })
            .then((receipt:any) => {
                console.log("receipt ", receipt);
                return token.methods.balanceOf(account).call()
            })
            .then((result:any) => {
                setGgwps(result);
                beginCountdown();
            })
            .catch((error:any) => {
                console.log('transaction error ', error);
            });
    };

    const beginCountdown = () => {
        setGameState('countdown');
        setCountdown(4);
    };

    const boxSelected = (num:(1 | 0)) => {
        if(gameState === 'ready'){
            setSelection(num);
            setGameState('announce');
        }
    }
    
    const instructions = ():ReactElement => {
        switch(gameState) {
            case 'ready':
                return <>50/50 Chance! Select A Box And Win Tokens</>;
            case 'announce':
                if(chest[selection] !== 0){
                    setGameState('transacting');
                    transact();
                    return <>Wow! You have won ${chest[selection]} tokens!</>;
                } else {
                    beginCountdown();
                    return <>Better Luck Next Time!</>;
                }
            case 'transacting':
                return (
                    <>
                        Wow! You have won {chest[selection]} tokens!<br />
                        Please Wait....
                    </>
                );

            case 'countdown':
                if(chest[selection] !== 0){
                    return (
                        <>
                            Wow! You have won {chest[selection]} tokens!<br />
                            {countdown}
                        </>
                    );
                } else {
                    return <>
                        Better Luck Next Time!<br />
                        {countdown}
                    </>;
                }

            default:
                return <>Faucet Initializing</>;
        }
    };

    const classes = useStyles();

    return (
        <Layout>
            <Grid container spacing={10}>
                <Grid item xs={6} md={4} className={`${classes.centeredCell} ${classes.cellCube} ${classes.leftBox}`}>
                    <Paper elevation={3} onClick={e => {
                        boxSelected(0);
                    }}>
                        <h1>{['prep', 'ready'].includes(gameState) ? '???' : `${chest[0]} GGWPs`}</h1>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} className={`${classes.centeredCell} ${classes.centerBox}`}>
                    <h2>{instructions()}</h2>
                </Grid>
                <Grid item xs={6} md={4} className={`${classes.centeredCell} ${classes.cellCube} ${classes.rightBox}`}>
                    <Paper elevation={3} onClick={e => {
                        boxSelected(1);
                    }}>
                        <h1>{['prep', 'ready'].includes(gameState) ? '???' : `${chest[1]} GGWPs`}</h1>
                    </Paper>
                </Grid>
            </Grid>            
            <Grid container style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                <Grid item xs={12} className={classes.centeredCell}>
                    Wallet: {account}
                </Grid>
                <Grid item xs={12} className={classes.centeredCell}>
                    Balance: {ggwps} GGWP
                </Grid>
                <Grid item xs={12} className={classes.centeredCell}>
                    Netwotk: {network} - {networkType} 
                </Grid>
            </Grid>
        </Layout>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    centeredCell: {
        marginTop: "30px",
        textAlign: "center"
    },
    cellCube: {
        '& > *': {
            minHeight: "100px",
            '&:hover': {
                backgroundColor: "#dedede"
            }
        }
    },
    leftBox: {
        order: 2,
        [theme.breakpoints.up(`md`)]: {
            order: 1
        },
    },
    centerBox: {
        order: 1,
        [theme.breakpoints.up(`md`)]: {
            order: 2
        },
    },
    rightBox: {
        order: 3
    }
  }));

export default IndexPage
