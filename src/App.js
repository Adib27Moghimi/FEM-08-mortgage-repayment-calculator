import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <RepaymentApp />
    </div>
  );
}

function RepaymentApp() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState("");
  const [repaymentType, setRepaymentType] = useState(true);
  const interestType = !repaymentType;
  const [inputsAreEmpty, setInputsAreEmpty] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loan = amount;
  const numMonths = term * 12;
  const rate = interest / 100 / 12;

  const monthlyRepayment = +(
    (loan * rate * Math.pow(1 + rate, numMonths)) /
    (Math.pow(1 + rate, numMonths) - 1)
  ).toFixed(2);
  const monthlyInterest = +(loan * rate).toFixed(2);
  const totalRepayment = +(monthlyRepayment * numMonths).toFixed(2);
  const totalInterest = +(totalRepayment - loan).toFixed(2);

  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  function handleSelectType() {
    setRepaymentType((checked) => !checked);
  }

  function handleCalculation(e) {
    e.preventDefault();

    !amount || !term || !interest ? setHasError(true) : setHasError(false);

    amount && term && interest
      ? setInputsAreEmpty(false)
      : setInputsAreEmpty(true);
  }

  function handleClear() {
    setAmount("");
    setTerm("");
    setInterest("");
    setRepaymentType(true);
    setInputsAreEmpty(true);
    setHasError(false);
  }

  return (
    <main className="repaymentApp">
      <MortgageCalculator
        amount={amount}
        setAmount={setAmount}
        term={term}
        setTerm={setTerm}
        interest={interest}
        setInterest={setInterest}
        repaymentType={repaymentType}
        interestType={interestType}
        onSelectType={handleSelectType}
        onCalculation={handleCalculation}
        hasError={hasError}
        onClear={handleClear}
      />
      <Results
        monthlyRepayment={monthlyRepayment}
        monthlyInterest={monthlyInterest}
        totalRepayment={totalRepayment}
        totalInterest={totalInterest}
        repaymentType={repaymentType}
        inputsAreEmpty={inputsAreEmpty}
      />
    </main>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

function Input({
  children,
  htmlFor,
  id,
  type,
  placeholder,
  value,
  onChange,
  hasError,
}) {
  return (
    <>
      <label htmlFor={htmlFor}>{children}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hasError && !value && <span>This field is required</span>}
    </>
  );
}

function InputRadio({ children, htmlFor, id, type, name, checked, onChange }) {
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
}

function MortgageCalculator({
  amount,
  setAmount,
  term,
  setTerm,
  interest,
  setInterest,
  repaymentType,
  interestType,
  onSelectType,
  onCalculation,
  hasError,
  onClear,
}) {
  return (
    <form className="mortgageCalculator" onSubmit={onCalculation}>
      <h2 className="title">Mortgage Calculator</h2>
      <span className="clear" onClick={onClear}>
        Clear All
      </span>
      <Input
        htmlFor={"Mortgage-Amount"}
        type={"number"}
        id={"Mortgage-Amount"}
        placeholder={"£"}
        value={amount}
        onChange={(e) => setAmount(+e.target.value >= 1 ? +e.target.value : "")}
        hasError={hasError}
      >
        {"Mortgage Amount"}
      </Input>
      <Input
        htmlFor={"Mortgage-Term"}
        type={"number"}
        id={"Mortgage-Term"}
        placeholder={"Years"}
        value={term}
        onChange={(e) => setTerm(+e.target.value >= 1 ? +e.target.value : "")}
        hasError={hasError}
      >
        {"Mortgage Term"}
      </Input>
      <Input
        htmlFor={"Interest-Rate"}
        type={"number"}
        id={"Interest-Rate"}
        placeholder={"%"}
        value={interest}
        onChange={(e) =>
          setInterest(
            +e.target.value > 0 && +e.target.value <= 100 ? +e.target.value : ""
          )
        }
        hasError={hasError}
      >
        {"Interest Rate"}
      </Input>
      <span>Mortgage Type</span>
      <InputRadio
        htmlFor={"Repayment"}
        type={"radio"}
        id={"Repayment"}
        name={"Mortgage-Type"}
        checked={repaymentType}
        onChange={onSelectType}
      >
        {"Repayment"}
      </InputRadio>
      <InputRadio
        htmlFor={"Interest-Only"}
        type={"radio"}
        id={"Interest-Only"}
        name={"Mortgage-Type"}
        checked={interestType}
        onChange={onSelectType}
      >
        {"Interest Only"}
      </InputRadio>
      <Button>
        <img src="./icon-calculator.svg" alt="icon-calculator" />
        {"Calculate Repayments"}
      </Button>
    </form>
  );
}

function Results({
  monthlyRepayment,
  monthlyInterest,
  totalRepayment,
  totalInterest,
  repaymentType,
  inputsAreEmpty,
}) {
  return (
    <>
      {inputsAreEmpty ? (
        <HiddenResult />
      ) : (
        <VisibleResult
          monthlyRepayment={monthlyRepayment}
          monthlyInterest={monthlyInterest}
          totalRepayment={totalRepayment}
          totalInterest={totalInterest}
          repaymentType={repaymentType}
        />
      )}
    </>
  );
}

function HiddenResult() {
  return (
    <div className="HiddenResult">
      <img
        className="illustration"
        src="./illustration-empty.svg"
        alt="illustration-empty"
      />
      <h2 className="title">Results shown here</h2>
      <p className="text">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

function VisibleResult({
  monthlyRepayment,
  monthlyInterest,
  totalRepayment,
  totalInterest,
  repaymentType,
}) {
  return (
    <div className="VisibleResult">
      <h3 className="title">Your results</h3>
      <p className="text">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <section className="wrap-monthly-repayments">
        <span className="title">Your monthly repayments</span>
        <span className="monthly-repayments">
          {(repaymentType ? monthlyRepayment : monthlyInterest) || "---"}
        </span>
        <span className="title">Total you'll repay over the term</span>
        <span className="total-repayments">
          {(repaymentType ? totalRepayment : totalInterest) || "---"}
        </span>
      </section>
    </div>
  );
}
