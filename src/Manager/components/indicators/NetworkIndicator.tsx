import cn from 'classnames';
import React, { FC } from 'react';
import WalletConnectButton from '@src/web3/WalletConnectionButton';
import { MatchSupportedChains } from '@src/web3/connectors';
import { useAccount, useChainId } from 'wagmi';

export const networkIcon = (chainId, walletAddress) => {
  if (!walletAddress) {
    return 'bg-white border-2 border-gray-300';
  }

  return MatchSupportedChains(chainId)?.icon;
};

export const networkColor = (chainId, walletAddress) => {
  // const [networkColor, setNetworkColor] = useState('gray-300');

  const color = MatchSupportedChains(chainId)?.color;
  if (!walletAddress) {
    return 'bg-gray-400 border-2 border-gray-300';
  }

  if ([1, 11155111, 137, 80001].includes(chainId)) {
    return `bg-${color} hover:text-${color}}`;
  } else if (chainId === undefined) {
    return 'bg-gray-300 border-2 border-gray-300';
  }
  return 'bg-cRed hover:text-black';
};

type NetworkIndicatorDotProps = {
  chainId: number | undefined;
  walletAddress: string;
};

export const NetworkIndicatorDot: FC<NetworkIndicatorDotProps> = ({ chainId, walletAddress }) => {
  const bgAndTextColor = networkColor(chainId, walletAddress);
  return <div className={`${bgAndTextColor} flex rounded-full h-3 w-3 mr-1`} />;
};

const NetworkIndicator: FC = () => {
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  // const { uuid } = useContext(WalletOwnerContext);
  // const { loading: userLoading, data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  // const user = userData?.queryUser[0];

  // const whichWallet = `with ${user?.walletAddresses.find((userWallet) => userWallet.address === walletAddress)?.name}`;

  const hoverColor = `hover:${networkColor(chainId, walletAddress)}`;
  const ChainName = () => {
    if (!walletAddress) {
      return 'Click here to connect a wallet';
    }
    switch (chainId) {
      case 1:
        return `Ethereum`;
      case 11155111:
        return 'Sepolia';
      case 137:
        return `Polygon`;
      case 80001:
        return 'Polygon Testnet';
      case undefined:
        return 'Click here to connect a wallet';
      default:
        return 'Incompatible Network';
    }
  };

  return (
    <WalletConnectButton className="focus:outline-none">
      <div
        className={cn(
          hoverColor,
          'flex items-center rounded-full border-2 border-gray-300 p-1 text-xs font-semibold text-gray-600'
        )}
      >
        <div className=" mx-auto px-2">{ChainName()}</div>
        <NetworkIndicatorDot chainId={chainId} walletAddress={walletAddress} />
      </div>
    </WalletConnectButton>
  );
};

export default NetworkIndicator;
