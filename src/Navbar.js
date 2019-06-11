import React from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/styles';


const StyledNav = styled(Toolbar)({
  margin: '0 auto !important',
  height: '5vh'
});

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <StyledNav>
                <Typography text-align = "center"  color="inherit"> 
                     Permission Manager
                </Typography>
            </StyledNav>
        </AppBar>
        </div>
    )
}

export default NavBar;