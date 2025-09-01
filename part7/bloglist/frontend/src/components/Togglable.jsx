import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button
          color="error"
          variant="outlined"
          type="reset"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
