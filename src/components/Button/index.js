import { forwardRef } from 'react';

const Button = forwardRef(({ children, ...otherProps }, ref) => {
  return (
    <button ref={ref} {...otherProps}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
