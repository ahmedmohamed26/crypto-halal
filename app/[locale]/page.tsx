import Image from "next/image";
import myImage from "../../public/assets/intro.png";

export default function Home() {
  return (
    <div className="w-full relative">
      <div
        style={{
          backgroundImage: `url(${myImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top bottom",
          backgroundRepeat: "no-repeat",
          height: "800px",
          width: "100%",
          objectFit: "cover",
        }}
      >
        <h1>Welcome to My Website</h1>
      </div>
    </div>
  );
}
