//Creating a clone of spotify website with additional features

console.log("Lets write some javascript...");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds)
{
    if(isNaN(seconds) || seconds < 0)
    {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2 ,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

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

const playMusic = (track,pause = false) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    if(!pause)
    {
        currentSong.play();
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main() {
    //Get the list of all the songs
    let songs = await getSongs();
    playMusic(songs[0],true);

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

    //listen for timeUpdate Event
    currentSong.addEventListener("timeupdate",()=>{
        // console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left =(currentSong.currentTime/currentSong.duration) * 100 + "%" 
    })

    //Add an event listener to seekBar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left= percent + "%";
       
        // console.log(e.target.getBoundingClientRect(),e.offsetX);
        console.log(currentSong.duration);
        console.log(percent);

        currentSong.currentTime = ((currentSong.duration) * percent)/ 100 ;
        
    })

    //Adding An event listner for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0";
    })

    //Adding an event listner for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%";
    })
}


main();