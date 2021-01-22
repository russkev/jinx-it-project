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

export type TSection = {
  id: Tuuid;
  name: string;
  type: ESectionType;
  index: number;
  border: boolean;
  text: string;
  image: TImage | null;
  video: string;
  page: Tuuid;
  links: TLink[];
}

export interface TSections {
  [pageId: string]: TSection[]
}

export type TSectionInfo = {
  pageId: Tuuid;
  section: TSection;
}

export type TLink = {
  id: Tuuid;
  name?: string;
  address?: string;
  icon?: number;
  number: number;
};

export type TImage = {
  id: Tuuid;
  name: string;
  path: string;
}

export type TDialog = {
  open: boolean;
  setOpen: any
}

export enum ESectionType {
  text = "text",
  image = "image",
  imageText = "image_text",
  video = "video",
  skeleton = "skeleton,"
}