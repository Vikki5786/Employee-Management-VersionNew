export interface City {
  name: string;
  code: string;
}

export interface State {
  name: string;
  code: string;
  cities: City[];
}

export interface Country {
  name: string;
  code: string;
  states: State[];
}
