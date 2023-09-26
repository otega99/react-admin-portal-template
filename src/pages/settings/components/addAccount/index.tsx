import React, {useState,useEffect} from 'react';
import {Box,Form,FormField,Button,Text} from 'components'
import { FormikHelpers } from 'formik';
import { useGetCurrencies } from 'hooks';
import { useAuth } from 'contexts/AuthProvider';
import * as yup from 'yup';
import Api from 'types/client';
import './addAccount.scss'

interface Props {
  user: Api.AdminI | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: AddAccountI, formikHelpers: FormikHelpers<AddAccountI>) => void;
  isLoading: boolean;
}

export interface AddAccountI{
  id: number;
  userId: number;
  currency: string;
  accountNo: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  logo: string,
  status: string;
  dateCreated: string;
  dateUpdated: string;
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validationSchema = yup.object().shape({
  bankName: yup.string().required('Please enter Bank Name'),
  bankCode: yup.string().required('Please enter Bank Code'),
  accountName: yup.string().required('Please enter Account Name'),
  accountNo: yup.string().required('Please enter your Account Number'),
  logo: yup
    .mixed()
    .nullable()
    .required('file is required')
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


const AddAccount: React.FC<Props>=({ user, handleSubmit, isLoading }: Props)=>{

  const { token } = useAuth();

  const defaultRequest: Api.Currencies.GetCurrencies.Request = {
    PageNumber: 1,
    PageSize: 10,
    token:token
  };

  const [initialValues, setInitialValues] = useState<AddAccountI>({
    id: 0,
    userId: 0,
    currency: '',
    accountNo: '',
    accountName: '',
    bankName: '',
    bankCode: '',
    logo: '',
    status: 'Active',
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        id: 0,
        userId: user.id,
        currency: '',
        accountNo: '',
        accountName: '',
        bankName: '',
        bankCode: '',
        logo: '',
        status: 'Active',
        dateCreated: new Date().toISOString(),
        dateUpdated: new Date().toISOString()
      });
    }
  }, [user]);

  
    const [selectedValue, setSelectedValue] = useState("");
  
    const { data,  error, refetch } = useGetCurrencies(defaultRequest);
  
    console.log(data?.data)

    return(
       <Box className="addAccount_modal">
            <Form <AddAccountI>  
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              className="addAdminForm__form"
              initialValues={initialValues}>
                <FormField.File label="Banner" name="logo"/>
                  <FormField label="Bank" name="bankName" />
                  <Box className="iselect">
                  <Text style={{fontWeight: "500"}}>Currency</Text>
                  <select name="roleid" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    {data?.data.map((item: Api.Currencies.CurrencyI) => (
                      <option key={item.id} value={item.currency}>
                        {item.currency}
                      </option>
                    ))} 
                  </select>
                </Box>
                  <FormField label="Account Number" name="accountNo" />
                  <FormField label="Account Name" name="accountName" />
                  <FormField label="Bank Code" name="bankCode" />
                 <Box>
                    <Button disabled={isLoading} type="submit">
                      Add Account
                    </Button>
                 </Box>
            </Form>
       </Box>
    );
}

export default AddAccount;