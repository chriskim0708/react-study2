import React, { useRef, useEffect } from 'react';
import BinaryImage from '../assets/images/test/8a32831b733fabefde2237f23d87d2f1.jpg';

const setRGBA = (data: any) => {
  for (let y = 0; y < data.data.length; y += 4) {
    const r = data.data[y];
    const g = data.data[y + 1];
    const b = data.data[y + 2];
    const a = data.data[y + 3];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    if (gray > 120) {
      data.data[y] = 255;
      data.data[y + 1] = 255;
      data.data[y + 2] = 255;
      data.data[y + 3] = 0;
    } else {
      data.data[y] = 0;
      data.data[y + 1] = 0;
      data.data[y + 2] = 255;
      data.data[y + 3] = a;
    }
  }
};

const Canvas = () => {
  const binarization = useRef<HTMLCanvasElement>(null);
  const copyBinarization = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = binarization.current;
    const context = canvas?.getContext('2d');

    const img = new Image();
    img.src = BinaryImage;
    img.onload = () => {
      context?.drawImage(img, 0, 0, 200, 150);
    };
  }, []);

  const convertColor = () => {
    const canvas = binarization.current;
    const canvas2 = copyBinarization.current;

    const context = canvas?.getContext('2d');
    const context2 = canvas2?.getContext('2d');

    context?.save();
    context2?.save();

    const imageData = context?.getImageData(0, 0, 500, 450);
    console.log('imageData', imageData);
    setRGBA(imageData);
    context2?.putImageData(imageData as any, 0, 0);

    context?.restore();
    context2?.restore();
  };

  const clip = () => {
    const canvas2 = copyBinarization.current;

    const context2 = canvas2?.getContext('2d');

    const img = new Image();
    img.src = BinaryImage;
    img.onload = () => {
      if (!context2) return;
      context2?.save();
      context2.fillStyle = 'white';
      context2?.fillRect(0, 0, 500, 450);
      context2?.beginPath();
      context2?.moveTo(200, 250);
      context2?.lineTo(375, 250);
      context2?.lineTo(300, 350);
      context2?.closePath();
      context2?.clip();

      context2?.drawImage(img as any, 0, 0);
      context2?.restore();
    };
  };

  const verification = () => {
    const canvas = copyBinarization.current;
    const context = canvas?.getContext('2d');
    const imageData = context?.getImageData(0, 0, 500, 450);
    console.log('full imageData', imageData?.data);
    console.log(
      'verification imageData',
      imageData?.data.filter((v) => v === 0)
    );
  };

  const clear = () => {
    const canvas2 = copyBinarization.current;
    const context2 = canvas2?.getContext('2d');
    context2?.clearRect(0, 0, 500, 450);
  };

  return (
    <>
      <button onClick={convertColor} className="mr-2">
        convert color
      </button>
      <button onClick={clip} className="mr-2">
        clip
      </button>
      <button onClick={verification} className="mr-2">
        color verification
      </button>
      <button onClick={clear} className="mr-2">
        clear
      </button>
      <div style={{ display: 'flex' }}>
        <canvas ref={binarization} width="500px" height="450px"></canvas>
        <canvas ref={copyBinarization} width="500px" height="450px" style={{ backgroundColor: '#fff' }}></canvas>
      </div>
    </>
  );
};

export default Canvas;
