import { useState, useRef, useEffect } from 'react';
import './style.css';

export default function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [gallery, setGallery] = useState([
    { id: 0, src: 'image-1.webp' },
    { id: 1, src: 'image-2.webp' },
    { id: 2, src: 'image-3.webp' },
  ]);
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const drop = () => {
    const copyListItems = [...gallery];
    const dragItemContent = copyListItems[dragItem.current];

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setGallery(copyListItems);
  };

  const handleDelete = id => {
    // setGallery(images => images.filter(image => image.id !== id));
    const updatedGallery = gallery.filter(item => !item.checked);
    setGallery(updatedGallery);
    console.log(id);
  };

  const handleSelect = id => {
    // if (item[id].checked) {
    //   setSelectedImageCount(prevCount => {
    //     return prevCount + 1;
    //   });
    // }
    // console.log(selectedImageCount);
    const updatedGallery = gallery.map(item => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setGallery(updatedGallery);
  };

  useEffect(() => {
    const count = gallery.filter(item => item.checked).length;
    setSelectedImageCount(count);
  }, [gallery]);

  return (
    <div>
      <h2>Image gallery</h2>
      <div>
        <span>{selectedImageCount} images selected</span>
        <button onClick={handleDelete}>Delete selected files</button>
      </div>
      <div>
        {gallery.map((item, index) => (
          <div
            key={index}
            className='image-container'
            onDragStart={e => dragStart(e, index)}
            onDragEnter={e => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >
            <input
              type='checkbox'
              value={item.id}
              className='checkbox'
              // onChange={() => handleSelect(item, item.id)}
              // onChange={() => console.log(item)}
              onChange={() => handleSelect(item.id)}
              checked={item.checked || false}
            />
            <img src={item.src} alt={item.src} className='img' />
          </div>
        ))}
      </div>
    </div>
  );
}
