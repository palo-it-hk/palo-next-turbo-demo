function Page() {
  return (
    <div>
      {/* fonts set within tailwind.config.js */}
      <p className="font-primary">Open sans</p>
      <p className="font-secondary font-bold">Arvo Bold</p>
      <p className="font-secondary ">Arvo Normal</p>
      {/*       
      Local fonts set within tailwind.config.js */}
      <p className="font-josefin">Josefin Slab</p>
      <p className="font-gluten">Gluten</p>
      <p className="font-gluten font-bold">Gluten</p>

      {/* fallback font set in tailwind.config.js */}
      <p>Verdana (set as default font)</p>
    </div>
  );
}

export default Page;
