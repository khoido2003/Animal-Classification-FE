import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className=" bg-white/80 py-4 fixed right-0 left-0 ">
      <div className="max-w-screen-xl m-auto flex justify-between items-center px-3">
        <h2 className="font-bold text-lg">AnimalRecogAPI 🤖</h2>

        <p className="font-bold text-lg">
          <a href="http://localhost:8000/animal_classification/predict">API</a>
        </p>

        <Button>
          <a href="https://github.com/khoido2003/Animal-Classification-FE">
            Star on Github ❤
          </a>
        </Button>
      </div>
    </div>
  );
};
