import axios from 'axios';

export type LegalText = string;

export const getText = async (): Promise<LegalText> =>
  await axios.get<LegalText>('/assets/cc-legal-language.md').then(resp => resp.data);
