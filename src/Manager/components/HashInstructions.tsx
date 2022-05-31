import React, { FC, useState } from 'react';
import StandardButton from './buttons/StandardButton';
import { C2Type } from '@src/web3/hooks/useC2';
import { C3Type } from '@src/web3/hooks/useC3';
import { DownloadFile } from '@src/utils/helpersCCClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HashInstructionsProps = {
  cc: { c2: C2Type; c3: C3Type };
  agreementText: string;
};

const HashInstructions: FC<HashInstructionsProps> = ({ cc, agreementText }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const c2 = cc.c2;
  const c3 = cc.c3;

  if (!c2 && !c3) {
    return <></>;
  }

  const hash = c2 ? c2.info.agreementHash : c3.info.agreementHash;

  return (
    <div className="p-3 border-2 border-cLightBlue bg-gray-100 rounded-md">
      <StandardButton
        className="mt-1 mb-4"
        outlined
        link=""
        color="blue"
        text="Download Agreement Text"
        onClick={() => DownloadFile(agreementText, 'agreement-text.md')}
      />
      <span className="mb-1 mr-2">
        Agreement Hash: {hash?.slice(2, 7)}...{hash?.slice(-8)}
      </span>
      <span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          {copied ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="copy" />}
        </button>
      </span>

      <div className="text-sm text-gray-700">
        The agreement hash lets you verify that the agreement text is exactly the text associated with this class of
        Contributor Credits
      </div>
      <div className="text-sm font-bold">
        Download the agreement text above,{' '}
        <a href="https://emn178.github.io/online-tools/sha256_checksum.html" target="_blank" rel="noreferrer">
          <span className="underline">then upload it here to check the hash</span>
        </a>
        .
      </div>
    </div>
  );
};

export default HashInstructions;
