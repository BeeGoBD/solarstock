import React, { useState } from 'react';
import { X, Calculator, Zap, Sun, BatteryCharging, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface SolarCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const SolarCalculatorModal: React.FC<SolarCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  allProducts
}) => {
  // Appliance counts
  const [fans, setFans] = useState(4); // 75W each
  const [lights, setLights] = useState(8); // 15W each
  const [tv, setTv] = useState(1); // 100W each
  const [fridge, setFridge] = useState(1); // 250W each
  const [ac1Ton, setAc1Ton] = useState(0); // 1100W
  const [ac1_5Ton, setAc1_5Ton] = useState(1); // 1600W
  const [computer, setComputer] = useState(1); // 150W
  const [backupHours, setBackupHours] = useState(6);

  if (!isOpen) return null;

  // Total Load calculation
  const totalWatts =
    fans * 75 +
    lights * 15 +
    tv * 100 +
    fridge * 250 +
    ac1Ton * 1100 +
    ac1_5Ton * 1600 +
    computer * 150;

  // Inverter Sizing (Watts / 0.8 power factor + 25% safety margin)
  const minInverterVA = Math.round((totalWatts / 0.8) * 1.25);

  // Recommended Battery Energy (Total Watts * Backup Hours / 0.85 depth of discharge)
  const requiredWattHours = Math.round((totalWatts * 0.7 * backupHours) / 0.85);

  // Recommended Solar Array (WattHours / 4.5 peak sun hours)
  const requiredSolarWatts = Math.round(requiredWattHours / 4.5);
  const required585WPanels = Math.max(2, Math.ceil(requiredSolarWatts / 585));

  // Find matching inverter in products
  const matchingInverter =
    totalWatts > 3000
      ? allProducts.find(p => p.id === 'prod-deye-8kw-hybrid' || p.id === 'prod-growatt-5000es') || allProducts[0]
      : totalWatts > 1500
      ? allProducts.find(p => p.id === 'prod-growatt-5000es') || allProducts[0]
      : allProducts.find(p => p.id === 'prod-luminous-nxg-1800') || allProducts[2];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-5 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-amber-400 text-neutral-950 rounded-xl flex items-center justify-center shadow-md shadow-amber-400/30">
            <Calculator className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
              Solar & IPS Load Calculator
            </h2>
            <p className="text-xs text-neutral-500">
              Calculate your exact electrical load and get instant solar system sizing.
            </p>
          </div>
        </div>

        {/* Appliances Stepper Grid */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-700">
            1. Select Home & Office Appliances:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Fans */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">Ceiling Fans (75W)</strong>
                <span className="text-[10px] text-neutral-500">{fans * 75} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFans(Math.max(0, fans - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{fans}</span>
                <button
                  type="button"
                  onClick={() => setFans(fans + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Lights */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">LED Lights (15W)</strong>
                <span className="text-[10px] text-neutral-500">{lights * 15} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLights(Math.max(0, lights - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{lights}</span>
                <button
                  type="button"
                  onClick={() => setLights(lights + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* 1.5 Ton AC */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">1.5 Ton Inverter AC (1600W)</strong>
                <span className="text-[10px] text-neutral-500">{ac1_5Ton * 1600} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAc1_5Ton(Math.max(0, ac1_5Ton - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{ac1_5Ton}</span>
                <button
                  type="button"
                  onClick={() => setAc1_5Ton(ac1_5Ton + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Refrigerator */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">Refrigerator / Deep Freeze (250W)</strong>
                <span className="text-[10px] text-neutral-500">{fridge * 250} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFridge(Math.max(0, fridge - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{fridge}</span>
                <button
                  type="button"
                  onClick={() => setFridge(fridge + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* LED TV */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">Smart LED TV (100W)</strong>
                <span className="text-[10px] text-neutral-500">{tv * 100} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTv(Math.max(0, tv - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{tv}</span>
                <button
                  type="button"
                  onClick={() => setTv(tv + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* PC / Router */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <strong className="block text-neutral-900">Desktop PC & WiFi Router (150W)</strong>
                <span className="text-[10px] text-neutral-500">{computer * 150} Watts</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setComputer(Math.max(0, computer - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold">{computer}</span>
                <button
                  type="button"
                  onClick={() => setComputer(computer + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desired Backup Hours Slider */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-6">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-neutral-700">Desired Backup Duration:</span>
            <span className="text-amber-700 font-extrabold bg-amber-100 px-2 py-0.5 rounded">
              {backupHours} Hours Backup
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            value={backupHours}
            onChange={(e) => setBackupHours(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Result Summary Box */}
        <div className="bg-gradient-to-r from-neutral-950 to-neutral-900 text-white rounded-2xl p-5 border border-neutral-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <div>
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block">
                TOTAL CONTINUOUS LOAD
              </span>
              <strong className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                {totalWatts.toLocaleString()} Watts
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase block">
                MINIMUM INVERTER CAPACITY
              </span>
              <strong className="text-xl font-bold text-amber-300">
                {(minInverterVA / 1000).toFixed(1)} kVA / {Math.ceil(totalWatts / 500) * 0.5} kW
              </strong>
            </div>
          </div>

          {/* Recommended System Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Zap className="w-4 h-4" />
                <span>Inverter Model</span>
              </div>
              <p className="text-neutral-200 font-semibold">
                {totalWatts > 3000 ? '5kW - 8kW Hybrid' : totalWatts > 1200 ? '5kW Pure Sine Wave' : '1500VA - 2500VA IPS'}
              </p>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <BatteryCharging className="w-4 h-4" />
                <span>Battery Pack</span>
              </div>
              <p className="text-neutral-200 font-semibold">
                {totalWatts > 1500 ? '51.2V 100Ah LiFePO4' : '2x 200Ah Tall Tubular'}
              </p>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold mb-1">
                <Sun className="w-4 h-4" />
                <span>Solar Array</span>
              </div>
              <p className="text-neutral-200 font-semibold">
                {required585WPanels}x 585W Bifacial Panels ({(required585WPanels * 0.585).toFixed(1)} kW)
              </p>
            </div>
          </div>

          {/* Direct Matching Product CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-neutral-300">
              Recommended Model: <strong className="text-amber-400">{matchingInverter.name}</strong>
            </div>
            <button
              onClick={() => {
                onSelectProduct(matchingInverter);
                onClose();
              }}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>View Recommended System</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
