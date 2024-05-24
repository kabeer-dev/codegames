import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Colors } from '../constants/Color';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { Grid, Typography } from '@mui/material';

export default function GameOrderDropDown({ title, selectOrder, orderPattern }) {
    const createHandleMenuClick = (menuItem, index) => {
        return () => {
            selectOrder(menuItem);
            setIcon(index);
        };
    };
    const [icon, setIcon] = React.useState(1);
    return (
        <Dropdown>
            <MenuButton>
                {title}
                <ExpandMoreIcon
                    style={{
                        marginLeft: 12,
                        color: `${Colors.whiteColor}B3`,
                        fontSize: 22
                    }}
                />
            </MenuButton>
            <Menu slots={{ listbox: Listbox }}>
                {orderPattern.map((item, index) => {
                    return (
                        <MenuItem key={index} onClick={createHandleMenuClick(item, index)}>
                            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                                <Grid item xs={8}>
                                    <Typography
                                        sx={{
                                            fontSize: 14
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    {index === icon ? <CheckIcon sx={{ color: '#00EE34' }} /> : ''}
                                </Grid>
                            </Grid>
                        </MenuItem>
                    );
                })}
            </Menu>
        </Dropdown>
    );
}

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  z-index:1;
  user-select: none;
  &:last-of-type {
    border-bottom: none;
  }
  &.${menuItemClasses.focusVisible} {

  }
  &.${menuItemClasses.disabled} {

  }
  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${Colors.whiteColor}33;
    color: ${Colors.whiteColor}};
  }
  `
);
const Listbox = styled('ul')(
    ({ theme }) => `
    font-weight: 500;
    font-size: 14px;
    box-sizing: border-box;
    padding: 6px;
    margin: 8px 0;
    min-width:200px;
    border-radius: 12px;
    outline: 0px;
    position:absolute;
    right: -80px;
    background:#2F3654;
    color: ${Colors.whiteColor};
    z-index: 1;
    `
);
const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  display:flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background: #8397C31A;
  border: 1px solid  #8397C31A;
  color: ${Colors.whiteColor};
  position:relative;
 `
);
