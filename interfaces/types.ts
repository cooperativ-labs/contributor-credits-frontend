export interface ResultProps {
  result: {
    projects?: any;
    project?: any /** @TODO : Shape of Projects? */;
    users?: any /** @TODO : Shape of Projects? */;
  };
}

export interface CurrencyProps {
  amount: number;
  currency: string;
}
export interface ProjectProps {
  name: string /** @TODO : Shape of Projects? */;
  category: string;
  thumbnail: string;
  compensationOfferings: [
    {
      id: number;
      type: number;
      title: string;
      slug: string;
      trigger: string;
      description: string;
      primary: boolean;
    }
  ];
}

export interface DescriptionProps {
  excerpt: string;
  full: string;
}
