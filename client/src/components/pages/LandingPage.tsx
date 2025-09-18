import { backgroundPhotos } from "../../config/photos.tsx";
import Discord from "/discord.svg"
import type { BackgroundPhoto } from "../../types.ts";
import { useState } from "react";

function getRandomPhoto(): BackgroundPhoto {
  const photoIndex = Math.floor(Math.random() * backgroundPhotos.length);
  let photo = backgroundPhotos[photoIndex];
  if (backgroundPhotos[photoIndex].url == "" || backgroundPhotos[photoIndex].url == "/landing_images/") {
    photo = getRandomPhoto();
  }
  return photo;
}

function LandingPage() {
  const [ photo, setPhoto ] = useState<BackgroundPhoto>(getRandomPhoto())

  const changePhoto = () => {
    setPhoto(getRandomPhoto());
  }

  const signInWithDiscord = () => {
    window.location.href = import.meta.env.VITE_API_URL + "/api/auth/discord";
  }

  console.log(photo);

  return (
    <div
      className={ `flex flex-col items-center min-h-screen justify-center text-light bg-fixed` }
      style={ { backgroundImage: `url('${ photo.url }')` } }
    >
      <div className="p-8 flex flex-col items-center justify-center backdrop-blur-md bg-slate-600/10 rounded-2xl">
        <h1 className="mt-8 text-6xl md:text-8xl font-header">AnthraSheets</h1>
        <p className="mt-4 text-2xl font-sans">Species Directory</p>
        <div className="mt-18 flex flex-row gap-8">
          <button
            className="p-4 w-fit text-md bg-blurple rounded-2xl hover:bg-dark-blurple transition-colors flex flex-row gap-4 justify-center items-center cursor-pointer select-none"
            onClick={ signInWithDiscord }>
            <img src={ Discord } alt="Discord Icon" className="h-8"/>
            Login with Discord
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between fixed bottom-0 items-center">
        <button onClick={ changePhoto }
                className=" flex flex-row gap-4  m-4 text-lg bg-slate-600/20 hover:bg-slate-800/20 transition-colors rounded-2xl p-4 backdrop-blur-md cursor-pointer select-none">
          Switch Background
        </button>
        <div
          className=" flex flex-row gap-4 w-fit  m-4 text-lg bg-slate-600/20 rounded-2xl p-4 backdrop-blur-md cursor-default select-none">
          <p>
            Photo by { photo.photographer }
          </p>
        </div>
      </div>
    </div>
  )
}


export default LandingPage;