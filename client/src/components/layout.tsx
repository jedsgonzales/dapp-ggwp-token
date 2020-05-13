/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import {
  Grid, AppBar, IconButton, Toolbar, Typography, Button, Paper, Container
} from "@material-ui/core";

import Header from "./header"
import "./layout.css"

interface Props {
  children: ReactNode;
}

const Layout = ({ children }:Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <main>{children}</main>
      </Container>
      <Container>
        <Grid style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Grid>
      </Container>
    </>
  )
}

export default Layout
