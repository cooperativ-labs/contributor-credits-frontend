import axios from 'axios';
import CCEstablishForm from '@src/Manager/forms/CCEstablishForm';
import FormattedCryptoAddress from '@src/Manager/components/FormattedCryptoAddress';
import FormCard from '@src/Manager/components/cards/FormCard';
import FormChainWarning from '@src/Manager/components/FormChainWarning';
import PresentLegalText from '@src/Manager/components/PresentLegalText';
import React, { useContext, useState } from 'react';
import { currencyOptions } from '@src/utils/enumConverters';
import { generateAgreement } from '@src/utils/helpersAgreement';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { MatchSupportedChains } from '@src/web3/connectors';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { SmartContractUnestablished } from 'types';
import { useAsync } from 'react-use';
import { useQuery } from '@apollo/client';
import { UserContext } from '@src/utils/SetUserContext';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const HowToCreate =
  "Create a new class by first publishing a smart contract to Ethereum, then 'Establishing' it by attaching a legal contract. You can begin paying Credits once the Class has been established.";

export type AgreementContentType = {
  organizationName: string;
  backingToken: string;
  triggerCurrency: string;
  financingTriggerAmount: number;
  revenueTriggerAmount: number;
  triggerText: string;
  signature: string;
  email: string;
};

type AgreementText = {
  custom: string;
  standard: string;
};

type ClassEstablishProps = {
  availableContract: SmartContractUnestablished;
};

const ClassEstablish: React.FC<ClassEstablishProps> = ({ availableContract }) => {
  const { chainId, account } = useWeb3React<Web3Provider>();
  const { userId } = useContext(UserContext);
  const [customText, setCustomText] = useState<boolean>();
  const { data: userData } = useQuery(GET_USER, { variables: { userId: userId } });
  const user = userData?.getUser;

  // if (!user) {
  //   return <Loading />;
  // }

  const [agreementContent, setAgreementContent] = useState<AgreementContentType>({
    organizationName: '',
    backingToken: '',
    triggerCurrency: '',
    financingTriggerAmount: null,
    revenueTriggerAmount: null,
    triggerText: '',
    email: '',
    signature: '',
  });

  const standardAgreement = `/assets/cc-legal-language-standard.md`;
  const getStandardAgreementText = async (): Promise<AgreementText['standard']> =>
    axios.get(standardAgreement).then((resp) => resp.data);
  const { value: standardAgreementText } = useAsync(getStandardAgreementText, []);

  const customAgreement = `/assets/cc-legal-language-custom.md`;
  const getCustomAgreementText = async (): Promise<AgreementText['custom']> =>
    axios.get(customAgreement).then((resp) => resp.data);
  const { value: customAgreementText } = useAsync(getCustomAgreementText, []);

  if (!user) {
    return <></>;
  }

  const { cryptoAddress } = availableContract;
  const contractAddress = cryptoAddress.address;
  const {
    organizationName,
    triggerText,
    backingToken,
    triggerCurrency,
    financingTriggerAmount,
    revenueTriggerAmount,
    email,
    signature,
  } = agreementContent;

  const getToken = (value) => {
    const token = currencyOptions.filter((option) => option.value === value);
    return token[0];
  };

  const setText = customText ? customAgreementText : standardAgreementText;

  const bacToken = getToken(backingToken);
  const bacName = bacToken?.symbol;
  const bacAddress = bacToken?.address;
  const isMainNet = cryptoAddress.chainId === 1 || cryptoAddress.chainId === 137;

  const agreement = generateAgreement(
    {
      organizationName: organizationName,
      c2Address: contractAddress,
      bacName: bacName,
      chainName: MatchSupportedChains(chainId).name,
      bacAddress: bacAddress,
      triggerCurrency: triggerCurrency,
      financingTriggerAmount: financingTriggerAmount && numberWithCommas(financingTriggerAmount),
      revenueTriggerAmount: revenueTriggerAmount && numberWithCommas(revenueTriggerAmount),
      triggerText: triggerText,
      signature: signature,
      signerAddress: account,
      signerEmail: email,
      isNotMainnet: !isMainNet,
    },
    setText ?? ''
  );

  return (
    <div className="px-4 py-10" style={{ backgroundColor: '#f3f5fb' }}>
      <div className="md:mx-4">
        <h1 className="text-3xl font-bold ">Establish New Class</h1>
        <div className="mb-6">
          <FormattedCryptoAddress label={'Address:'} address={cryptoAddress.address} chainId={cryptoAddress.chainId} />
        </div>

        <div className="my-3 text-sm">{HowToCreate}</div>
        {!availableContract.used ? (
          cryptoAddress.chainId === chainId ? (
            <div className="md:mt-10 lg:grid grid-cols-5 gap-6">
              <div className="col-span-2">
                <div className="lg:sticky top-6">
                  <CCEstablishForm
                    setAgreementContent={setAgreementContent}
                    setCustomText={setCustomText}
                    bacAddress={bacAddress}
                    availableContract={availableContract}
                    agreement={agreement}
                    user={user}
                  />
                  <FormChainWarning />
                </div>
              </div>
              <div className="hidden md:flex border-t-1 lg:border-0 flex col-span-3 md:max-w-max">
                <PresentLegalText agreement={agreement} />
              </div>
            </div>
          ) : (
            <div className="font-bold text-center">
              Please switch to the{' '}
              <span className="text-yellow-600">{MatchSupportedChains(cryptoAddress.chainId).name} </span> network to
              establish this class.
            </div>
          )
        ) : (
          <div className="font-bold text-center">The smart contract at this address has already been established.</div>
        )}
      </div>
    </div>
  );
};

export default ClassEstablish;
