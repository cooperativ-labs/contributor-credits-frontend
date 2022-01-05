export const normalizeChainId = (chainId) => {
  return typeof chainId === 'number' ? chainId : parseInt(chainId[2]);
};

export const WalletErrorMessages = {
  NeedToApproveConnection: `Trying to connect to your wallet: you may need to click on your wallet's browser extension to permit it to connect to Cooperativ.`,
  RejectedAttemptToConnect: `It looks like you rejected your wallet's attempt to connect. You can try the action again.`,
  OnIncompatibleChain: `It looks like you are on an incompatible blockchain network. Check your wallet settings to make sure you are using the Ethereum or Ropsten networks`,
};

export const WalletErrorCodes = (error) => {
  switch (error.code) {
    case parseInt('-32002'):
      return WalletErrorMessages.NeedToApproveConnection;
    case 4001:
      return WalletErrorMessages.RejectedAttemptToConnect;
    default:
      return `Error: ${error.message} (check your wallet settings to make sure you are using the Ethereum or Ropsten networks)`;
  }
};
