import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation()
  
  return (
    // TODO: Change path to / when ready to launch
    <div className={ `${location.pathname == '/indev' ? 'hidden' : 'visible'} bg-darker text-light p-4 text-center` }>
      <p className="text-sm text-light">
        Written by OccultParrot :D
      </p>
      <p className="text-sm text-gray-400">Feel free to dm me for anything you want developed!</p>
      <Link to="https://github.com/OccultParrot/AnthraSheets" target="_blank" rel="noopener noreferrer">
        <p className="text-sm text-gray-400 transition-colors hover:text-lighter">
          Link to GitHub repository.
        </p>
      </Link>
    </div>
  );
}

export default Footer;