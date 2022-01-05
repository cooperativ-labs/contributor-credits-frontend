import FormButton from '../components/buttons/FormButton';
import React, { FC, useContext, useState } from 'react';
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
import { ApplicationStoreProps, store } from '@context/store';
import Router, { useRouter } from 'next/router';
import { WalletErrorCodes } from '@src/web3/helpersChain';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type CreateCcClassProps = {
  userId: string;
};

const CreateCcClass: FC<CreateCcClassProps> = ({ userId }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const { library, chainId } = useWeb3React<Web3Provider>();
  const signer = library.getSigner();
  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [alerted, setAlerted] = useState<boolean>(false);

  /** @TODO : need to put this somewhere it wont fail when closed */
  const [deployState, deploy] = useAsyncFn(
    async (ccType: SmartContractType) => {
      const protocol = MatchSupportedChains(chainId).protocol;
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      const contractDeployFn = ccType === SmartContractType.C2 ? deploy_c2_v0_1_3 : deploy_c3_v1_0_0;
      try {
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
        setButtonStep('confirmed');
      } catch (error) {
        if (error.code === 4001) {
          setButtonStep('rejected');
        }
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [signer, chainId, userId]
  );

  if (error && !alerted) {
    console.log(error);
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
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
        await deploy(values.type);
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
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCcClass;
