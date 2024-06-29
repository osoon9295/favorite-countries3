import React from "react";
import { OrganizedCountry } from "../types/organizedCountry";

interface CountryCardProps {
  country: OrganizedCountry;
  countries: OrganizedCountry[];
  setCountries: (countries: OrganizedCountry[]) => void;
}

const CountryItem: React.FC<CountryCardProps> = ({
  country,
  countries,
  setCountries,
}) => {
  const { id, title, name, flags } = country;

  const handleChangeIsLike = (id: string): void => {
    const isLikeCountries = countries.map((country: OrganizedCountry) =>
      country.id === id ? { ...country, isLike: !country.isLike } : country,
    );
    setCountries(isLikeCountries);
  };

  return (
    <div>
      <li className="border" onClick={() => handleChangeIsLike(id)}>
        <img src={flags} className="w-20" alt={`Flag of ${name}`} />
        <h2>{title}</h2>
        <div>{name}</div>
      </li>
    </div>
  );
};

export default CountryItem;
