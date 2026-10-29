import { useState } from "react";
import { bases } from "../data/bases";
import { aromas } from "../data/aromas";

export default function Personalizador() {
  const [tipo, setTipo] = useState("gel");
  const [baseId, setBaseId] = useState("");
  const [aromaId, setAromaId] = useState("");

  const basesDisponibles = bases.filter(
    (base) => base.tipos.includes(tipo)
  );

  const baseElegida = basesDisponibles.find(
    (base) => base.id === Number(baseId)
  );

  const aromaElegido = aromas.find(
    (aroma) => aroma.id === Number(aromaId)
  );

  const precio =
    baseElegida && aromaElegido
      ? baseElegida.precio + aromaElegido.precioExtra
      : null;

  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    setBaseId("");
    setAromaId("");
  }

  return (
    <section>
      <h2>Personaliza tu producto</h2>

      <label>Tipo de producto</label>
      <select
        value={tipo}
        onChange={(e) => cambiarTipo(e.target.value)}
      >
        <option value="gel">Gel</option>
        <option value="aceite">Aceite</option>
      </select>

      <label>Elige tu base</label>
      <select
        value={baseId}
        onChange={(e) => setBaseId(e.target.value)}
      >
        <option value="">Selecciona una base</option>
        {basesDisponibles.map((base) => (
          <option key={base.id} value={base.id}>
            {base.nombre}
          </option>
        ))}
      </select>

      <label>Elige tu aroma</label>
      <select
        value={aromaId}
        onChange={(e) => setAromaId(e.target.value)}
      >
        <option value="">Selecciona un aroma</option>
        {aromas.map((aroma) => (
          <option key={aroma.id} value={aroma.id}>
            {aroma.nombre}
          </option>
        ))}
      </select>

      {baseElegida && aromaElegido && (
        <div>
          <h3>
            {tipo === "gel" ? "Gel" : "Aceite"} de{" "}
            {baseElegida.nombre} con aroma a {aromaElegido.nombre}
          </h3>

          <h4>Beneficios</h4>
          <ul>
            {baseElegida.beneficios.map((beneficio) => (
              <li key={beneficio}>{beneficio}</li>
            ))}
          </ul>

          <p>
            <strong>Precio: ${precio.toLocaleString("es-CO")}</strong>
          </p>
        </div>
      )}
    </section>
  );
}