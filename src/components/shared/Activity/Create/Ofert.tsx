import { Listbox, Transition } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import React, { Fragment } from "react";
import { Input } from "../../Input/Input";
import { Textarea } from "../../Input/Textarea";
import { ActivityCreateData, HandleSetOfertData } from "./types";

interface OfertProps {
  data: ActivityCreateData["ofert"];
  handleSetData: HandleSetOfertData;
}

const conditionTypes = ["NEW", "USED", "UNKNOWN"];

export const Ofert: React.FC<OfertProps> = ({ data, handleSetData }) => {
  return (
    <>
      <div>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <Input
          name="title"
          id="title"
          required
          placeholder="Your title..."
          value={data.title}
          onChange={(e) => handleSetData("title", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description" className="sr-only">
          Your description
        </label>
        <Textarea
          name="description"
          id="description"
          required
          placeholder="Your description..."
          value={data.description}
          onChange={(e) => handleSetData("description", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="price" className="sr-only">
            Price
          </label>
          <Input
            name="price"
            id="price"
            type="number"
            inputMode="numeric"
            pattern="^\d*(\.\d{0,2})?$"
            min="0"
            required
            placeholder="Price..."
            value={data.price}
            onChange={(e) => handleSetData("price", parseFloat(e.target.value))}
          />
        </div>

        <div className="border-gray-200 focus-within:border-b-2 focus-within:border-indigo-600">
          <Listbox
            value={data.condition}
            onChange={(val) => handleSetData("condition", val)}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-base">
                <span className="block truncate">
                  Condition: {data.condition.toLowerCase()}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {conditionTypes.map((type, i) => (
                    <Listbox.Option
                      key={`condition-type-${i}`}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-indigo-100 text-indigo-900"
                            : "text-gray-900"
                        }`
                      }
                      value={type}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {type.toLowerCase()}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div>
        <label htmlFor="image" className="sr-only">
          Image
        </label>
        <Input
          name="image"
          id="image"
          type="image"
          required
          placeholder="Image..."
          value={data.image}
          onChange={(e) => handleSetData("image", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category" className="sr-only">
          Category
        </label>
        <Input
          name="category"
          id="category"
          required
          placeholder="Category..."
          value={data.category}
          onChange={(e) => handleSetData("category", e.target.value)}
        />
      </div>
    </>
  );
};
