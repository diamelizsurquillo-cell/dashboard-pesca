import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { kpiData } from '../data/mockData';
import { Download } from 'lucide-react';
import anchovetaVideo from '../assets/anchoveta.mp4';

const Reports = () => {
  const reportRef = useRef();

  const exportPDF = async () => {
    try {
      const element = reportRef.current;
      
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text("Estadísticas Completas 2025", 14, 20);
      
      autoTable(pdf, {
        startY: 30,
        head: [['Indicador', 'Valor']],
        body: [
          ['Captura Total', `${kpiData.totalCatch2025.toLocaleString()} TM`],
          ['Cuota Asignada', `${kpiData.quotaAssigned.toLocaleString()} TM`],
          ['Embarcaciones Activas', kpiData.activeVessels],
          ['Zona Principal', kpiData.topZone],
        ],
        theme: 'grid',
        headStyles: { fillColor: [0, 51, 102] }
      });

      pdf.save('Reporte_PRODUCE_2025.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Hubo un error al generar el PDF. Revisa la consola para más detalles.");
    }
  };

  return (
    <div style={{ margin: '-20px', padding: '20px', position: 'relative', minHeight: 'calc(100vh - 60px)', overflow: 'hidden' }}>
      {/* Background Video */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute'
          }}
        >
          <source src={anchovetaVideo} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0,51,102,0.4) 0%, rgba(46,139,87,0.3) 100%)',
          zIndex: 1
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="filters-bar" style={{ justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(8px)' }}>
          <h3 style={{ color: 'var(--primary-blue)' }}>Generación de Reportes</h3>
          <button className="btn" onClick={exportPDF}>
            <Download size={16} /> Descargar PDF Completo
          </button>
        </div>

        <div 
          ref={reportRef} 
          style={{ 
            background: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(10px)',
            padding: '40px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <div style={{ borderBottom: '2px solid #003366', paddingBottom: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <h1 style={{ color: '#003366' }}>MINISTERIO DE LA PRODUCCIÓN</h1>
            <h2>Reporte Ejecutivo - Pesquería Anchoveta 2025</h2>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E8B57', marginBottom: '10px' }}>Resumen de Ejecución de Cuota</h3>
            <p>
              Al cierre de la presente fecha, la captura total de anchoveta para el año 2025 asciende a <strong>{kpiData.totalCatch2025.toLocaleString()} TM</strong>, 
              lo que representa un avance del <strong>{((kpiData.totalCatch2025 / kpiData.quotaAssigned) * 100).toFixed(1)}%</strong> respecto a la cuota global 
              asignada de <strong>{kpiData.quotaAssigned.toLocaleString()} TM</strong>.
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E8B57', marginBottom: '10px' }}>Estado de la Flota</h3>
            <p>
              Se encuentran operando un total de <strong>{kpiData.activeVessels} embarcaciones activas</strong> en el litoral peruano, 
              concentrándose la mayor intensidad de pesca en la zona <strong>{kpiData.topZone}</strong>.
            </p>
          </div>

          <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: 'rgba(255, 243, 205, 0.9)', borderLeft: '4px solid #FFC107', borderRadius: '4px' }}>
            <h4 style={{ color: '#856404', marginBottom: '5px' }}>Notificaciones y Alertas</h4>
            <ul style={{ paddingLeft: '20px', color: '#856404' }}>
              <li>La Zona Centro está próxima a alcanzar el límite de densidad sostenible.</li>
              <li>Se emitieron 12 advertencias por pesca incidental de juveniles en la última semana.</li>
            </ul>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '50px' }}>
            Documento generado automáticamente por el Dashboard de Seguimiento PRODUCE. <br/>
            Fecha de emisión: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
