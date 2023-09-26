import { check } from 'assets';
import { Box, Button, Text } from 'components';
import { Path } from 'navigations/routes';
import './successModal.scss';

const SuccessModal = () => {
  return (
    <Box className="passwordSuccess">
      <Box className="passwordSuccess__body">
        <Box>
          <img src={check} alt="checked" />
        </Box>
        <Text as="h3" variant="h3">
          Congratulations
        </Text>
        <Text>Password reset succesful</Text>
      </Box>
      <Box className="passwordSuccess__btnDiv">
        <Button as="link" to={Path.Login} fullWidth>
          Login to your account
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessModal;
