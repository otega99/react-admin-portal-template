import React from 'react';
import { BreadCrumbContainer, BreadCrumbItem } from './components';
import { BreadCrumbContainerProps, BreadCrumbItemProps } from './types/breadCrumbTypes';

const BreadCrumb = (props: BreadCrumbContainerProps) => <BreadCrumbContainer {...props} />;

BreadCrumb.Item = (props: BreadCrumbItemProps) => <BreadCrumbItem {...props} />;

export default BreadCrumb;
