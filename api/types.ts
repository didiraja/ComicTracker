export type InterfaceComic = {
  id: number;
  publisher_id: number;
  title: string;
  issue: number;
  year: number;
  writer_id: number;
  illustrator_id: number;
}

export type CategoryTable = {
  id: number;
  name: string;
}

export type NameFromID = {
  key: string;
  name: string;
}