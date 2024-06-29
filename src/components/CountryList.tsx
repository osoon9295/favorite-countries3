import React, { useEffect, useState } from "react";
import { getCountries } from "../api/countries.api";
import CountryItem from "./CountryItem";
import uuid from "react-uuid";
import { Country } from "../types/country";
import { OrganizedCountry } from "../types/organizedCountry";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<OrganizedCountry[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchData: Country[] = await getCountries();
        const countryData: OrganizedCountry[] = fetchData.map((country) => {
          return {
            id: uuid(),
            title: country.name.common,
            name: country.name.official,
            flags: country.flags.svg,
            isLike: false,
          };
        });
        setCountries(countryData);
        console.log(fetchData);
      } catch (error) {
        alert(error);
      }
    };
    fetchCountries();
  }, []);

  console.log(countries);

  return (
    <div>
      <h2>my favorite countries</h2>
      <ul className="grid list-none grid-cols-4 gap-2">
        {countries
          .filter((country: OrganizedCountry) => !!country.isLike)
          .map((country: OrganizedCountry) => (
            <CountryItem
              country={country}
              key={country.id}
              countries={countries}
              setCountries={setCountries}
            />
          ))}
      </ul>
      <h2>지구촌</h2>
      <ul className="grid list-none grid-cols-4 gap-2">
        {countries
          .filter((country: OrganizedCountry) => !country.isLike)
          .map((country: OrganizedCountry) => (
            <CountryItem
              country={country}
              key={country.id}
              countries={countries}
              setCountries={setCountries}
            />
          ))}
      </ul>
    </div>
  );
};

export default CountryList;
