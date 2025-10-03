"use client";
import React, { useState } from 'react';
import {Input, Button, Card, CardBody, CardHeader, Select, SelectItem} from "@heroui/react";

const loanTypes = [
  {key: "ihtiyac", label: "İhtiyaç Kredisi"},
  {key: "konut", label: "Konut Kredisi"},
  {key: "tasit", label: "Taşıt Kredisi"},
];

const currencies = [
    {key: "TRY", label: "₺ (TL)"},
    {key: "USD", label: "$ (USD)"},
    {key: "EUR", label: "€ (EUR)"},
];

const currencySymbols: { [key: string]: string } = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
};

const CreditPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');

  const handleCalculate = () => {
    const P = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate);
    const r = annualInterestRate / 100 / 12;
    const n = parseInt(loanTerm) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(M);
      setTotalPayment(M * n);
    } else {
      setMonthlyPayment(null);
      setTotalPayment(null);
    }
  };

  const symbol = currencySymbols[selectedCurrency];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Card className="p-4">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center">Kredi Hesaplama Aracı</h1>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Select
                label="Kredi Türü"
                placeholder="Bir kredi türü seçin"
                defaultSelectedKeys={["ihtiyac"]}
              >
                {loanTypes.map((type) => (
                  <SelectItem key={type.key}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex gap-2">
                <Input
                  type="number"
                  label="Kredi Tutarı"
                  placeholder="0.00"
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  startContent={
                    <Select
                      size="sm"
                      aria-label="Currency"
                      selectedKeys={[selectedCurrency]}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-24"
                    >
                      {currencies.map((currency) => (
                        <SelectItem key={currency.key}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </Select>
                  }
                />
              </div>

              <Input
                type="number"
                label="Yıllık Faiz Oranı"
                placeholder="0.00"
                value={interestRate}
                onValueChange={setInterestRate}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">%</span>
                  </div>
                }
              />

              <Input
                type="number"
                label="Vade (Yıl)"
                placeholder="Örn: 5"
                value={loanTerm}
                onValueChange={setLoanTerm}
              />

              <Button color="primary" onClick={handleCalculate} size="lg">
                Hesapla
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="md:w-1/2">
          {monthlyPayment !== null && totalPayment !== null && (
            <Card className="p-4 h-full">
              <CardHeader>
                <h2 className="text-2xl font-bold text-center">Hesaplama Sonuçları</h2>
              </CardHeader>
              <CardBody className="flex flex-col justify-center items-center gap-4">
                <div className="text-center">
                  <p className="text-lg text-default-500">Aylık Taksit</p>
                  <p className="text-4xl font-bold">{symbol}{monthlyPayment.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-default-500">Toplam Geri Ödeme</p>
                  <p className="text-4xl font-bold">{symbol}{totalPayment.toFixed(2)}</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditPage;