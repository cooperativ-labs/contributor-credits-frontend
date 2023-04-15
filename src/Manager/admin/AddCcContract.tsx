import FormButton from '@src/Manager/components/buttons/FormButton';
import Input from '@src/Manager/forms/components/Inputs';
import React from 'react';
import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { CryptoAddressProtocol } from 'types/index';
import { Form, Formik } from 'formik';
import { SmartContractType } from 'types/index';
import { useMutation } from '@apollo/client';

const AddCcContract: React.FC = () => {
  const [createContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);

  if (data) {
    alert(data.addSmartContractUnestablished.smartContractUnestablished[0].cryptoAddress.address);
  }

  return (
    <Formik
      initialValues={{
        userId: '',
        setDate: '',
        setContractAddress: '',
        setChainId: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await createContract({
          variables: {
            cryptoAddress: values.setContractAddress,
            chainId: values.setChainId,
            type: SmartContractType.C2,
            protocol: CryptoAddressProtocol.Eth,
            owner: values.userId,
          },
        });
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Input name="userId" className={''} labelText="user ID" />
          <Input name="setContractAddress" className={''} labelText="Contract Address" />
          <Input name="setDate" className={''} labelText="Creation Date" />
          <Input type="number" name="setChainId" className={''} labelText="Set Chain Id" />

          <FormButton type="submit" disabled={isSubmitting}>
            Add Contract
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddCcContract;
