import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTenure) {
      alert("⚠️ Please fill in all the fields!");
      return;
    }
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      alert("⚠️ Please enter positive values!");
      return;
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanTenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emiValue * N;
    const totalInterestValue = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        minHeight: "100vh", // full screen
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-danger">
          💰 EMI Calculator
        </h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter Loan Amount"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            className="form-control"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter Interest Rate"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Loan Tenure (Months)</label>
          <input
            type="number"
            className="form-control"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="Enter Loan Tenure"
          />
        </div>

        <div className="d-grid mt-3">
          <button
            className="btn fw-semibold text-white"
            style={{
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
            }}
            onClick={calculateEMI}
          >
            Calculate EMI
          </button>
        </div>

        {emi && (
          <div
            className="card mt-4 border-0 shadow-sm"
            style={{
              borderRadius: "15px",
              background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            }}
          >
            <div className="card-body text-dark text-center">
              <h5 className="fw-bold text-white mb-3">📊 EMI Details</h5>
              <p className="text-white mb-1">
                <strong>Loan Amount:</strong> ₹{loanAmount}
              </p>
              <p className="text-white mb-1">
                <strong>Monthly EMI:</strong>{" "}
                <span style={{ color: "#000" }}>₹{emi}</span>
              </p>
              <p className="text-white mb-0">
                <strong>Total Interest:</strong>{" "}
                <span style={{ color: "#000" }}>₹{totalInterest}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
