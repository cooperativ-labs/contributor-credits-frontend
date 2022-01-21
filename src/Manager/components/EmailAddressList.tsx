import React, { FC } from 'react';
import EmailAddressListItem from './EmailAddressListItem';
import { EmailAddress } from 'types';

type EmailAddressListProps = {
  emailAddresses: EmailAddress[];
  withEdit?: boolean;
};

const EmailAddressList: FC<EmailAddressListProps> = ({ emailAddresses, withEdit }) => {
  return (
    <div className="w-full">
      {emailAddresses.map((email, i) => {
        return (
          <div className="mb-3" key={i}>
            <EmailAddressListItem email={email} withEdit={withEdit} />
          </div>
        );
      })}
    </div>
  );
};

export default EmailAddressList;
