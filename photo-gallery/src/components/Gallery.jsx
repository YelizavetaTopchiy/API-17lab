import React, { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '../api/photosApi';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);  // Масив фото
  const [loading, setLoading] = useState(false);  // Стан завантаження
  const [page, setPage] = useState(1);  // Поточна сторінка

  // Використовуємо useCallback, щоб не створювати нову функцію на кожен рендер
  const loadPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPhotos(page, 4);  // Запит на API з поточною сторінкою
      setPhotos(data);  // Оновлення стейту з фото
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);  // Завершення завантаження
    }
  }, [page]);  // useCallback, щоб не створювати нову функцію при кожному рендері

  // Викликаємо функцію завантаження фото при зміні сторінки
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);  // Залежність від loadPhotos

  // Кнопки для перемикання сторінок
  const handleNext = () => {
    setPage(prevPage => prevPage + 1);  // Перехід на наступну сторінку
  };

  const handlePrev = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));  // Перехід на попередню сторінку
  };

  return (
    <div>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <div>
          <div className="gallery">
            {photos.map((photo) => (
              <div key={photo.id} className="photo">
                <img src={photo.download_url} alt={photo.author} />
                <p>{photo.author}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrev} disabled={page <= 1}>
              Попередні
            </button>
            <button onClick={handleNext}>Наступні</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
