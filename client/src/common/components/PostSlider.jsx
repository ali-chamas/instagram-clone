import React, { useState } from "react";
import "../styles/postSlider.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
export const PostSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentIndex ? "slide active" : "slide"}
          >
            <img src={image.image} alt={""} />
          </div>
        ))}
        <button className="prev" onClick={prevSlide}>
          <FaArrowLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
