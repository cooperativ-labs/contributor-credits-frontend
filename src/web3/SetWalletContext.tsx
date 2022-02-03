import React, { useEffect, useState } from 'react';
import { GetConnector } from './connectors';
import { useWeb3React } from '@web3-react/core';
import { WalletErrorCodes } from './helpersChain';
import { Web3Provider } from '@ethersproject/providers';
declare let window: any;

const SetWalletContext: React.FC<React.ReactNode> = ({ children }) => {
  const [tried, setTried] = useState(false);
  const { activate, active, library } = useWeb3React<Web3Provider>();
  const [selectedConnector, setSelectedConnector] = useState(undefined);

  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    setSelectedConnector(GetConnector(selection));
  }, [setSelectedConnector]);

  if (selectedConnector && !tried && !active) {
    activate(selectedConnector)
      .catch((err) => {
        alert(WalletErrorCodes(err));
      })
      .then((res) => setTried(true));
  }

  // const [, GetWalletSignature] = useAsyncFn(async () => {
  //   const signer = library.getSigner();
  //   try {
  //     const signed = await signer.signMessage(
  //       'Clicking confirm below logs you in by proving you own this wallet address'
  //     );
  //     setSignedInfo(signed);
  //     return signed;
  //   } catch (err) {}
  //   return;
  // }, [hasAuth, setHasAuth]);

  // useEffect(() => {
  //   if (active && !signedInfo) {
  //     GetWalletSignature();
  //   }
  // }, [active, signedInfo]);

  return <>{children}</>;
};

export default SetWalletContext;
