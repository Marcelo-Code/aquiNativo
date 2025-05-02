export const CurrencyFormat = (currencyFormatProps) => {
  const { intPart, decimalPart, fontSize } = currencyFormatProps;
  return (
    <span>
      <span style={{ color: "gray" }}>$ </span>
      {intPart}
      <sup
        style={{ fontSize: `${fontSize}`, marginLeft: "2px", color: "gray" }}
      >
        {decimalPart}
      </sup>
    </span>
  );
};
