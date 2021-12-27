import FormButton from '../components/buttons/FormButton';
import React, { FC, useState } from 'react';
import Select from './components/Select';
import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { deploy_c2_v0_1_3 } from '@web3/deploy/deployC2';
import { deploy_c3_v1_0_0 } from '@web3/deploy/deployC3';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../components/buttons/Button';
import { MatchSupportedChains } from '@src/web3/connectors';
import { SmartContractType } from 'types';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type CreateCcClassProps = {
  userId: string;
  setPreventClose: any;
};

const CreateCcClass: FC<CreateCcClassProps> = ({ userId, setPreventClose }) => {
  const { library, chainId } = useWeb3React<Web3Provider>();
  const signer = library.getSigner();
  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  /** @TODO : need to put this somewhere it wont fail when closed */
  const [deployState, deploy] = useAsyncFn(
    async (ccType: SmartContractType) => {
      const protocol = MatchSupportedChains(chainId).protocol;
      const contractDeployFn = ccType === SmartContractType.C2 ? deploy_c2_v0_1_3 : deploy_c3_v1_0_0;
      const contract = await contractDeployFn(signer);
      addUnestablishedSmartContract({
        variables: {
          cryptoAddress: contract.address,
          chainId: chainId,
          type: ccType,
          protocol: protocol,
          owner: userId,
        },
      });
    },
    [signer, chainId, userId]
  );

  if (error) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
  }

  if (data) {
    alert(
      `Successfully deployed ${data.addSmartContractUnestablished.smartContractUnestablished[0].id} at ${data.addSmartContractUnestablished.smartContractUnestablished[0].cryptoAddress.address}`
    );
  }

  return (
    <Formik
      initialValues={{
        type: SmartContractType.C2,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.type) {
          errors.type = 'Please select a type';
        }
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setButtonStep('submitting');
        setPreventClose(true);
        await deploy(values.type);
        setButtonStep('confirmed');
        setPreventClose(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Select className={fieldDiv} required name="type" labelText="Select the type of credits">
            <option value={SmartContractType.C2}>Original Contributor Credits (C2)</option>
            {/* <option value={SmartContractType.C3}>Continuous Contributor Credits (C3)</option> */}
          </Select>
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Publish Class to ${MatchSupportedChains(chainId).name}`}
              submittingText="Deploying - This can take time. Please do not refresh."
              confirmedText="Confirmed!"
              failedText="Transaction failed"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCcClass;
