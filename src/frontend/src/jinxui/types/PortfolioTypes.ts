/* Prefix all custom types with T to avoid possible name conflicts 
   with variables and components. Should be OK to not do this for prop 
   types defined within your file */

// export type Tuuid = `${string}-${string}-${string}-${string}-${string}`
export type Tuuid = string

export type TPortfolio = {
  id: Tuuid;
  owner: number;
  name: string;
  subtitle: string;
  pages: Tuuid[];
  links: TLink[];
  private: boolean;
  theme: string;
  background: string;
};

export type TPage = {
  id: Tuuid;
  name: string;
  index: number;
  sections: TSection[];
  isNew?: boolean;
  toDelete?: boolean;
};

export interface TEditPage extends TPage {
  uid: string;
  isNew: boolean;
}

// export type TSectionData = {
//   name: string;
//   content: string;
//   media?: string;
//   image?: number | null;
//   path?: string;
//   alt?: string;
// };

// export interface TSection extends TSectionData {
//   id?: number;
//   type: string;
//   number: number;
// }

export type TSection = {
  id: Tuuid;
  name: string;
  type: string;
  index: number;
  text?: string;
  page: Tuuid;
  links: TLink[];
}

// export interface TEditSection extends TSection {
//   uid?: string
//   links: TLink[]
// };

// export interface TSendSection extends TSection {
//   links: TSectionLink[]
// }

export interface TSections {
  [pageId: string]: TSection[]
}

export type TPortfolioData = {
  name: string;
  number?: number;
};

export type TPageData = {
  name: string;
  number?: number;
};



export type TLink = {
  id: Tuuid;
  name?: string;
  address?: string;
  icon?: number;
  number: number;
};

export type TPageLink = {
  page: number;
  link: TLink;
}

export type TSectionLink = {
  section: number;
  link: TLink;
}

