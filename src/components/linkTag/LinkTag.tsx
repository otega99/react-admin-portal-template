import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cs from 'classnames';
import './linkTag.scss';

interface Props extends LinkProps {
  to: string;
  externalLink?: string;
  children: JSX.Element | ReactNode;
  className?: string;
  variant?: 'plain' | 'primary';
}

const LinkTag: React.FC<Props> = ({ to, children, externalLink, className, variant, ...rest }) => {
  const classes = cs('linkTag', {
    [`${className}`]: className,
    'linkTag--primary': variant === 'primary'
  });
  return (
    <Link
      className={classes}
      to={externalLink ? { pathname: externalLink } : to}
      target={externalLink ? '_blank' : '_self'}
      {...rest}>
      {children}
    </Link>
  );
};
export default LinkTag;
