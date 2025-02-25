"use client";

import React from "react";

const PreviewInputList = ({
  inputs,
  formData,
}: // plotSettings,
{
  inputs: any;
  formData: any;
  // plotSettings: any;
}) => {
  const rowsPerColumn = 16;
  let firstColumn = inputs.slice(0, rowsPerColumn);
  let secondColumn = inputs.slice(rowsPerColumn, rowsPerColumn * 2);
  let thirdColumn = inputs.slice(rowsPerColumn * 2);
  const hasSecondColumn = secondColumn.length > 0;
  const hasThirdColumn = thirdColumn.length > 0;

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{ overflow: "hidden" }}
    >
      <div
        className={`overflow-x-auto w-full mb-6 grid ${
          hasThirdColumn
            ? "grid-cols-1 sm:grid-cols-3"
            : hasSecondColumn
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1"
        } gap-4`}
        style={{ overflow: "hidden" }}
      >
        <div
          className={`overflow-x-auto w-full mb-6 grid ${
            hasThirdColumn
              ? "grid-cols-1 sm:grid-cols-3"
              : hasSecondColumn
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          } gap-4`}
          style={{ overflow: "hidden" }}
        >
          <table
            className="w-full border-collapse"
            style={{ overflow: "hidden" }}
          >
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg w-11">
                  Ch
                </th>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                  Name
                </th>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg  ">
                  Mic
                </th>
                {formData.is_stands_showing && (
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                    Stand
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {firstColumn.map((input: any, index: number) => (
                <tr key={input.id}>
                  <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg w-11">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                    {input.name}
                  </td>
                  <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                    {input.mic}
                  </td>
                  {formData.is_stands_showing && (
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                      {input.stand}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hasSecondColumn && (
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg w-11">
                    Ch
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                    Name
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                    Mic
                  </th>
                  {formData.is_stands_showing && (
                    <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                      Stand
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {secondColumn.map((input: any, index: number) => (
                  <tr key={input.id}>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg w-11">
                      {index + rowsPerColumn + 1}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                      {input.name}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                      {input.mic}
                    </td>
                    {formData.is_stands_showing && (
                      <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                        {input.stand}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {hasThirdColumn && (
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg w-11">
                    Ch
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                    Name
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                    Mic
                  </th>
                  {formData.is_stands_showing && (
                    <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left text-lg">
                      Stand
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {thirdColumn.map((input: any, index: number) => (
                  <tr key={input.id}>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg w-11">
                      {index + rowsPerColumn * 2 + 1}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                      {input.name}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                      {input.mic}
                    </td>
                    {formData.is_stands_showing && (
                      <td className="border border-gray-300 p-0 pl-2 pb-4 text-lg">
                        {input.stand}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewInputList;
