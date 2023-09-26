import { Box, BreadCrumbBox, Container, useAlert } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useAddFaq } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import './addFaq.scss';
import FaqForm, { FaqI } from './components/faqForm';

const AddFaq = () => {
  const alert = useAlert();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddFaq({
    onSuccess: () => {
      alert({
        message: 'FAQ created successfully'
      });

      navigate(Path.FAQ);
    }
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: FaqI, formikHelpers: FormikHelpers<FaqI>) => {
    const payload: Api.Faq.PostFaq.Request = {
      Body: values.description,
      Title: values.name,
      CoverImage: values.image,
      token
    };

    mutate(payload);
  };
  return (
    <ContentMgtLayout backPath={Path.FAQ} isPrevBtn header="FAQ">
      <Box className="addFaq">
        <Container className="addFaq__container">
          <Box className="addFaq__head">
            <BreadCrumbBox firstTextLink={Path.FAQ} firstText="FAQ" secondText="Add FAQ" />
          </Box>
          <FaqForm isLoading={isLoading} handleSubmit={handleSubmit} />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default AddFaq;
