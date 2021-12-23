import { ContributorCreditClassTriggerType } from 'types';
import fileDownload from 'js-file-download';

export const GetClassTriggers = (triggerArray) => {
  const triggerFundraising = triggerArray.find((trigger) => {
    return trigger.type === ContributorCreditClassTriggerType.FundingRaised;
  });

  const triggerRevenue = triggerArray.find((trigger) => {
    return trigger.type === ContributorCreditClassTriggerType.RevenueEarned;
  });

  const triggerSale = triggerArray.find((trigger) => {
    return trigger.type === ContributorCreditClassTriggerType.Sale;
  });

  return { triggerFundraising, triggerRevenue, triggerSale };
};

export const GetSignatoriesFromAgreement = (agreement) => {
  return agreement.signatories.map((signatories) => {
    return signatories;
  });
};

export const GetProjectUsersFromSignatories = (signatories, projectUsers) => {
  return projectUsers.filter((projectUser) => {
    return signatories
      .map((signatory) => {
        return signatory.projectUser.id === projectUser.id ? projectUser : null;
      })
      .flat();
  });
};

export function DownloadFile(content: string, fileName: string) {
  fileDownload(content, fileName);
}
