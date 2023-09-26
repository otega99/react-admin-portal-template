import { Box, Container, Text } from 'components';
import React from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import Dropdown from './Dropdown';
import { useAuth } from 'contexts/AuthProvider';

interface Props {
  header: string;
  isPrevBtn?: boolean;
  backPath?: string;
  handleToggleAside: () => void;
}

const Header: React.FC<Props> = ({ header, isPrevBtn, backPath, handleToggleAside }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    }
  };
  return (
    <Box as="header" className="header">
      <Container className="header__container">
        <Box className="header__first">
          <Box className="header__hamburger" onClick={handleToggleAside}>
            <GiHamburgerMenu />
          </Box>
          {isPrevBtn && (
            <Box onClick={handleBack} className="header__prev">
              <HiArrowNarrowLeft />
            </Box>
          )}
          <Text as="h3" variant="h3">
            {header}
          </Text>
          {/* {!isPrevBtn && (
            <Box className="header__search">
              <FormField.Plain name="" />
            </Box>
          )} */}
        </Box>
        <Box className="header__second">
          {/* <Box className="header__notification">
            <span className="header__notificationNumber">
              <span>3</span>
            </span>
            <FiBell className="header__notificationIcon" />
          </Box> */}
          <Box className="header__break" />
          <Dropdown user={user} />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
