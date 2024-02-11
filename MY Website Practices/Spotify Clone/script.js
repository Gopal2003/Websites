console.log("Lets write some javascript...");
let currentSong = new Audio();

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }

    return songs;

}

const playMusic = (track) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    currentSong.play();
}

async function main() {
    //Get the list of all the songs
    let songs = await getSongs();

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
        <img src="music.svg" alt="" srcset="" class="invert">
        <div class="info">
            <div> ${song.replaceAll("%20"," ").replaceAll("y2mate.com -"," ")}</div>
            <div>Artist Name</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class = "invert" src="play.svg" alt="" srcset="">
        </div>
        
        </li>`;
    }

    //Play the first song
    // var audio = new Audio(songs[2]);
    // audio.play(); 

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
    
    play.addEventListener("click", ()=>{
        if(currentSong.paused)
        {
            currentSong.play();
            play.src = "pause.svg";
        }
        else
        {
            currentSong.pause();
            play.src = "play.svg";
        }
    }
    )
}


main();