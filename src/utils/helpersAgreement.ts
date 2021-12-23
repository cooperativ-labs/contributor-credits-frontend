import { ProjectUser } from 'types';

export type GenerateAgreementType = {
  organizationName: string;
  organizationLegalName: string;
  c2Address: string;
  bacName: string;
  bacAddress: string;
  triggerText: string;
  financingTriggerAmount: string;
  revenueTriggerAmount: string;
  chainName: string;
  triggerCurrency: string;
  signature: string;
  signerEmail: string;
  isNotMainnet: boolean;
  [key: string]: any;
};

export const generateAgreement = (props: GenerateAgreementType, legalText: string): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`\`${value[1]}\``), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

export const getSignatories = (projectUsers: ProjectUser[]) => {
  return projectUsers
    ?.map((user) => {
      return user.agreements.map((signatory) => {
        return signatory;
      });
    })
    .flat();
};
