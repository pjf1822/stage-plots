import React from "react";

const tipsAndTricks = [
  "Use Ctrl C + Ctrl V for copy paste",
  "Use Ctrl Z for undo",
  "Drums first vocals last!",
  "The monitor engineer needs stage positions, not names, on the input list.",
  "Try writing down stage right vocal not somethingh like 'Steve' vocal! We don't need names, we need positions",
  `"Drums" is not an input`,
  "Ctrl Z for undo",
  "No duct tape on the stage, please!",
  "Don't forget to save!",
  "If you have any suggestions for sure reach out. Im an independent dev. pforbeswebdev@gmail.com",
  "For some reason the tech im taking the screenshot with to convert to image/pdf is extrememly slow in Safari. I would avoid Sarafi.",
  "Apparently it doesnt work on ipad either. I just built this on Chrome.",
];

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl p-6 bg-black text-white rounded-lg border-2 border-white">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Tips and Tricks
        </h1>
        <ul className="list-inside list-disc space-y-2 text-lg">
          {tipsAndTricks.map((tip, index) => (
            <li key={index} className="pl-4" style={{ fontFamily: "Urbanist" }}>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
