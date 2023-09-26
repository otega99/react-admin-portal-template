import React, { useId } from 'react';
import { BreadCrumbContainerProps } from '../../types/breadCrumbTypes';
import './container.scss';

const BreadCrumbContainer: React.FC<BreadCrumbContainerProps> = ({ children, separator }) => {
  const mappedChildren = React.Children.toArray(children);
  const id = useId();

  return (
    <div className="breadCrumb">
      {mappedChildren.map((child, index) => {
        const isLastChild = index === mappedChildren.length - 1;

        return (
          <div className="breadCrumb__itemContainer" key={`${id}${index}`}>
            <div className="breadCrumb__child">{child}</div>
            {!isLastChild && <div className="breadCrumb__separator">{separator}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbContainer;
