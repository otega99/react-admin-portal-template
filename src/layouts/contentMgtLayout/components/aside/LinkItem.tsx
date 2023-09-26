import { Box, LinkTag } from 'components';
import { useAppLocation } from 'hooks';
import React, { useEffect, useState } from 'react';
import { getActiveLink } from 'utils/getActiveLink';
import { LinkDataI } from './index';
import cs from 'classnames';

interface Props {
  item: LinkDataI;
}

const LinkItem: React.FC<Props> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useAppLocation();
  const isActive = getActiveLink(location.pathname, item.text);

  useEffect(() => {
    if (isActive) {
      setIsHovered(true);
    }
  }, [isActive]);

  const classes = cs('aside__linkItem', {
    active: isActive
  });
  return (
    <Box
      key={item.text}
      onMouseEnter={isActive ? () => null : () => setIsHovered(true)}
      onMouseLeave={isActive ? () => null : () => setIsHovered(false)}
      className={classes}
      as="li">
      <LinkTag className="aside__link" to={item.link}>
        <span>
          {isHovered ? (
            <img src={item.hoverImg} alt={item.text} />
          ) : (
            <img src={item.image} alt={item.text} />
          )}
        </span>
        <span>{item.text}</span>
      </LinkTag>
    </Box>
  );
};

export default LinkItem;
