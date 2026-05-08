import React from 'react'
import { FaLaptop, FaShieldAlt } from 'react-icons/fa'
import { GiGate, GiMagicBroom } from 'react-icons/gi'
import { IoWifi } from 'react-icons/io5'
import { LuCloudSun } from 'react-icons/lu'
import { MdConnectedTv } from 'react-icons/md'
import { TbDeviceCctv } from 'react-icons/tb'
import { TiLightbulb } from 'react-icons/ti'

const Marquee = () => {
  return (
    <div
        className='relative border-y border-ink-200/50 bg-cream-300/60 py-5 text-ink-400 overflow-hidden'
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
    >
       <div className="flex gap-10 lg:gap-16 animate-marquee">
            <div className="flex gap-10 lg:gap-16 shrink-0 items-center">
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    {/* <FaShieldAlt size={20}/> */}
                    <TbDeviceCctv size={20}/>
                    24/7 Security
                </span>
                <span className='flex flex-col gap-0.5 vsm:text-sm text-xs items-center'>
                    <TiLightbulb size={20}/>
                    Backup Power
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <IoWifi size={20}/>
                    Reliable Wifi
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <GiMagicBroom size={20}/>
                    Daily Housekeeping
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <FaLaptop size={20}/>
                    Workspace Setup
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <MdConnectedTv size={20}/>
                    Smart TV with Streaming
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <LuCloudSun size={20}/>
                    Climate Control
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <GiGate size={20}/>
                    Gated Parking
                </span>
            </div>
            <div className="flex gap-10 lg:gap-16 shrink-0 items-center">
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    {/* <FaShieldAlt size={20}/> */}
                    <TbDeviceCctv size={20}/>
                    24/7 Security
                </span>
                <span className='flex flex-col gap-0.5 vsm:text-sm text-xs items-center'>
                    <TiLightbulb size={20}/>
                    Backup Power
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <IoWifi size={20}/>
                    Reliable Wifi
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <GiMagicBroom size={20}/>
                    Daily Housekeeping
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <FaLaptop size={20}/>
                    Workspace Setup
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <MdConnectedTv size={20}/>
                    Smart TV with Streaming
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <LuCloudSun size={20}/>
                    Climate Control
                </span>
                <span className="flex flex-col gap-0.5 vsm:text-sm text-xs items-center">
                    <GiGate size={20}/>
                    Gated Parking
                </span>
            </div>
       </div>
    </div>
  )
}

export default Marquee