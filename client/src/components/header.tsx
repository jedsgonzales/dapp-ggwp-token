import { Link } from "gatsby"
import React from "react"

import {
  Grid, AppBar, IconButton, Toolbar, Typography, Button, Paper, Container
} from "@material-ui/core";
import { Icon, InlineIcon } from '@iconify/react';
import EthereumIcon from '@iconify/icons-mdi/ethereum';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  siteTitle:string;
}

const Header = ({ siteTitle }:Props) => {
  const classes = useStyles();

  return(
    <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Icon icon={EthereumIcon} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        {siteTitle}
        </Typography>
        </Toolbar>
    </AppBar>
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
  }
}));

export default Header
