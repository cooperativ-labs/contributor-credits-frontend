import React, { FC, useState } from 'react';
import { CryptoAddress, CryptoAddressType } from 'types';
import { MatchSupportedChains } from '@src/web3/connectors';
import cn from 'classnames';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import Checkbox from '../forms/components/Checkbox';
import Input from '../forms/components/Inputs';
import { MarkPublic } from '../forms/components/ListItemButtons';
import { UPDATE_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';
import FormattedCryptoAddress from './FormattedCryptoAddress';

type WalletAddressListItemProps = {
  wallet: CryptoAddress;
  withEdit?: boolean;
};

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ wallet, withEdit }) => {
  const { id, name, type, chainId, address, description, public: isPublic } = wallet;
  const [editOn, setEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [updateCryptoAddress, { error }] = useMutation(UPDATE_CRYPTO_ADDRESS);

  if (error && !alerted) {
    alert('Oops, looks like something went wrong.');
    setAlerted(true);
  }
  const getChainLogo = (chainId) => {
    return (
      <div className="flex">
        only:{' '}
        {MatchSupportedChains(chainId).icon ? (
          <div>
            <img src={MatchSupportedChains(chainId).icon} className="ml-1 h-6" alt={name} />{' '}
          </div>
        ) : (
          MatchSupportedChains(chainId).name
        )}{' '}
      </div>
    );
  };
  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className="p-3 border-2 rounded-lg col-span-8">
        <div className="flex justify-between">
          {name} {type === CryptoAddressType.Contract ? getChainLogo(chainId) : <div> all EVM chains</div>}{' '}
          {/* {withEdit && (
            <div className="items-center">
              <MarkPublic isPublic={isPublic} />
            </div>
          )} */}
        </div>
        <div className="md:w-auto mt-3">
          <FormattedCryptoAddress
            chainId={chainId}
            address={address}
            className="text-large font-bold"
            withCopy
            showFull
          />
        </div>
        {description && <div className="mt-1 text-sm text-gray-700">{description}</div>}

        {editOn && (
          <div className="bg-cLightBlue bg-opacity-10 rounded-lg p-4 mt-6">
            <Formik
              initialValues={{
                public: isPublic,
                name: name,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                updateCryptoAddress({
                  variables: {
                    id: id,
                    name: values.name,
                    public: values.public,
                  },
                });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="flex flex-col">
                  <div className="grid grid-cols-4 gap-3 md:gap-8 items-center">
                    <Input
                      className={`bg-opacity-0 w-full col-span-3`}
                      required
                      labelText="Name"
                      name="name"
                      placeholder="Personal"
                    />
                    {/* 
                    <Checkbox
                      className="col-span-1"
                      fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                      name="public"
                      checked={values.public}
                      labelText="Public"
                    /> */}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-4 rounded p-2"
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      {withEdit && (
        <div className="flex col-span-1 justify-center">
          <button aria-label="edit address info" onClick={() => setEditOn(!editOn)}>
            {editOn ? (
              <FontAwesomeIcon icon="times" className="text-xl text-gray-600 mr-2" />
            ) : (
              <FontAwesomeIcon icon="pen" className="text-xl text-gray-600 mr-2" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletAddressListItem;
