export function PreOrderHeader() {
  return (
    <div
      className="grid grid-cols-20 text-center bg-gray-800 p-1
    text-gray-200 text-sm font-bold items-center">
      <div>COVER</div>
      <div className="col-span-4">BARCODE/SKU</div>
      <div className="col-span-7">TITLE</div>
      <div className="col-span-2">RELEASE</div>
      <div className="col-span-2">DEADLINE</div>
      <div className="col-span-2">PRICE</div>
      <div className="col-span-2">EA</div>
    </div>
  );
}