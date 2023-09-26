import { Box, BreadCrumbBox, Container, Text } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import OtherInfo from './components/otherInfo';
import ProfileDetails from './components/profileDetails';
import ProfilePwd from './components/profilePwd';
import './profile.scss';

const Profile = () => {
  const { user } = useAuth();
  return (
    <ContentMgtLayout header="Profile">
      <Box className="profile">
        <Container className="profile__container">
          <Box className="profile__head">
            <BreadCrumbBox
              firstTextLink={Path.Dashboard}
              firstText="Dashboard"
              secondText="Profile Settings"
            />
          </Box>
          <Box className="profile__details">
            <Text className="profile__header">User Information</Text>
            <Box className="profile__detailsGrid">
              <Box className="profile__detailBox">
                <ProfileDetails user={user} />
              </Box>
              <Box className="profile__detailBox">
                <OtherInfo user={user} />
              </Box>
              <Box className="profile__detailBox">
                <ProfilePwd />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Profile;
