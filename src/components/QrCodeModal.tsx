import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  X, 
  Printer, 
  Camera, 
  Check, 
  Box, 
  Sparkles, 
  Search, 
  RefreshCw, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Download, 
  Copy, 
  CheckCircle2, 
  Upload, 
  SwitchCamera, 
  Tag, 
  Layers, 
  Maximize2,
  Calendar,
  MapPin,
  Crown,
  ClipboardList,
  Utensils,
  Bell,
  Plus
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Hive, BeeSpecies } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  hive?: Hive | null;
  hives: Hive[];
  speciesList: BeeSpecies[];
  onSelectHiveFromScan: (hiveId: string) => void;
  onNavigateToInspection?: (hiveId: string) => void;
  onNavigateToFeeding?: (hiveId: string) => void;
  onNavigateToReminder?: (hiveId: string) => void;
  onOpenAddHiveWithCode?: (code: string) => void;
}

type TagSize = 'mini' | 'standard' | 'large';

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  hive,
  hives,
  speciesList,
  onSelectHiveFromScan,
  onNavigateToInspection,
  onNavigateToFeeding,
  onNavigateToReminder,
  onOpenAddHiveWithCode,
}) => {
  const [activeTab, setActiveTab] = useState<'tag' | 'scanner' | 'batch'>('tag');
  
  // Tag Generator States
  const [selectedHiveId, setSelectedHiveId] = useState<string>('custom');
  const [tagSize, setTagSize] = useState<TagSize>('standard');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  // Custom Tag Form State
  const [customCode, setCustomCode] = useState('JAT-01');
  const [customSpeciesId, setCustomSpeciesId] = useState(speciesList[0]?.id || 'jatai');
  const [customBoxModel, setCustomBoxModel] = useState('INPA');
  const [customMeliponaryName, setCustomMeliponaryName] = useState('Meu Meliponário');
  const [customInstallDate, setCustomInstallDate] = useState(new Date().toISOString().split('T')[0]);

  // Batch Print States
  const [selectedHiveIdsForBatch, setSelectedHiveIdsForBatch] = useState<string[]>([]);

  // Camera Scanner States
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [scannedHive, setScannedHive] = useState<Hive | null>(null);
  const [scannedNotFoundCode, setScannedNotFoundCode] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const tagCardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync initial selected hive or default
  useEffect(() => {
    if (hive) {
      setSelectedHiveId(hive.id);
      setIsCustomMode(false);
    } else if (hives.length > 0) {
      setSelectedHiveId(hives[0].id);
      setIsCustomMode(false);
    } else {
      setIsCustomMode(true);
      setSelectedHiveId('custom');
    }
  }, [hive, hives, isOpen]);

  // Sync batch selection to all hives initially
  useEffect(() => {
    if (hives.length > 0) {
      setSelectedHiveIdsForBatch(hives.map(h => h.id));
    }
  }, [hives]);

  // Determine current hive data for Tag tab
  const currentHive = hives.find((h) => h.id === selectedHiveId);
  const currentSpecies = isCustomMode || !currentHive
    ? speciesList.find((s) => s.id === customSpeciesId) || speciesList[0]
    : speciesList.find((s) => s.id === currentHive.speciesId) || speciesList[0];

  const activeTagCode = isCustomMode || !currentHive ? customCode : currentHive.code;
  const activeTagBox = isCustomMode || !currentHive ? customBoxModel : currentHive.boxModel;
  const activeTagDate = isCustomMode || !currentHive ? customInstallDate : currentHive.installationDate;
  const activeTagMeliponary = isCustomMode || !currentHive ? customMeliponaryName : 'Meliponário ASF';

  // Standard encoded payload
  const qrPayload = isCustomMode || !currentHive
    ? `MELIAPP:HIVE:${activeTagCode}:custom`
    : `MELIAPP:HIVE:${currentHive.code}:${currentHive.id}`;

  // Robust QR Decoder Parser
  const parseQrTextAndMatch = (rawText: string) => {
    const clean = rawText.trim();
    if (!clean) return;

    let targetCode = clean;
    let targetId = clean;

    // Pattern 1: MELIAPP:HIVE:CODE:ID
    if (clean.startsWith('MELIAPP:HIVE:')) {
      const parts = clean.split(':');
      if (parts.length >= 3) {
        targetCode = parts[2];
      }
      if (parts.length >= 4) {
        targetId = parts[3];
      }
    } 
    // Pattern 2: HIVE:CODE
    else if (clean.startsWith('HIVE:')) {
      targetCode = clean.replace('HIVE:', '').trim();
    }
    // Pattern 3: URL params like ?hive=JAT-01 or ?id=...
    else if (clean.includes('?')) {
      try {
        const url = new URL(clean);
        targetCode = url.searchParams.get('hive') || url.searchParams.get('code') || targetCode;
        targetId = url.searchParams.get('id') || targetId;
      } catch {
        // Not a standard URL, keep raw
      }
    }

    const cleanCodeLower = targetCode.toLowerCase().trim();
    const cleanIdLower = targetId.toLowerCase().trim();

    // Match against current hives list
    const found = hives.find(h => 
      h.id.toLowerCase() === cleanIdLower ||
      h.code.toLowerCase() === cleanCodeLower ||
      (h.qrCodeId && h.qrCodeId.toLowerCase() === cleanIdLower) ||
      (h.qrCodeId && h.qrCodeId.toLowerCase() === cleanCodeLower) ||
      h.code.toLowerCase() === clean.toLowerCase()
    );

    if (found) {
      setScannedHive(found);
      setScannedNotFoundCode(null);
      setCameraError(null);
    } else {
      setScannedHive(null);
      setScannedNotFoundCode(targetCode || clean);
      setCameraError(`Código "${targetCode || clean}" decodificado, mas nenhuma caixa foi encontrada no seu meliponário.`);
    }
  };

  // Camera Lifecycle with Html5Qrcode
  const stopCameraScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn('Error stopping QR scanner:', err);
      } finally {
        html5QrCodeRef.current = null;
        setCameraActive(false);
      }
    }
  };

  const startCameraScanner = async (facing: 'environment' | 'user') => {
    await stopCameraScanner();
    setCameraError(null);

    const readerElement = document.getElementById('meli-qr-reader');
    if (!readerElement) return;

    try {
      const html5QrCode = new Html5Qrcode('meli-qr-reader', {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });

      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 220, height: 220 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: facing },
        config,
        (decodedText) => {
          parseQrTextAndMatch(decodedText);
        },
        () => {
          // Frame read non-critical error (silent)
        }
      );

      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera start error:', err);
      setCameraActive(false);
      setCameraError(
        'Não foi possível acessar a câmera de vídeo ao vivo (permissão recusada ou ambiente sem HTTPS). Use o botão "Tirar Foto / Carregar da Galeria" abaixo ou faça a busca manual.'
      );
    }
  };

  // Effect to start/stop camera on tab change or modal open
  useEffect(() => {
    if (isOpen && activeTab === 'scanner') {
      const timer = setTimeout(() => {
        startCameraScanner(cameraFacing);
      }, 250);
      return () => {
        clearTimeout(timer);
        stopCameraScanner();
      };
    } else {
      stopCameraScanner();
    }
  }, [isOpen, activeTab, cameraFacing]);

  // Handle Photo file upload / Snap photo from camera
  const handleFileScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setCameraError(null);

    try {
      // Create temporary scanner instance for file scanning
      const tempScanner = new Html5Qrcode('meli-qr-reader-file-temp', {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });

      const decodedText = await tempScanner.scanFile(file, false);
      tempScanner.clear();
      parseQrTextAndMatch(decodedText);
    } catch (err) {
      console.warn('File decode error:', err);
      setCameraError('Não foi possível ler um QR Code nítido nesta imagem. Certifique-se de que a foto esteja bem iluminada e enquadrada.');
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleToggleCameraFacing = () => {
    const newFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(newFacing);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleDownloadPng = () => {
    const svgElement = document.getElementById('tag-svg-qrcode');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // High resolution canvas (300 DPI sticker quality)
    const scale = 3;
    const width = 360 * scale;
    const height = 240 * scale;

    canvas.width = width;
    canvas.height = height;

    if (!ctx) return;

    // Draw background card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Outer border
    ctx.strokeStyle = '#064e3b';
    ctx.lineWidth = 6 * scale;
    ctx.strokeRect(6 * scale, 6 * scale, width - 12 * scale, height - 12 * scale);

    // Inner header bar
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(10 * scale, 10 * scale, width - 20 * scale, 28 * scale);

    ctx.fillStyle = '#fbbf24';
    ctx.font = `bold ${11 * scale}px sans-serif`;
    ctx.fillText('MELIAPP • GESTÃO DE MELIPONÁRIO', 20 * scale, 28 * scale);

    // Left info
    ctx.fillStyle = '#064e3b';
    ctx.font = `900 ${32 * scale}px monospace`;
    ctx.fillText(activeTagCode, 20 * scale, 75 * scale);

    ctx.fillStyle = '#1c1917';
    ctx.font = `bold ${14 * scale}px sans-serif`;
    ctx.fillText(currentSpecies?.popularName || 'Abelha Nativa', 20 * scale, 102 * scale);

    ctx.fillStyle = '#78716c';
    ctx.font = `italic ${10 * scale}px sans-serif`;
    ctx.fillText(currentSpecies?.scientificName || '', 20 * scale, 118 * scale);

    ctx.fillStyle = '#292524';
    ctx.font = `bold ${10 * scale}px sans-serif`;
    ctx.fillText(`Modelo: ${activeTagBox}`, 20 * scale, 150 * scale);
    ctx.fillText(`Instalação: ${activeTagDate}`, 20 * scale, 168 * scale);
    ctx.fillText(`Local: ${activeTagMeliponary}`, 20 * scale, 186 * scale);

    // Render SVG QR Code into Image
    img.onload = () => {
      ctx.drawImage(img, (width - 150 * scale), (45 * scale), 130 * scale, 130 * scale);
      
      // QR caption
      ctx.fillStyle = '#064e3b';
      ctx.font = `bold ${9 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(activeTagCode, width - 85 * scale, 190 * scale);

      const link = document.createElement('a');
      link.download = `tag-colmeia-${activeTagCode.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleBatchSelectAll = () => {
    if (selectedHiveIdsForBatch.length === hives.length) {
      setSelectedHiveIdsForBatch([]);
    } else {
      setSelectedHiveIdsForBatch(hives.map(h => h.id));
    }
  };

  const toggleBatchHive = (id: string) => {
    if (selectedHiveIdsForBatch.includes(id)) {
      setSelectedHiveIdsForBatch(selectedHiveIdsForBatch.filter(item => item !== id));
    } else {
      setSelectedHiveIdsForBatch([...selectedHiveIdsForBatch, id]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      
      {/* Hidden temporary div for file scanning */}
      <div id="meli-qr-reader-file-temp" className="hidden"></div>

      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-stone-200 my-auto print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* Modal Header (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg font-serif text-stone-900 leading-tight">
                Gerador de Tag QR & Scanner
              </h2>
              <p className="text-[11px] text-stone-500">
                Etiquetas escaneáveis para colmeias e leitor de campo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Hidden on Print) */}
        <div className="flex space-x-1.5 bg-stone-100 p-1.5 rounded-2xl text-xs font-bold print:hidden">
          <button
            onClick={() => setActiveTab('tag')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'tag'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Etiqueta QR</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Scanner no Campo</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'batch'
                ? 'bg-amber-900 text-amber-100 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Impressão em Lote</span>
          </button>
        </div>

        {/* ================= TAB 1: ETIQUETA QR INDIVIDUAL ================= */}
        {activeTab === 'tag' && (
          <div className="space-y-4 text-xs">
            
            {/* Selection Toolbar (Existing Hive vs Custom) */}
            <div className="space-y-2.5 print:hidden">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-800">Origem dos Dados da Etiqueta:</label>
                <div className="flex items-center space-x-1 bg-stone-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode(false);
                      if (hives.length > 0 && selectedHiveId === 'custom') {
                        setSelectedHiveId(hives[0].id);
                      }
                    }}
                    disabled={hives.length === 0}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      !isCustomMode && hives.length > 0
                        ? 'bg-white text-emerald-950 shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800 disabled:opacity-40'
                    }`}
                  >
                    Colmeia Cadastrada ({hives.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode(true);
                      setSelectedHiveId('custom');
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      isCustomMode
                        ? 'bg-amber-400 text-emerald-950 shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    + Tag Personalizada
                  </button>
                </div>
              </div>

              {!isCustomMode && hives.length > 0 ? (
                <div>
                  <select
                    value={selectedHiveId}
                    onChange={(e) => setSelectedHiveId(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl p-2.5 font-bold text-stone-900 bg-stone-50 focus:ring-2 focus:ring-amber-500"
                  >
                    {hives.map((h) => {
                      const sp = speciesList.find((s) => s.id === h.speciesId);
                      return (
                        <option key={h.id} value={h.id}>
                          {h.code} • {sp?.popularName || 'Sem espécie'} ({h.boxModel})
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : (
                /* Custom Tag Quick Inputs */
                <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Código da Caixa *</label>
                      <input
                        type="text"
                        value={customCode}
                        onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                        placeholder="Ex: JAT-01"
                        className="w-full border border-stone-300 rounded-xl p-2 font-mono uppercase font-bold text-stone-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Espécie de Abelha</label>
                      <select
                        value={customSpeciesId}
                        onChange={(e) => setCustomSpeciesId(e.target.value)}
                        className="w-full border border-stone-300 rounded-xl p-2 text-stone-900 bg-white font-medium"
                      >
                        {speciesList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.popularName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Modelo de Caixa</label>
                      <input
                        type="text"
                        value={customBoxModel}
                        onChange={(e) => setCustomBoxModel(e.target.value)}
                        placeholder="Ex: INPA 15x15"
                        className="w-full border border-stone-300 rounded-xl p-2 text-stone-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">Nome do Meliponário</label>
                      <input
                        type="text"
                        value={customMeliponaryName}
                        onChange={(e) => setCustomMeliponaryName(e.target.value)}
                        placeholder="Ex: Meliponário Sítio Verde"
                        className="w-full border border-stone-300 rounded-xl p-2 text-stone-900 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tag Size Selector */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="font-semibold text-stone-600">Formato / Dimensão:</span>
                <div className="flex space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setTagSize('mini')}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      tagSize === 'mini'
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Mini (5x3,5 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTagSize('standard')}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      tagSize === 'standard'
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Padrão (8x5 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTagSize('large')}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      tagSize === 'large'
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Grande (11x7 cm)
                  </button>
                </div>
              </div>
            </div>

            {/* PRINTABLE REAL TAG PREVIEW CARD */}
            <div 
              ref={tagCardRef}
              id="printable-single-tag"
              className={`border-3 border-emerald-950 rounded-2xl bg-white shadow-md space-y-2.5 text-stone-900 print:border-2 print:border-black print:shadow-none print:my-0 ${
                tagSize === 'mini' ? 'p-3 max-w-xs mx-auto' : tagSize === 'large' ? 'p-6' : 'p-4 sm:p-5'
              }`}
            >
              {/* Header Bar of Tag */}
              <div className="bg-emerald-950 text-amber-300 px-3 py-1 rounded-xl flex items-center justify-between text-[10px] font-black tracking-wider uppercase">
                <span>MeliApp • Tag QR ASF</span>
                <span className="text-[9px] text-emerald-300 font-mono">{activeTagBox}</span>
              </div>

              {/* Main Content: Info on Left + Scannable QR on Right */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-950 leading-none">
                    {activeTagCode}
                  </div>
                  <p className="font-bold text-xs sm:text-sm text-stone-900 leading-snug truncate">
                    {currentSpecies?.popularName}
                  </p>
                  <p className="text-[10px] text-stone-500 italic font-mono truncate">
                    {currentSpecies?.scientificName}
                  </p>

                  <div className="pt-2 text-[10px] text-stone-600 space-y-0.5">
                    <p><strong className="text-stone-800">Local:</strong> {activeTagMeliponary}</p>
                    <p><strong className="text-stone-800">Instalação:</strong> {activeTagDate}</p>
                  </div>
                </div>

                {/* Scannable SVG QR Code */}
                <div className="bg-white p-2 rounded-xl border-2 border-emerald-900 shadow-2xs flex flex-col items-center shrink-0">
                  <QRCodeSVG
                    id="tag-svg-qrcode"
                    value={qrPayload}
                    size={tagSize === 'mini' ? 80 : tagSize === 'large' ? 120 : 100}
                    bgColor="#ffffff"
                    fgColor="#064e3b"
                    level="H"
                    marginSize={1}
                  />
                  <span className="text-[9px] font-mono font-black text-emerald-950 mt-0.5 tracking-wider">
                    {activeTagCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Tag Action Buttons (Print & Download PNG) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Imprimir Etiqueta</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-950" />
                <span>Baixar Imagem PNG</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100 print:hidden">
              <span className="font-mono text-[10px] truncate max-w-[280px]">
                Payload: {qrPayload}
              </span>
              <button
                type="button"
                onClick={handleCopyPayload}
                className="text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 cursor-pointer shrink-0"
              >
                {copiedPayload ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* ================= TAB 2: LIVE CAMERA SCANNER & IMAGE READER ================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-4 text-xs">
            
            {/* Live Camera Viewport */}
            <div className="bg-stone-950 text-stone-100 p-3 sm:p-4 rounded-2xl overflow-hidden relative shadow-inner flex flex-col items-center">
              
              <div 
                id="meli-qr-reader" 
                className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-stone-900 relative shadow-md"
              ></div>

              {/* Camera Controls Bar */}
              <div className="flex items-center justify-between w-full max-w-[320px] pt-3 px-1">
                <span className="text-[11px] text-stone-400 flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                  <span>{cameraActive ? 'Câmera Ativa' : 'Aguardando Câmera...'}</span>
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleToggleCameraFacing}
                    className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[11px] flex items-center space-x-1 cursor-pointer"
                    title="Alternar Câmera Frontal / Traseira"
                  >
                    <SwitchCamera className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Virar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => startCameraScanner(cameraFacing)}
                    className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[11px] flex items-center space-x-1 cursor-pointer"
                    title="Reiniciar Câmera"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Recarregar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Capture / Gallery Button (Works 100% on Mobile / Iframes) */}
            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="text-center sm:text-left">
                <span className="font-bold text-emerald-950 text-xs block">
                  Foto Direta da Câmera ou Galeria
                </span>
                <p className="text-[11px] text-emerald-800">
                  Fotografe a etiqueta na caixa com o celular para leitura imediata.
                </p>
              </div>

              <label className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer shrink-0 transition-all">
                <Upload className="w-4 h-4 text-amber-300" />
                <span>{isProcessingFile ? 'Lendo Foto...' : 'Tirar Foto / Carregar'}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileScan}
                  disabled={isProcessingFile}
                  className="hidden"
                />
              </label>
            </div>

            {/* Manual Code Input & Quick Simulator */}
            <div className="space-y-2">
              <label className="block font-bold text-stone-700">Digite o código ou teste com um clique:</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ex: JAT-01 ou MAN-02"
                  value={manualCodeInput}
                  onChange={(e) => setManualCodeInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      parseQrTextAndMatch(manualCodeInput);
                    }
                  }}
                  className="flex-1 border border-stone-300 rounded-xl p-2.5 uppercase font-bold text-stone-800 focus:ring-2 focus:ring-emerald-500 bg-stone-50"
                />
                <button
                  type="button"
                  onClick={() => parseQrTextAndMatch(manualCodeInput)}
                  className="bg-stone-800 hover:bg-stone-900 text-amber-300 font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  Buscar
                </button>
              </div>

              {/* Quick Testing Chips for Registered Hives */}
              {hives.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-stone-500 font-medium">🧪 Testar Leitura:</span>
                  {hives.slice(0, 5).map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => {
                        setManualCodeInput(h.code);
                        parseQrTextAndMatch(h.code);
                      }}
                      className="bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 font-bold px-2 py-0.5 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                    >
                      {h.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Camera / Scan Warning or Error */}
            {cameraError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-2xl flex items-start space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-snug">{cameraError}</p>
              </div>
            )}

            {/* Scanned Result: Hive Found in Meliponary */}
            {scannedHive && (
              <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-2xl space-y-3 text-emerald-950 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">✓</span>
                    <span className="font-extrabold text-sm text-emerald-950">Colmeia Identificada com Sucesso!</span>
                  </div>
                  <span className="bg-emerald-200 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {scannedHive.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Código da Caixa:</span>
                    <h4 className="text-xl font-black font-mono text-emerald-950">{scannedHive.code}</h4>
                    <p className="font-bold text-stone-800">
                      {speciesList.find((s) => s.id === scannedHive.speciesId)?.popularName}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-stone-600 space-y-0.5">
                    <p>Caixa: <strong>{scannedHive.boxModel}</strong></p>
                    <p>Força: <strong className="text-amber-700">{'⭐'.repeat(scannedHive.strength)}</strong></p>
                    <p>Rainha: <strong>{scannedHive.queenStatus}</strong></p>
                  </div>
                </div>

                {/* Scanned Action Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectHiveFromScan(scannedHive.id);
                      onClose();
                    }}
                    className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                  >
                    <Box className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ver Colmeia</span>
                  </button>

                  {onNavigateToInspection && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateToInspection(scannedHive.id);
                        onClose();
                      }}
                      className="bg-stone-800 hover:bg-stone-900 text-white font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                    >
                      <ClipboardList className="w-3.5 h-3.5 text-amber-300" />
                      <span>Fazer Revisão</span>
                    </button>
                  )}

                  {onNavigateToFeeding && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateToFeeding(scannedHive.id);
                        onClose();
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Alimentar</span>
                    </button>
                  )}
                </div>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setScannedHive(null);
                      setManualCodeInput('');
                    }}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 underline font-bold cursor-pointer"
                  >
                    🔄 Escanear Outra Caixa
                  </button>
                </div>
              </div>
            )}

            {/* Scanned Result: Unknown / Unregistered Code */}
            {scannedNotFoundCode && (
              <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl space-y-2 text-stone-900 shadow-sm animate-fadeIn">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Código não cadastrado no meliponário: "{scannedNotFoundCode}"</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Você pode cadastrar uma nova colmeia com este código agora mesmo.
                </p>
                {onOpenAddHiveWithCode && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAddHiveWithCode(scannedNotFoundCode);
                      onClose();
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black py-2 px-4 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Cadastrar Colmeia {scannedNotFoundCode}</span>
                  </button>
                )}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 3: BATCH PRINT ALL HIVE TAGS ================= */}
        {activeTab === 'batch' && (
          <div className="space-y-4 text-xs">
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-amber-950 space-y-1 print:hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Impressão em Grade de Etiquetas A4</h3>
                <button
                  type="button"
                  onClick={toggleBatchSelectAll}
                  className="text-xs text-amber-800 hover:underline font-bold cursor-pointer"
                >
                  {selectedHiveIdsForBatch.length === hives.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                </button>
              </div>
              <p className="text-stone-600 text-xs">
                Selecione as caixas que deseja imprimir em folha de adesivos/etiquetas A4 ({selectedHiveIdsForBatch.length} de {hives.length} selecionadas).
              </p>
            </div>

            {/* List Selection (Hidden on Print) */}
            {hives.length === 0 ? (
              <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl text-center space-y-2">
                <Box className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-stone-600 font-bold">Nenhuma colmeia cadastrada ainda.</p>
                <p className="text-stone-400 text-xs">Cadastre colmeias no menu "Colmeias" para gerar impressões em lote.</p>
              </div>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 border border-stone-200 p-2.5 rounded-2xl bg-stone-50 print:hidden">
                {hives.map((h) => {
                  const sp = speciesList.find((s) => s.id === h.speciesId);
                  const isSelected = selectedHiveIdsForBatch.includes(h.id);
                  return (
                    <label 
                      key={h.id} 
                      className={`p-2.5 rounded-xl border flex items-center justify-between shadow-2xs transition-all cursor-pointer ${
                        isSelected ? 'bg-white border-amber-400' : 'bg-stone-100/60 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleBatchHive(h.id)}
                          className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-500"
                        />
                        <div>
                          <strong className="font-mono text-stone-900 text-sm block">{h.code}</strong>
                          <span className="text-stone-600 text-[11px]">{sp?.popularName} • Caixa {h.boxModel}</span>
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded border border-stone-300 shrink-0">
                        <QRCodeSVG value={`MELIAPP:HIVE:${h.code}:${h.id}`} size={36} />
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Print Grid of Tags (Visible on screen and during print) */}
            {selectedHiveIdsForBatch.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-stone-700 block print:hidden">
                  Prévia da Grade de Impressão ({selectedHiveIdsForBatch.length} etiquetas):
                </span>

                <div 
                  id="printable-batch-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-100 rounded-2xl max-h-60 overflow-y-auto border border-stone-200 print:grid-cols-2 print:gap-4 print:p-0 print:bg-white print:border-none print:max-h-none print:overflow-visible"
                >
                  {hives
                    .filter(h => selectedHiveIdsForBatch.includes(h.id))
                    .map((h) => {
                      const sp = speciesList.find((s) => s.id === h.speciesId);
                      return (
                        <div
                          key={h.id}
                          className="bg-white border-2 border-emerald-950 p-3 rounded-2xl shadow-2xs flex items-center justify-between gap-2 print:border-2 print:border-black"
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="text-lg font-black font-mono text-emerald-950">{h.code}</div>
                            <div className="font-bold text-xs text-stone-900 truncate">{sp?.popularName}</div>
                            <div className="text-[9px] text-stone-500 italic truncate">{sp?.scientificName}</div>
                            <div className="text-[9px] text-stone-600 font-mono pt-1">Caixa {h.boxModel}</div>
                          </div>
                          <div className="bg-white p-1.5 rounded-xl border border-emerald-900 shrink-0">
                            <QRCodeSVG value={`MELIAPP:HIVE:${h.code}:${h.id}`} size={64} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {hives.length > 0 && (
              <button
                type="button"
                onClick={handlePrint}
                disabled={selectedHiveIdsForBatch.length === 0}
                className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-sm cursor-pointer transition-all print:hidden"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Imprimir Folha com {selectedHiveIdsForBatch.length} Etiquetas</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
