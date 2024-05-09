import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";

export const MainContent = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] =
    useState<string>("No file chosen");
  const [result, setResult] = useState<{
    best_prob: number;
    predicted_class: string;
    predicted_id: number;
    predictor_name: string;
  } | null>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("No file chosen");
    }
  };

  const classifyImage = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file_upload", file);

    fetch("http://localhost:8000/animal_classification/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-main h-full pb-10 sm:h-screen px-3 pt-32 lg:pt-40 ">
      <div
        className="m-auto max-w-screen-xl flex justify-evenly items-center lg:gap-2 xl:gap-6 sm:flex-row flex-col 
      "
      >
        <div className=" px-3 lg:px-10">
          <h1 className="text-[1.7rem] lg:text-[3rem] font-bold mb-3">
            AnimalRecogAPI 🤖
          </h1>
          <p className="mb-5 text-base lg:text-lg">
            Using the latest advancements in machine learning and artificial
            intelligence, our model has been meticulously trained on vast
            datasets of animal images and characteristics.
          </p>

          <div className="flex flex-col justify-center items-start">
            <p className="flex items-center justify-center gap-1 font-semibold">
              <CheckIcon className="text-red-500 font-bold w-5 h-5" /> Really
              fast and free to run
            </p>
            <p className="flex items-center justify-center gap-1 font-semibold">
              <CheckIcon className="text-red-500 font-bold w-5 h-5" /> Pretty
              accurate
            </p>
            <p className="flex items-center justify-center gap-1 font-semibold">
              <CheckIcon className="text-red-500 font-bold w-5 h-5" />
              100% open-source
            </p>
          </div>

          <div className="mb-20 mt-20 border-2 border-black rounded-md h-[80px] flex justify-center items-start px-4 flex-col gap-3 ">
            <p className="font-semibold relative">
              Result:{" "}
              <span className="text-red-500">
                {/* RESULT DISPLAY HERE */}

                {result && result!.predicted_class}
              </span>
              <img
                src="/try-it.png"
                alt="arrow"
                className="w-50 block absolute top-[-3rem] left-0 "
              />
            </p>

            <p className="font-semibold">
              Score: <span>{result && result!.best_prob}</span>
            </p>
          </div>
        </div>

        <div className="w-full h-[460px] border-2 border-black p-2 rounded-md py-5 relative">
          <img
            className="absolute block top-[-4rem] w-60 right-0"
            src="/your-image.png"
            alt="image"
          />

          <div className="flex items-center">
            <p className="text-white  bg-orange-400 px-3 py-1 rounded-sm text-xs lg:text-sm font-bold">
              POST
            </p>
            <div className="mx-2 h-6 w-[1px] bg-gray-500"></div>

            <p className="text-xs text-gray-500 font-semibold">
              http://localhost:8000/animal_classification/predict
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="file-label">
              <input
                type="file"
                id="fileInput"
                className="file-input"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              <span className="file-custom-button">Choose File</span>
              <span className="file-selected-name">{selectedFileName}</span>
            </label>

            <div className="m-auto gap-3 flex flex-col w-[320px] h-[320px]">
              <div className=" border-dashed border-2 border-black w-[320px] h-[320px]">
                {/* PICTURE SHOW UP HERE */}
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <Button className="bg-red-500 relative" onClick={classifyImage}>
                Classify Image
                <p className="w-50 block absolute top-[-7rem] left-[-6rem] text-[2rem]">
                  😋
                </p>
                <img
                  src="/arrow.png"
                  alt="arrow"
                  className="w-50 block absolute top-[-3rem] left-[-6rem] rotate-45"
                />{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 right-20  text-gray-400 text-xs">
        AI Model Designed and Crafted by Nguyen Tien Anh{" "}
      </div>
    </div>
  );
};
