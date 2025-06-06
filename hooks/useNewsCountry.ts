import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

//function to toggle countries selected on the discover page
export const useNewsCountry = () => {
    const [newsCountries, setNewsCountries] = useState(CountryList)

    const toggleNewsCountry = useCallback((id: number) => {
        setNewsCountries((prevNewsCountries) => {
            return prevNewsCountries.map((item, index) => {
                if( index === id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }
                return item;
            })
        });
    }, []);
    return {
        newsCountries, toggleNewsCountry
    }
}