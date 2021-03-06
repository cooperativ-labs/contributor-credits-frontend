import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
interface PresentLegalTextProps {
  agreement: string;
}

const PresentLegalText: FC<PresentLegalTextProps> = ({ agreement }) => {
  return (
    <div>
      <hr className="md:hidden border-1 border-gray-400 my-8" />
      <div className="prose text-sm md:text-base break-all md:break-normal">
        <ReactMarkdown source={agreement} />
      </div>
    </div>
  );
};

export default PresentLegalText;
