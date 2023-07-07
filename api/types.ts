export type InterfaceComic = {
  id: number;
  publisher: string;
  title: string;
  issue: string;
  year: string;
  writer: string;
  illustrator: string;
}

export type CategoryTable = {
  id: number;
  name: string;
}

export type NameFromID = {
  key: string;
  name: string;
}