function ModalText() {
  return (
    <>
      <p>So you dont want to manually write out your character sheets for Anthrax? Well me neither! </p>
      <p>Just fill in the information and press the copy button to copy the finished sheet!</p>
      <br />
      <p className="text-center">─── Change Log ───</p>
      <ul>
        <li className="font-bold">Added:</li>
        {/* Stuff I added */}
        <li> Welcome Modal, that I will keep updated with new stuff I did </li>
        <br />
        {/*<li className="font-bold"> Changed: </li>*/}
        {/* Stuff I changed */}
        {/*<br />*/}
        {/*<li className="font-bold"> Fixed: </li>*/}
        {/* Stuff I fixed */}
        {/*<br />*/}
        {/*<li className="font-bold"> Removed: </li>*/}
        {/* Stuff I removed */}
      </ul>
      <p className="font-bold"> Help Wanted!! </p>
      <p> I want to add some more formats to the website, to add some customization to how the generated sheets look! </p>
      <p> If you have a format you would like to be added to AnthraSheets, please DM me on discord and I will credit you for the format! </p>
      
      <br />
      <p className="text-sm text-right">- Written by OccultParrot</p>
    </>
  );
}

export default ModalText;