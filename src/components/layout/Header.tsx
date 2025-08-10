import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// The values that the dino fact API returns
type DinoFact = {
  Name: string;
  Description: string;
};

function Header() {
  // States for dino fact stuff
  const [ dinoFact, setDinoFact ] = useState<DinoFact | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const fetchDinoFact = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dinosaur-facts-api.shultzlab.com/dinosaurs/random");
      const data = await response.json();
      setDinoFact(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dino fact:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDinoFact();
  }, []);

  /**
   * Renders the dino fact if available, otherwise returns null.
   */
  const renderDinoFact = () => {
    if (loading) return null;
    if (error) return <p>Error: { error }</p>;
    if (!dinoFact) return null;

    return (
      <div className="flex flex-col text-center sm:flex-row justify-between gap-2 p-4 text-light">
        <h2 className="text-l font-bold">{ dinoFact.Name }:</h2>
        <em>{ dinoFact.Description }</em>
      </div>
    );
  };

  return (
    <header className="sm:sticky sm:top-0 sm:z-48">
      <div
        className="bg-medium text-light flex flex-col h-fit w-full items-center justify-between pb-4 shadow-sm sm:h-20 sm:flex-row sm:pb-0">
        <Link to="/" className="flex items-center justify-between group">
          <h1
            className="ml-0 text-2xl font-bold text-light transition ease-in-out group-hover:text-lighter hover:scale-110 sm:ml-4">
            AnthraSheets
          </h1>
        </Link>
        { renderDinoFact() }
      </div>
    </header>
  );
}

export default Header;