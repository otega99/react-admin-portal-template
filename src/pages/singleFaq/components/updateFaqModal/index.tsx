import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import Api from 'types/client';
import * as yup from 'yup';
import './updateFaq.scss';

export interface FaqI {
  name: string;
  description: string;
  image: string;
}

interface Props {
  handleCancel: () => void;
  data: Api.Faq.GetSingleFaq.Response | undefined;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: FaqI, formikHelpers: FormikHelpers<FaqI>) => void;
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter name'),
  description: yup.string().required('Please enter description'),
  image: yup
    .mixed()
    .nullable()
    // .required('file is required')
    .test(
      'FILE_FORMAT',
      'Unsupported format. The supported formats are jpg, jpeg and png.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    )
    .test(
      'FILE_SIZE',
      'File too big. Maximum file size is 2MB.',
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
});

const UpdateFaq: React.FC<Props> = ({ handleSubmit, isLoading, data }) => {
  const [initialValues, setInitialValues] = useState<FaqI>({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        description: data.data.body,
        image: '',
        name: data.data.title
      });
    }
  }, [data]);
  return (
    <Box className="faqDelete">
      {/* <Text as="h6" variant="h6" className="faqDelete__text">
        Edit FAQ
      </Text> */}
      <Form<FaqI>
        validationSchema={validationSchema}
        className="faqForm__form"
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initialValues}>
        <FormField placeholder="Add name for this FAQ" name="name" label="Name" />
        <FormField.TextArea
          placeholder="Description of this FAQ. Not more than 500 words"
          name="description"
          label="Description"
        />
        <FormField.File name="image" label="Upload photo" />
        <Box>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default UpdateFaq;
