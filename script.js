* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: Georgia, serif;
  background: linear-gradient(135deg, #120008, #3b071d, #17000c);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
}

.container {
  width: 90%;
  max-width: 600px;
  padding: 30px 20px;
}

h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  opacity: 0.85;
  margin-bottom: 40px;
}

.record-player {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 35px;
}

.record {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background:
    repeating-radial-gradient(
      circle,
      #111 0px,
      #111 3px,
      #1d1d1d 4px,
      #111 6px
    );
  border: 8px solid #222;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  animation: spin 5s linear infinite;
  animation-play-state: paused;
}

.record.playing {
  animation-play-state: running;
}

.label {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: #8b1746;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
}

.center-hole {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: white;
}

.tonearm {
  position: absolute;
  width: 95px;
  height: 8px;
  background: silver;
  top: 25px;
  right: -5px;
  transform: rotate(35deg);
  transform-origin: right center;
  border-radius: 10px;
}

button {
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  background: #fff;
  color: #6d1237;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: scale(0.96);
}

#message {
  margin-top: 30px;
  font-size: 17px;
  line-height: 1.7;
  opacity: 0.9;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  h1 {
    font-size: 32px;
  }

  .record-player {
    transform: scale(0.85);
    margin-bottom: 10px;
  }
  }
