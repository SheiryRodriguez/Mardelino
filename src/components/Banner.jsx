import bannerImg from "../assets/banner.png";

function Banner() {
  return (
    <section id="inicio" className="hero-banner">
      <div className="banner">
        <img
          src={bannerImg}
          alt="MARDELINO - Cuidado natural para tus rizos"
        />
      </div>
    </section>
  );
}

export default Banner;