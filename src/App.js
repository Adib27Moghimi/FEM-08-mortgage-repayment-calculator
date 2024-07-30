import { Fragment } from "react/jsx-runtime";

export default function App() {
  return (
    <div className="App">
      <RepaymentApp />
    </div>
  );
}

function RepaymentApp() {
  return (
    <main className="repaymentApp">
      <MortgageCalculator />
      <Results />
    </main>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

function Input({ children, htmlFor, id, type, placeholder }) {
  return (
    <>
      <label htmlFor={htmlFor}>{children}</label>
      <input type={type} id={id} placeholder={placeholder} />
    </>
  );
}

function InputRadio({ children, htmlFor, id, type, name }) {
  return (
    <div>
      <input type={type} id={id} name={name} />
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
}

function MortgageCalculator() {
  return (
    <form className="mortgageCalculator">
      <h2 className="title">Mortgage Calculator</h2>
      <span className="clear">Clear All</span>

      <Input
        htmlFor={"Mortgage-Amount"}
        type={"text"}
        id={"Mortgage-Amount"}
        placeholder={"£"}
      >
        {"Mortgage Amount"}
      </Input>

      <Input
        htmlFor={"Mortgage-Term"}
        type={"text"}
        id={"Mortgage-Term"}
        placeholder={"Years"}
      >
        {"Mortgage Term"}
      </Input>

      <Input
        htmlFor={"Interest-Rate"}
        type={"text"}
        id={"Interest-Rate"}
        placeholder={"%"}
      >
        {"Interest Rate"}
      </Input>

      <span>Mortgage Type</span>

      <InputRadio
        htmlFor={"Repayment"}
        type={"radio"}
        id={"Repayment"}
        name={"Mortgage-Type"}
      >
        {"Repayment"}
      </InputRadio>

      <InputRadio
        htmlFor={"Interest-Only"}
        type={"radio"}
        id={"Interest-Only"}
        name={"Mortgage-Type"}
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

function Results() {
  return (
    <>
      <HiddenResult />
      <VisibleResult />
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

function VisibleResult() {
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
        <span className="monthly-repayments">X</span>
        <span className="title">Total you'll repay over the term</span>
        <span className="total-repayments">Y</span>
      </section>
    </div>
  );
}
