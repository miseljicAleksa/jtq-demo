import React from "react";

interface StatItemProps {
  label: string;
  value: number | null | undefined;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
  <div className="stat-item">
    <p className="stat-label">{label}</p>
    <p className="stat-value">
      {value !== null && value !== undefined
        ? `${(value - 273.15).toFixed(1)} °C`
        : "N/A"}
    </p>
  </div>
);

export default StatItem;
