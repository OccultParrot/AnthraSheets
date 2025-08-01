import {Link} from 'react-router-dom';

function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-3 text-1 flex h-fit w-full items-center justify-between pb-4 shadow-sm sm:h-20 sm:flex-row sm:pb-0">
        <Link to="/" className="flex items-center justify-between group">
          <h1 className="ml-0 text-2xl font-bold text-1 transition ease-in-out group-hover:text-2 hover:scale-110 sm:ml-4">
            AnthraSheets
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;