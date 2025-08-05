import { Country } from "./country";

export const countries: Country[] = [
  {
    name: 'India',
    code: 'IN',
    states: [
      {
        name: 'Tamil Nadu',
        code: 'TN',
        cities: [
          { name: 'Chennai', code: 'CHN' },
          { name: 'Coimbatore', code: 'CBE' }
        ]
      },
      {
        name: 'Karnataka',
        code: 'KA',
        cities: [
          { name: 'Bangalore', code: 'BLR' },
          { name: 'Mysore', code: 'MYS' }
        ]
      }
    ]
  },
  {
    name: 'USA',
    code: 'US',
    states: [
      {
        name: 'California',
        code: 'CA',
        cities: [
          { name: 'Los Angeles', code: 'LA' },
          { name: 'San Francisco', code: 'SF' }
        ]
      }
    ]
  }
];
