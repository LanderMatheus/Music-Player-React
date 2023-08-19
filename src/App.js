import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Logo from './assets/logo.svg';
import Profile from './assets/profile.jpg';
import Next from './assets/next.svg';
import Pause from './assets/pause.svg';
import Play from './assets/play.svg';
import Previous from './assets/previous.svg';
import Stop from './assets/stop.svg';
import CardMusics from './components/empty';
import { musics } from './musics';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(musics[0]);
  const [volume, setVolume] = useState(0.5);



  function playPause() {
    if (isPlaying) {
      audioRef.current.pause();

    } else {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();

    }
    setIsPlaying(!isPlaying);

  }

  function handleStop() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }

  function handlePrevious() {
    const currentIndex = musics.findIndex((music) => music.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + musics.length) % musics.length;
    const previousSong = musics[previousIndex];
    setCurrentSong(previousSong);
    audioRef.current.src = previousSong.url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }

  function handleNext() {
    const currentIndex = musics.findIndex((music) => music.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % musics.length;
    const nextSong = musics[nextIndex];
    setCurrentSong(nextSong);
    audioRef.current.src = nextSong.url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }

  function handleVolumeChange(event) {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }

  return (
    <div className="container">
      <div className="gradiente">
        <header>
          <img src={Logo} alt="Logo" />
          <div className="profile">
            <img src={Profile} alt="Profile" />
            <span>Bem-vindo, Lander</span>
          </div>
        </header>
        <main>
          <h1>A melhor playlist</h1>
          <div className="CardMusics">
            {musics.map((music) => (
              <CardMusics
                key={music.id}
                className="Musica"
                title={music.title}
                cover={music.cover}
                description={music.description}
              />
            ))}
          </div>
        </main>
      </div>
      <footer>

        <div className="infoMusic">
          <h2>{currentSong.title}</h2>
          <span>{currentSong.artist}</span>
        </div>

        <div className="commands"></div>

        <div className='buttons' >
          <audio ref={audioRef} />
          <button className="play">
            <img onClick={handleStop} src={Stop} alt="Stop" />
          </button>
          <button className="play">
            <img onClick={handlePrevious} src={Previous} alt="Previous" />
          </button>
          <button className="play" onClick={playPause}>
            <img src={isPlaying ? Pause : Play} alt="Play/Pause" />
          </button>
          <button className="play">
            <img onClick={handleNext} src={Next} alt="Next" />
          </button>
          

          
         
        </div>
      </footer>
    </div>
  );
}

export default App;
