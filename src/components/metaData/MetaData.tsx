import { Helmet } from 'react-helmet-async';

interface Props {
  pageTitle: string;
}

const MetaData: React.FC<Props> = ({ pageTitle }) => {
  return (
    <Helmet>
      <title>{pageTitle} - Eternal Digital Assets</title>
    </Helmet>
  );
};

export default MetaData;
