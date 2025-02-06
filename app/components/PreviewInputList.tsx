"use client";

import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import TableSection from "./TableSection";

const PreviewInputList = ({ inputs }: { inputs: any }) => {
  const rowsPerColumn = 16;
  let firstColumn = inputs.slice(0, rowsPerColumn);
  let secondColumn = inputs.slice(rowsPerColumn, rowsPerColumn * 2);
  let thirdColumn = inputs.slice(rowsPerColumn * 2);
  const hasSecondColumn = secondColumn.length > 0;
  const hasThirdColumn = thirdColumn.length > 0;

  console.log(
    firstColumn,
    secondColumn,
    thirdColumn,
    hasSecondColumn,
    hasThirdColumn
  );
  return (
    <div className="flex flex-col items-center justify-center w-full  ">
      <div
        className={`overflow-x-auto w-full mb-6 grid ${
          hasThirdColumn
            ? "grid-cols-1 sm:grid-cols-3"
            : hasSecondColumn
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1"
        } gap-4`}
      >
        <div className={`w-full ${!hasSecondColumn ? "col-span-2" : ""}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                  Channel
                </th>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                  Name
                </th>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                  Mic
                </th>
                <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                  Stand
                </th>
              </tr>
            </thead>
            <tbody>
              {firstColumn.map((input: any, index: number) => (
                <tr key={input.id}>
                  <td className="border border-gray-300 p-0 pl-2 pb-4">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-0 pl-2 pb-4">
                    {input.name}
                  </td>
                  <td className="border border-gray-300 p-0 pl-2 pb-4">
                    {input.mic}
                  </td>
                  <td className="border border-gray-300 p-0 pl-2 pb-4">
                    {input.stand}
                  </td>
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
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Channel
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Mic
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Stand
                  </th>
                </tr>
              </thead>
              <tbody>
                {secondColumn.map((input: any, index: number) => (
                  <tr key={input.id}>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {index + rowsPerColumn + 1}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.name}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.mic}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.stand}
                    </td>
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
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Channel
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Mic
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-0 pl-2 pb-4 text-left">
                    Stand
                  </th>
                </tr>
              </thead>
              <tbody>
                {thirdColumn.map((input: any, index: number) => (
                  <tr key={input.id}>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {index + rowsPerColumn * 2 + 1}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.name}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.mic}
                    </td>
                    <td className="border border-gray-300 p-0 pl-2 pb-4">
                      {input.stand}
                    </td>
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
