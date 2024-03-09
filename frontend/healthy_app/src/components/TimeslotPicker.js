"use client";
const TimeslotPicker = () => {
  return (
    <div className="lg:col-span-2 xl:col-auto">
      <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-4 rounded-2xl py-4 dark:bg-trueGray-800">
        <div class="flex-row items-center mb-4">
          <div>
            <input
              id="timeslot1"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot1"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              09:00 - 10:00
            </label>
          </div>

          <div>
            <input
              id="timeslot2"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot2"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              10:00 - 11:00
            </label>
          </div>

          <div>
            <input
              id="timeslot3"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot3"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              11:00 - 12:00
            </label>
          </div>

          <div>
            <input
              id="timeslot4"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot4"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              13:00 - 14:00
            </label>
          </div>

          <div>
            <input
              id="timeslot5"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot5"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              14:00 - 15:00
            </label>
          </div>

          <div>
            <input
              id="timeslot6"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot6"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              15:00 - 16:00
            </label>
          </div>

          <div>
            <input
              id="timeslot7"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot7"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              16:00 - 17:00
            </label>
          </div>

          <div>
            <input
              id="timeslot8"
              type="radio"
              value=""
              name="default-radio"
              class="w-8 h-4 "/>
            <label
              for="timeslot8"
              class="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              17:00 - 18:00
            </label>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default TimeslotPicker;
