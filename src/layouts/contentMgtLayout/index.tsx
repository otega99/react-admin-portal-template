import { Box } from 'components';
import React, { ReactNode, useState } from 'react';
import Aside from './components/aside';
import Header from './components/header';
import './contentMgtLayout.scss';

interface Props {
  children?: ReactNode;
  header: string;
  isPrevBtn?: boolean;
  backPath?: string;
}

const ContentMgtLayout: React.FC<Props> = ({ children, header, isPrevBtn, backPath }) => {
  const [showAside, setShowAside] = useState(false);

  const handleToggleAside = () => setShowAside((prev) => !prev);
  return (
    <Box className="contentMgtLayout">
      <Aside showAside={showAside} />
      <Box className="contentMgtLayout__main" as="main">
        <Header
          handleToggleAside={handleToggleAside}
          backPath={backPath}
          isPrevBtn={isPrevBtn}
          header={header}
        />
        <Box className="contentMgtLayout__children">{children}</Box>
      </Box>
    </Box>
  );
};

export default ContentMgtLayout;
