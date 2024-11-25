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
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const detectedCountry = await fetchCountry(lat, lon);
            localStorage.setItem("detectedCountry", detectedCountry);
            setCountry(detectedCountry);
          },
          (error) => {
            console.error("Error getting user location:", error);
            setCountry("Unknown");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setCountry("Unknown");
      }
    };

    getCountry();
  }, []);

  const fetchCountry = async (lat: number, lon: number): Promise<string> => {
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await resp.json();

      return data?.address?.country ?? "Unknown";
    } catch (e) {
      return "Unknown";
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
