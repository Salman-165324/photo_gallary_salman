import Gallery from "@/components/Gallery";
const backgroundStyles = {
  backgroundImage: `url(https://res.cloudinary.com/dctkvot0v/image/upload/f_auto,q_auto/v1/ollyo-images-raw/y0dmihwzypa5m8uctzsd)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

export default function Home() {
  return (
    <main style={backgroundStyles} className="h-full min-h-screen">
      {/* <Image
        src=""
        alt=""
        className="relative inset-0 h-full w-full object-cover"
        width={1500}
        height={1000}
      ></Image> */}
      <Gallery></Gallery>
    </main>
  );
}
