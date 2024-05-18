import React from 'react'
import "./SearchBar.css";
import {InputAdornment, TextField, withStyles } from '@material-ui/core';
import {Search} from "@material-ui/icons";
function SearchBar() {

  const StyledTextField = withStyles((theme) => ({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: `90px`,
          borderColor: theme.palette.primary.main,
          borderWidth: '2px',
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.light,
        },
      },
      '& .MuiInputBase-input': {
        color: theme.palette.primary.light,
        fontSize: '14px',
        fontWeight: 'bold',
        padding : '15px 0px 15px 0px'
      },
      '& .MuiInputLabel-root': {
        color: theme.palette.text.primary,
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.text.focused,
      },
    },
  }))(TextField);

  return (
    <div>
        <StyledTextField
          id="outlined-basic"
          label="What's in your mind?"
          variant="outlined"
          InputProps={{startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
            ),
            disableUnderline: true
          }}
          style={{ width: '350px',marginLeft: '10px' }} 
        />
    </div>
  );
}

export default SearchBar;