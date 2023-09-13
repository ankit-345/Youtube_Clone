import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faFireFlameCurved,
  faThumbsUp, faClock,
  faMusic, faGamepad,
  faTrophy, faLightbulb,
  faNewspaper, faGear,
  faFlag, faCircleQuestion,
  faMessage,
} from '@fortawesome/free-solid-svg-icons'

const LeftSection = ({ menuSwitch, setMenuSwitch }) => {
  
  const sectionIcons_1_batch = [
    {
      id: 1,
      icon_name: faHouse,
      para_text: 'Home'
    },
    {
      id: 2,
      icon_name: faThumbsUp,
      para_text: 'Liked videos'
    },
    {
      id: 3,
      icon_name: faClock,
      para_text: 'Watch Later'
    },
  ]

  const sectionIcons_2_batch = [
    {
      id: 1,
      icon_name: faFireFlameCurved,
      para_text: 'Trending',
    },
    {
      id: 2,
      icon_name: faMusic,
      para_text: 'Music',
    },
    {
      id: 3,
      icon_name: faGamepad,
      para_text: 'Gaming',
    },
    {
      id: 4,
      icon_name: faTrophy,
      para_text: 'Sports',
    },
    {
      id: 5,
      icon_name: faLightbulb,
      para_text: 'Learning',
    },
    {
      id: 6,
      icon_name: faNewspaper,
      para_text: 'News',
    },
  ]

  const sectionIcons_3_batch = [
    {
      id: 1,
      icon_name: faGear,
      para_text: 'Settings',
    },
    {
      id: 2,
      icon_name: faFlag,
      para_text: 'Repost history',
    },
    {
      id: 3,
      icon_name: faCircleQuestion,
      para_text: 'Help',
    },
    {
      id: 4,
      icon_name: faMessage,
      para_text: 'Send feedback',
    },
  ]

  const sectionIcons_4_batch = [
    {
      id: 1,
      icon_name: faHouse,
      para_text: 'Home'
    },
    {
      id: 2,
      icon_name: faThumbsUp,
      para_text: 'Liked'
    },
    {
      id: 3,
      icon_name: faClock,
      para_text: 'Watch'
    },
    {
      id: 4,
      icon_name: faGear,
      para_text: 'Settings',
    },
  ]


  return (
    <>
    
      <div className={`z-50 md:z-0 ${menuSwitch ? 'w-3/5 md:w-60': 'w-0 md:w-20'} h-screen ${menuSwitch ? 'p-4' : 'p-0'} overflow-x-hidden fixed md:sticky top-16 left-0 scrollbar-thin scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-300 scrollbar-track-transparent bg-background-black`}>

      { menuSwitch ?

        <div>
        { sectionIcons_1_batch.map((item) => {
            return (
              <div key={item.id} className={`flex justify-start items-center ${ item.para_text === 'Home'? 'bg-gray-50 bg-opacity-5':'hover:bg-gray-50 hover:bg-opacity-5'} pr-4 pl-[6px] py-2 rounded-xl cursor-pointer `} onClick={() => setMenuSwitch(false)}>
                <FontAwesomeIcon icon={item.icon_name} className='w-[20%] ' />
                <p className='w-[80%] pl-4 text-base '>{item.para_text}</p>
              </div>
            )
          })
        }

        <div className='bg-gray-700 w-full h-[1px] mx-auto mt-4 '></div>

        <h3 className='pt-4 pb-3 px-4 '>Explore</h3>
        
        {  sectionIcons_2_batch.map((item) => {
            return (
              <div key={item.id} className='flex justify-start items-center hover:bg-gray-50 hover:bg-opacity-5 pr-4 pl-[6px] py-2 rounded-xl cursor-pointer  ' onClick={() => setMenuSwitch(false)}>
                <FontAwesomeIcon icon={item.icon_name} className='w-[20%] ' />
                <p className='w-[80%] pl-4 text-base '>{item.para_text}</p>
              </div>
            )
          })
        }   

        <div className='bg-gray-700 w-full h-[1px] mx-auto mt-4 mb-3  '></div>

        
        {  sectionIcons_3_batch.map((item) => {
            return (
              <div key={item.id} className='flex justify-start items-center hover:bg-gray-50 hover:bg-opacity-5 pr-4 pl-[6px] py-2 rounded-xl cursor-pointer  ' onClick={() => setMenuSwitch(false)}>
                <FontAwesomeIcon icon={item.icon_name} className='w-[20%]  ' />
                <p className='w-[80%] pl-4 text-base  '>{item.para_text}</p>
              </div>
            )
          })
        }

        <div className='bg-gray-700 w-full h-[1px] mx-auto mt-4 mb-3  '></div>
        <p className='text-gray-400 text-sm px-4  '>About Press Copyright Contact us Creators Advertise Developers</p>
        <p className='text-gray-400 my-4 text-sm px-4  '>Terms Privacy Policy & Safety How youTube works Test new features</p>
        <h6 className='text-gray-500 text-xs px-4  '>&copy; 2023 Google LLC</h6>
      </div>

        : 
          sectionIcons_4_batch.map((item) =>{
            return (
              <div key={item.id} className='flex flex-col justify-center items-center py-3 px-2 rounded-md hover:bg-gray-50 hover:bg-opacity-5 my-2 cursor-pointer  ' onClick={() => setMenuSwitch(false)}>
                <FontAwesomeIcon icon={item.icon_name} className='mb-2  ' />
                <p className='text-xs  '>{item.para_text}</p>
              </div>
            )
          })  
      }
      </div>
    </>
  )
}

export default LeftSection