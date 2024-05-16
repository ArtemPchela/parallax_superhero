document.addEventListener('DOMContentLoaded', async () => {
  const textToRead = document.getElementById('text-to-read').textContent;
  const listenButton = document.getElementById('listen-button');
  const voiceSelection = document.getElementById('voice-selection');

  // Fetch and display available voices
  const fetchVoices = async () => {
    const response = await fetch('https://texttospeech.googleapis.com/v1/voices?key=AIzaSyAwoO7sui3i_5YDTivr62Tw2kebFIG6dLw');
    const data = await response.json();
    const voices = data.voices;

    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.languageCodes.join(', ')}) - ${voice.ssmlGender}`;
      voiceSelection.appendChild(option);
    });
  };

  // Fetch voices on page load
  await fetchVoices();

  listenButton.addEventListener('click', async () => {
    const selectedVoice = voiceSelection.value;
    const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyAwoO7sui3i_5YDTivr62Tw2kebFIG6dLw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: textToRead },
        voice: { name: selectedVoice },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    });
    const data = await response.json();
    const audioContent = data.audioContent;
    const audio = new Audio('data:audio/mp3;base64,' + audioContent);
    audio.play();
  });
});
