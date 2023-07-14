import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Grid, TextField, Button, Modal } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const ImageGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ImageItem = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 0.8,
  },
}));

const ModalImage = styled('img')({
  display: 'block',
  width: '100%',
  height: 'auto',
});

const Home = ({ images, handleImageClick }) => (
  <ImageGrid container spacing={2}>
    {images.map((image) => (
      <Grid item xs={12} sm={6} md={4} key={image.id}>
        <ImageItem
          src={image.urls.small}
          alt={image.alt_description}
          onClick={() => handleImageClick(image)}
        />
      </Grid>
    ))}
  </ImageGrid>
);

const App = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?count=12&client_id=YOUR_UNSPLASH_ACCESS_KEY`
        );
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?count=12&query=${searchTerm}&client_id=XqUzJcXaNVMShCU2bsQijrHu8HGTlBpwUWgqCWCZTZc`
      );
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setOpenModal(false);
  };

  return (
    <Router>
      <Container maxWidth="md" sx={{ marginTop: '40px' }}>
        <form onSubmit={handleSearch}>
        <div class = "title">Photo Gallery</div>
          <TextField
            label="Search Images"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>

        <Routes>
          <Route
            path="/"
            element={<Home images={images} handleImageClick={handleImageClick} />}
          />
        </Routes>

        <Modal open={openModal} onClose={handleCloseModal}>
          <ModalImage
            src={modalImage?.urls.regular}
            alt={modalImage?.alt_description}
          />
        </Modal>
      </Container>
    </Router>
  );
};

export default App;
