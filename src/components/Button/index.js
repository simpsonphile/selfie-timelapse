import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './styles.module.scss';

const Button = forwardRef(
  (
    {
      as: Component = 'button',
      children,
      icoRight,
      className,
      variation,
      ...otherProps
    },
    ref
  ) => {
    const classes = classNames(
      styles.Button,
      {
        [styles.ButtonVarSecondary]: variation === 'secondary',
        [styles.ButtonVarTransparent]: variation === 'transparent',
      },
      className
    );

    return (
      <Component ref={ref} {...otherProps} className={classes}>
        <span className={styles.ButtonWrap}>
          <span className={styles.ButtonLabel}>{children}</span>
          {icoRight && <span className={styles.ButtonIco}>{icoRight}</span>}
        </span>
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
