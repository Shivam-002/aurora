import React from 'react';
import classNames from 'classnames';
import { useTheme } from '@material-ui/core/styles'; 
import "./MenuItem.css";

function MenuItem({ Icon, title, isActive, onClick }) {
  const theme = useTheme();

  return (
    <div
      className={classNames('sidebarOption', { 'active': isActive })}
      onClick={onClick}
      style={{ color: isActive ? theme.palette.text.primary : theme.palette.text.disabled }}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default MenuItem;
