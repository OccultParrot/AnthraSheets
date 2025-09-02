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
        <li> Optional birthplace option, so you can enter where your dinosaur is from!</li>
        <li className="text-xs text-right">- Thank you @taryo for this idea!!</li>
        {/*<li className="font-bold"> Changed: </li>*/}
        {/* Stuff I changed */}
        {/*<br />*/}
        {/*<li className="font-bold"> Fixed: </li>*/}
        {/* Stuff I fixed */}
        {/*<br />*/}
        {/*<li className="font-bold"> Removed: </li>*/}
        {/* Stuff I removed */}
      </ul>
      <br />
      <p className="text-sm text-right">- Written by OccultParrot</p>
    </>
  );
}

export default ModalText;