import Image from "next/image";

function Background({ img }) {

  return (
    <>
      <div className={"background"}>
        <div className="background--img">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
        </div>
      </div>
    </>
  );
}

export default Background;
