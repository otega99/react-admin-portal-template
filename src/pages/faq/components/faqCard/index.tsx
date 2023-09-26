import { Box, Image, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import './faqCard.scss';

interface Props {
  item: Api.Faq.FaqData;
}

const FaqCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`${Path.FAQ}/${item.id}`);
  };

  const imgSrc = `${baseURL}/static/images/${item.coverImagePath}`;
  return (
    <Box className="faqCard" onClick={handleRoute}>
      <Box className="faqCard__imgDiv">
        <Image src={imgSrc} alt={item.title} />
      </Box>
      <Box className="faqCard__body">
        <Text className="faqCard__header">{item.title}</Text>
        <Text className="faqCard__paragraph">{item.body}</Text>
      </Box>
    </Box>
  );
};

export default FaqCard;
