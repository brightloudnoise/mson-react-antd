import React from 'react';
import ButtonMui from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from './icon';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    // FUTURE: if we decide we want this then make it optional via a prop
    // marginTop: theme.spacing.unit * 3
  }
});

class Button extends React.PureComponent {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const {
      classes,
      type,
      disabled,
      label,
      icon,
      fullWidth,
      variant
    } = this.props;

    return (
      <ButtonMui
        className={classes.button}
        type={type}
        color="primary"
        disabled={disabled}
        onClick={this.handleClick}
        fullWidth={fullWidth}
        variant={variant}
      >
        {icon ? <Icon className={classes.leftIcon} icon={icon} /> : null}
        {label}
      </ButtonMui>
    );
  }
}

export default withStyles(styles)(Button);
