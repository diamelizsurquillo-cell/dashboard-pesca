import { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const LegalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = sessionStorage.getItem('produce_legal_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('produce_legal_accepted', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          <AlertTriangle color="#DC3545" size={28} />
          Aviso Legal Importante
        </h2>
        
        <p className="modal-text">
          Esta plataforma web es una herramienta de código abierto desarrollada <strong>exclusivamente con fines de testeo, prueba y visualización de datos</strong>. No tiene ninguna afiliación, patrocinio ni vínculo oficial con el Ministerio de la Producción (PRODUCE).
        </p>
        
        <p className="modal-text">
          Los datos mostrados han sido simulados y estructurados de forma automatizada y podrían contener márgenes de error. Esta herramienta <strong>no tiene validez legal</strong> para reclamos, adjudicación de cuotas pesqueras, ni procesos administrativos.
        </p>

        <div className="modal-warning-box">
          <p>Para información oficial y trámites, consulte obligatoriamente el portal institucional de PRODUCE:</p>
          <a href="https://www.gob.pe/produce" target="_blank" rel="noopener noreferrer" className="modal-link">
            Ver Portal Oficial en Gob.pe <ExternalLink size={16} />
          </a>
        </div>

        <button className="modal-btn-accept" onClick={handleAccept}>
          Entiendo y Acepto las Condiciones
        </button>
      </div>
    </div>
  );
};

export default LegalModal;
