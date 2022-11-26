const Image = ({ className, alt, ...otherProps }) => {
  return <img {...otherProps} alt={alt} className={className} />;
};

export default Image;
