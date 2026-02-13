import { Header, Select } from "@/components";
import { usePositions } from "@/hooks";
import bgImage from "@assets/bg.png";
import { useState } from "react";
import "./homePage.scss";

export const HomePage = () => {
  const [value, setValue] = useState<string | null>(null);
  const { positions, loading, status, scan } = usePositions();

  const selectOptions = [
    { label: "Ethereum", value: "eth" },
    { label: "Bitcoin", value: "btc" },
    { label: "Solana", value: "sol" },
  ];

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="c-page">
      <img src={bgImage} alt="Background" className="c-page-background" />
      <div className="c-container">
        <Header />
        <Select
          options={selectOptions}
          label="Collateral Type:"
          value={value}
          onChange={(selectedValue) => handleValueChange(selectedValue)}
        />
      </div>
    </div>
  );
};
