import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import cs from 'classnames';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClasses?: string;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const MyImage: React.FC<Props> = ({ src, alt, className, imgClasses, placeholder, ...props }) => {
  const classes = cs(imgClasses);
  return (
    <div className={classes}>
      <LazyLoadImage
        alt={alt}
        height="100%"
        src={src} // use normal <img> attributes as props
        width="100%"
        className={className}
        {...props}
      />
    </div>
  );
};

export default MyImage;
