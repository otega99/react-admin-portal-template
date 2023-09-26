import BreadCrumb from 'components/breadCrumb';
import Skeleton from 'components/skeleton';
import React from 'react';

interface Props {
  firstText: string;
  secondText: string;
  firstTextLink?: string;
  isLoading?: boolean;
}

const BreadCrumbBox: React.FC<Props> = ({ firstText, firstTextLink, secondText, isLoading }) => {
  return (
    <BreadCrumb separator=">">
      <BreadCrumb.Item to={firstTextLink}>{firstText}</BreadCrumb.Item>
      <BreadCrumb.Item variant="text">
        {isLoading && <Skeleton className="" />}
        {!isLoading && secondText && <span>{secondText}</span>}
      </BreadCrumb.Item>
    </BreadCrumb>
  );
};

export default BreadCrumbBox;
