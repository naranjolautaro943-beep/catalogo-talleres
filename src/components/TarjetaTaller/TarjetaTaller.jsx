import { useState } from "react";
import estilos from "./TarjetaTaller.module.css";

export default function TarjetaTaller({ taller }) {
  const { titulo, categoria, cupo, inscriptos, nuevo, descripcion } = taller;
  const [expandida, setExpandida] = useState(false);

  const libres = cupo - inscriptos;
  const porcentaje = Math.round((inscriptos / cupo) * 100);
  const estado = libres === 0 ? "completo" : libres <= 3 ? "pocos" : "disponible";

  const clases = [
    estilos.tarjeta,
    estilos[estado],
    expandida && estilos.expandida,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={clases}>
      {nuevo && <span className={estilos.etiqueta}>Nuevo</span>}

      <div className={estilos.info}>
        <h2>{titulo}</h2>
        <p className={estilos.categoria}>{categoria}</p>
      </div>

      <div className={estilos.ocupacion}>
        <p>{estado === "completo" ? "Completo" : `Cupos libres: ${libres} de ${cupo}`}</p>
        <div className={estilos.barra}>
          <div className={estilos.relleno} style={{ width: `${porcentaje}%` }} />
        </div>
      </div>

      <div className={estilos.acciones}>
        <button onClick={() => setExpandida(!expandida)}>
          {expandida ? "Ocultar detalles" : "Ver detalles"}
        </button>
      </div>

      {expandida && <p className={estilos.descripcion}>{descripcion}</p>}
    </article>
  );
}