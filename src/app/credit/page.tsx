"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Card, CardBody, Select, SelectItem } from "@heroui/react";

// Farklı faiz oranlarına sahip sahte banka verileri
const bankOffers = [
  { name: "FinansPro Bank", interestRate: 3.59 },
  { name: "Kolay Kredi Bankası", interestRate: 3.75 },
  { name: "Gelecek Bank", interestRate: 4.10 },
  { name: "Hızlı Finans", interestRate: 4.25 },
];

// Hesaplanmış bir teklif için tür tanımı
interface CalculatedOffer {
  name: string;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
}

// 1'den 36'ya kadar olan kredi vadeleri için bir dizi oluştur
const loanTerms = Array.from({ length: 36 }, (_, i) => ({ key: (i + 1).toString(), label: `${i + 1} Ay` }));

const CreditPage = () => {
  const [loanAmount, setLoanAmount] = useState('50000');
  const [loanTerm, setLoanTerm] = useState('12'); // Varsayılan olarak 12 ay
  const [calculatedResults, setCalculatedResults] = useState<CalculatedOffer[]>([]);

  const handleCalculate = useCallback(() => {
    const P = parseFloat(loanAmount);
    const n = parseInt(loanTerm);

    if (P > 0 && n > 0) {
      const results = bankOffers.map(offer => {
        const r = offer.interestRate / 100 / 12; // Aylık faiz oranı
        // Aylık ödeme formülü
        const M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
        const totalPayment = M * n;
        return {
          ...offer,
          monthlyPayment: M,
          totalPayment: totalPayment,
        };
      });
      setCalculatedResults(results);
    } else {
      setCalculatedResults([]);
    }
  }, [loanAmount, loanTerm]);

  // Sayfa ilk yüklendiğinde otomatik olarak hesaplama yap
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="mb-8 p-4">
        <CardBody>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Input
              type="number"
              label="İhtiyaç Kredisi Tutarı"
              placeholder="Tutar girin"
              value={loanAmount}
              onValueChange={setLoanAmount}
              labelPlacement="outside"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₺</span>
                </div>
              }
            />
            <Select
              label="Vade"
              placeholder="Vade seçin"
              selectedKeys={[loanTerm]}
              onChange={(e) => setLoanTerm(e.target.value)}
              labelPlacement="outside"
              className="w-full md:w-64"
            >
              {loanTerms.map((term) => (
                <SelectItem key={term.key}>
                  {term.label}
                </SelectItem>
              ))}
            </Select>
            <Button color="primary" onClick={handleCalculate} size="lg" className="w-full md:w-auto">
              Yeniden Hesapla
            </Button>
          </div>
        </CardBody>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">{`${new Intl.NumberFormat('tr-TR').format(parseFloat(loanAmount))} TL ${loanTerm} Ay Vadeli İhtiyaç Kredileri`}</h2>
        <div className="grid gap-4">
          {calculatedResults.length > 0 ? (
            calculatedResults.map((offer, index) => (
              <Card key={index} className="p-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="flex items-center gap-4 md:col-span-1">
                    <div className="w-16 h-16 bg-default-200 rounded-md flex items-center justify-center">
                       <span className="text-sm font-bold text-center">{offer.name}</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <p className="text-sm text-default-500">Faiz Oranı</p>
                    <p className="font-bold text-lg">{`%${offer.interestRate.toFixed(2)}`}</p>
                  </div>

                  <div className="text-center md:text-left">
                    <p className="text-sm text-default-500">Aylık Taksit</p>
                    <p className="font-bold text-lg">{`${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(offer.monthlyPayment)}`}</p>
                  </div>

                  <div className="text-center md:text-left">
                    <p className="text-sm text-default-500">Toplam Ödeme</p>
                    <p className="font-bold text-lg">{`${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(offer.totalPayment)}`}</p>
                  </div>

                  <div className="flex justify-center md:justify-end md:col-span-1">
                    <Button as="a" href="#" color="primary" variant="solid">
                      Hemen Başvur
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>Lütfen bir tutar ve vade girerek hesaplama yapın.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditPage;