import React, { FC } from 'react';

type MailtoLinkProps = {
  text: string;
  email: string;
  className?: string;
};

const MailtoLink: FC<MailtoLinkProps> = ({ text, email, className }) => {
  return (
    <span className={className}>
      <a href={`mailto:${email}`}>{text}</a>
    </span>
  );
};

export default MailtoLink;
