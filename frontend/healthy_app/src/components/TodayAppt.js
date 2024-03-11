import React from 'react'
import userOneImg from "../../public/doc1.jpeg";
import Image from "next/image";

const TodayAppt = () => {
  return (
<div className="lg:col-span-2 xl:col-auto bg-gray-200 dark:bg-gray-700 rounded-2xl py-8 px-2 flex flex-col items-center mt-6">
      {/* first card */}
      <div className="flex flex-col justify-between w-96 h-full bg-white px-5 rounded-2xl py-1 pb-10 dark:bg-trueGray-800 mb-10 mt-4">
        <Avatar 
		
		name="Jessica Chan" 
		title="Meical History: None"
		date= "Tue, May 23"
		time="11:30am"
		 />
        
      </div>

		{/* second card */}
		<div className="flex flex-col justify-between w-96 h-full bg-white px-5 rounded-2xl py-1 pb-10 dark:bg-trueGray-800 mb-10 mt-4">
        <Avatar 
		
		name="Henry Lim" 
		title="Medical History: Asthma"
		date= "Tue, May 23"
		time="11:30am"
		 />
        
      </div>

    </div>
  );
};

function Avatar(props) {
    return (
        <div className="flex items-center mt-8 space-x-3">
            <div>
                <div className="text-xl font-semibold">{props.name}</div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">
                    {props.title}
                </div>
                <div className="text-lg mt-1"> {/* Added mt-1 for spacing */}
                    
                    <div className="text-lg">
						{props.date}, {props.time}
                        <button
              type="button"
              className="px-3 py-1 text-sm text-white focus:outline-none bg-blue-950 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 float-right  mx-6 " // Added styles for positioning
            >
              Start
            </button>
                        
                    </div>
                    
                    
					
                </div>
            </div>

            {/* <button
          type="button"
          class="mx-8 p-3 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 float-right"
        >
          Confirm Appointment
        </button> */}



            {/* <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                <Image
                    src={props.image}
                    width="100"
                    height="100"
                    alt="Avatar"
                    placeholder="blur"
                />
            </div> */}

			
        </div>
  )
}

export default TodayAppt
