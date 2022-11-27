import { forwardRef } from 'react';

const Image = forwardRef(({ className, alt, ...otherProps }, ref) => {
  return <img ref={ref} {...otherProps} alt={alt} className={className} />;
});

Image.displayName = 'Image';

export default Image;
