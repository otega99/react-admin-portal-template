import { Box, Button, Flag, Text } from 'components';
import { Path } from 'navigations/routes';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import './currenciesRow.scss';

interface Props {
  item: Api.Currencies.CurrencyI;
  id: string;
}

const CurrenciesRow: React.FC<Props> = ({ item, id }) => {
  const navigate = useNavigate();

  const handleEditRoute = () => {
    navigate(`${Path.Currencies}/edit/${id}`);
  };
  return (
    <Box className="currenciesRow">
      <Text variant="caption" className="currenciesRow__item">
        {item.type}
      </Text>
      <Box className="currenciesRow__item flagItem">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any */}
        <Flag country={item.currency as any} />
        <Text variant="caption">{item.currency}</Text>
      </Box>
      <Text variant="caption" className="currenciesRow__item">
        {formatDate(item.dateCreated)}
      </Text>
      <Text variant="caption" className="currenciesRow__item">
        {item.buyRate}
      </Text>
      <Text variant="caption" className="currenciesRow__item">
        {item.sellRate}
      </Text>
      <Box className="currenciesRow__item icons">
        <Button onClick={handleEditRoute} variant="plain" className="currenciesRow__itemItem">
          <FiEdit2 />
        </Button>
        {/* <Button onClick={handleOpenModal} variant="plain" className="currenciesRow__itemItem">
          <RiDeleteBinLine />
        </Button> */}
      </Box>
      {/* <Dialog
        removeCloseBtn
        header="Delete USD Currency"
        handleClose={handleFalseModal}
        state={showModal}>
        <DeleteModal handleDelete={handleDelete} handleCancel={handleFalseModal} />
      </Dialog> */}
    </Box>
  );
};

export default CurrenciesRow;
