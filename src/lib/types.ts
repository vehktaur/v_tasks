export type Column = {
  id: string;
  title: string;
  placeholder: string;
};

export type ImageFile = {
  image?: File;
  preview?: string;
  url: string;
  size?: string;
  name?: string;
};
