function Contacto() {
  return (
    <section id="contacto" className="contacto">
      <div className="contacto-contenido">
        <h2>Conecta con MARDELINO</h2>

        <p>
          Únete a nuestra comunidad y descubre más sobre
          el cuidado y la belleza natural de tus rizos.
        </p>

        <a
          href="https://www.instagram.com/mar.delino/"
          target="_blank"
          rel="noopener noreferrer"
          className="boton-instagram"
        >
          Síguenos en Instagram
        </a>

        <a
          href="/admin"
          className="acceso-administrador"
        >
          Acceso administrativo
        </a>
      </div>
    </section>
  );
}

export default Contacto;