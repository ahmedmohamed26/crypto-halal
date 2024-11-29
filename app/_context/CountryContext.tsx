"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CountryContextProps {
  country: string;
  setCountry: (country: string) => void;
}

const CountryContext = createContext<CountryContextProps | undefined>(
  undefined
);

export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [country, setCountry] = useState<string>("Unknown");

  useEffect(() => {
    const getCountry = async () => {
      try {
        const locationData = await fetchLocationByIP();
        if (locationData) {
          const detectedCountry = locationData.country;
          localStorage.setItem("detectedCountry", detectedCountry);
          setCountry(detectedCountry);
        } else {
          setCountry("Unknown");
        }
      } catch (error) {
        console.error("Error getting country by IP:", error);
        setCountry("Unknown");
      }
    };

    getCountry();
  }, []);

  const fetchLocationByIP = async (): Promise<{
    lat: number;
    lon: number;
    country: string;
  } | null> => {
    try {
      const response = await fetch("https://ipwhois.app/json/");
      const data = await response.json();
      if (data.success) {
        return {
          lat: parseFloat(data.latitude),
          lon: parseFloat(data.longitude),
          country: data.country,
        };
      } else {
        console.error("Failed to fetch location data:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching location by IP:", error);
      return null;
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
