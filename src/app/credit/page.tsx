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
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md p-4">
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

            {monthlyPayment !== null && totalPayment !== null && (
                <div className="mt-4 p-4 bg-default-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Hesaplama Sonuçları</h2>
                    <div className="flex justify-between">
                        <p>Aylık Taksit:</p>
                        <p className="font-semibold">{symbol}{monthlyPayment.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p>Toplam Geri Ödeme:</p>
                        <p className="font-semibold">{symbol}{totalPayment.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CreditPage;