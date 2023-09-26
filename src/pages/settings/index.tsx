import { Box, Container, Text, useAlert } from 'components';
import { FormikHelpers } from 'formik';
import { ContentMgtLayout } from 'layouts';
import React from 'react';
import Tabs from './components/tabs';
import SettingsForm, { SettingsI } from './components/settingsForm';
import './settings.scss';

const Settings = () => {
  const alert = useAlert();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: SettingsI, formikHelpers: FormikHelpers<SettingsI>) => {
    alert({
      message: 'Company Information updated successfully'
    });
  };
  return (
    <ContentMgtLayout header="Settings">
      <Box className="settings">
        <Container className="settings__container">
          <Box className="settings__head">
          <Tabs></Tabs>
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

// <SettingsForm handleSubmit={handleSubmit} />

export default Settings;