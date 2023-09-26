import { avatarLogo } from 'assets';
import { Box, Button, LinkTag, Text } from 'components';
import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineChevronDown } from 'react-icons/hi';
import cs from 'classnames';
import { useAuth } from 'contexts/AuthProvider';
import Api from 'types/client';
import { Path } from 'navigations/routes';
import { baseURL } from 'config/AxiosConfig';

interface Props {
  user: Api.AdminI | undefined;
}

const Dropdown = ({ user }: Props) => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth();

  const handleToggle = () => setShow((prev) => !prev);

  const dropdownClasses = cs('header__dropdown', {
    show: show
  });

  const imgSrc = `${baseURL}/static/images/${user?.profilePicturePath}`;

  return (
    <Box className="header__dropdownDiv">
      <Box className="header__person" onClick={handleToggle}>
        <Box className="header__personImg">
          <img
            src={user?.profilePicturePath ? imgSrc : ''}
            onError={(e) => {
              e.currentTarget.src = avatarLogo;
            }}
            alt={user?.firstName}
          />
        </Box>
        <Text className="header__personText">
          {user?.firstName} {user?.lastName}
        </Text>
        <Box className="header__personArrow">
          <HiOutlineChevronDown />
        </Box>
      </Box>
      <Box className={dropdownClasses}>
        <Text variant="h6">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text>{user?.emailAddress}</Text>
        <LinkTag to="/" className="header__dropdownNotification">
          Notifications
        </LinkTag>
        <Box className="header__dropdownBtnBox">
          <Button as="link" to={Path.Profile}>
            View Profile
          </Button>
          <Button onClick={logout} variant="plain" className="header__logout">
            <span>
              <FiLogOut />
            </span>
            <span>Logout</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dropdown;
