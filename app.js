// Set Enter btn for submit
document.getElementById('searchInput').addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        document.getElementById('submitBtn').click();
    }
})


// Get data from server
const getSong = async () => {
    const inputValue = document.getElementById('searchInput').value;
    toggleSpinner();
    const url = `https://api.lyrics.ovh/suggest/${inputValue}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySong(data.data)
    } catch (error) {
        errorMessage("sorry.!!! I failed to load song, please try again :)");
        toggleSpinner();
    }
}


// Display songs
const displaySong = (songs) => {
    let songsContainer = document.getElementById('songsContainer');
    songsContainer.innerHTML = ' ';
    document.getElementById('showLyric').innerText = ' ';
    songs.forEach(song => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">${song.artist.name}</span></p>
                <audio controls src="${song.preview}"></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
        `
        songsContainer.appendChild(div);
        toggleSpinner();
    });
}


// Get lyric
const getLyric = async (artist, title) => {
    toggleSpinner()
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        document.getElementById('showLyric').innerText = data.lyrics;
        toggleSpinner()
    } catch (error) {
        errorMessage("sorry.!!! I failed to load lyrics, please try again :)");
        toggleSpinner();
    }
}


// Show error message
const errorMessage = (message) => {
    document.getElementById('errorMessage').innerText = message;
}


// Spinner
const toggleSpinner = () => {
    document.getElementById('spinner').classList.toggle('d-none');
}