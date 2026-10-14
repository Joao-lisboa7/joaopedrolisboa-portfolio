import './frame-img.css';

interface FrameImgProps {
  className?: string;
  imageUrl: string;
}

function FrameImg({ className = '', imageUrl }: FrameImgProps) {
  return (
    <div className={`frame-img relative group ${className}`}>
      <div className="frame-img__inner" aria-hidden="true" />
      <img className="frame-img__image" src={imageUrl} alt="Foto de João Pedro" />
    </div>
  );
}

export default FrameImg;