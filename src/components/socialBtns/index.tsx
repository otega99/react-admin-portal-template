import { Box } from 'components/box';
import { LinkTag } from 'components/linkTag';
import Text from 'components/text';
import React, { ReactNode } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import cs from 'classnames';
import './socialBtns.scss';

interface Props {
  externalLink: string;
  children?: ReactNode;
  className?: string;
  to?: string;
}

const GoogleBtn: React.FC<Props> = ({ externalLink, className }) => {
  const classes = cs('socialBtn', {
    [`${className}`]: className
  });
  return (
    <LinkTag className={classes} to="#" externalLink={externalLink}>
      <FaGooglePlay className="socialBtn__icon" />
      <Box className="socialBtn__body">
        <Text variant="caption">Download on</Text>
        <Text>APP STORE</Text>
      </Box>
    </LinkTag>
  );
};

const AppleBtn: React.FC<Props> = ({ externalLink, className }) => {
  const classes = cs('socialBtn', {
    [`${className}`]: className
  });
  return (
    <LinkTag className={classes} to="#" externalLink={externalLink}>
      <FaApple className="socialBtn__icon" />
      <Box className="socialBtn__body">
        <Text variant="caption">Download on</Text>
        <Text>APP STORE</Text>
      </Box>
    </LinkTag>
  );
};

const SocialBtn: React.FC<Props> = ({ externalLink, children, className, to = '#' }) => {
  const classes = cs('socialBtn', {
    [`${className}`]: className
  });
  return (
    <LinkTag className={classes} to={to} externalLink={externalLink}>
      {children}
    </LinkTag>
  );
};

export { GoogleBtn, AppleBtn, SocialBtn };
