import { Box } from 'components/box';
import { usaIcon, euIcon, nigIcon, ukIcon } from 'assets';
import React from 'react';
import './flag.scss';
import Api from 'types/client';

interface Props {
  country: Api.Country;
}

const selectCountry = (country: Api.Country) => {
  switch (country) {
    case 'EUR':
      return euIcon;

    case 'GBP':
      return ukIcon;

    case 'NGN':
      return nigIcon;

    case 'USD':
      return usaIcon;

    default:
      return usaIcon;
  }
};

const Flag: React.FC<Props> = ({ country }) => {
  return (
    <Box className="flag">
      <img src={selectCountry(country)} alt="" />
    </Box>
  );
};

export default Flag;
