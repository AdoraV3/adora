export interface FAQ {
  title: string;
  content: string;
  id: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface NavItem extends Option {
  href: string;
}
export interface ListItem {
  title: string;
  description: string;
  image: string;
}
