import { forwardRef } from 'react';
import styles from './styles.module.scss';

const Button = forwardRef(
  ({ as: Component = 'button', children, ...otherProps }, ref) => {
    return (
      <Component ref={ref} {...otherProps} className={styles.Button}>
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
