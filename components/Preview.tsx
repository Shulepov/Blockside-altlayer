import useCatsImages from "../app/useCatsImages";
import useMinter from "../app/useMinter";

/*
attributes: Array(5)
0: {trait_type: 'body', value: 'blue cat skin'}
1: {trait_type: 'hats', value: 'pirate black'}
2: {trait_type: 'shirt', value: 'buttondown tan'}
3: {trait_type: 'face', value: 'ditto'}
4: {trait_type: 'tier', value: 'wild_2'}
length: 5
[[Prototype]]: Array(0)
https_arweave_image: "https://arweave.net:443/FMmC0iP0O2OskPHtwKdO2Tj4qTA4S5zeyolL4j3CdeA"
image: "ar://FMmC0iP0O2OskPHtwKdO2Tj4qTA4S5zeyolL4j3CdeA"
name: "Arbi Cool Cat #0"
points: {Body: 0, Shirt: 1, Hats: 3, Face: 2}
*/

const Preview = () => {
  const { cats, catsInfo } = useCatsImages();
  const { mintCat, state } = useMinter();

  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            { catsInfo ? "Your Arbicats" : "You don't have Arbicats"}
          </h2>
        </div>
        {!catsInfo && (
            <div className="mx-auto w-1/2 my-12">
              <button
                onClick={mintCat}
                className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
              >
                Mint your first Arbicat
              </button>
            </div>
          )}
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {catsInfo &&
            Object.values(catsInfo).map((post: any) => (
              <div
                key={post.name}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={post.https_arweave_image}
                    alt=""
                  />
                </div>
                <div className="p-4 text-gray-900">
                  <h3 className="font-bold text-xl text-cyan-900 my-2">
                    {post.name}
                  </h3>
                  {post.attributes.map((attribute: any) => (
                    <div key={attribute.trait_type} className="flex flex-row">
                      <p className="text-normal font-normal ">
                        {attribute.trait_type}:&nbsp;
                      </p>
                      <p
                        key={attribute.trait_type}
                        className="text-normal font-light "
                      >
                        {attribute.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
