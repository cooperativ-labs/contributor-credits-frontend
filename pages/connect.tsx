import cn from 'classnames';
import React, { FC } from 'react';
import SelectWallet from '@src/Manager/components/ModalSelectWallet';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';

interface LoginProps {
  nextLink: string;
}
const Login: FC<LoginProps> = ({ nextLink }) => {
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'h-full w-screen min-h-screen')}>
        <SelectWallet />
      </div>
    </div>
  );
};

export default Login;
