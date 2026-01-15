"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { assets, blog_data } from "@/assets/assets";
import Link from "next/link";


export default function Page() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    console.log("PARAM ID:", params.id); // DEBUG

    const blog = blog_data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (blog) {
      setData(blog);
    }
  }, [params.id]);

  if (!data) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-200 py-2 px-4 text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Link href='/'>
        <Image src={assets.logoicon} width={60} height={60} alt="" />
         </Link>

        <button className="flex items-center gap-1 text-sm px-3 py-1 border border-black shadow-[-7px_7px_0px_#000000] bg-white">
          Get Started
          <Image src={assets.arrowicon} alt="" width={16} height={16} />
        </button>
      </div>

      {/* TITLE */}
      <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl  font-semibold max-w-[700px] mx-auto">{data.title}</h1>
      </div>
      <div className="mx-5 max-w-[500px] md:mx-auto mt-[-80px] mb-10">
        <Image className="border-4 border-white" src = {data.image} width={900} height={520} alt=''/>
        <h1 className="my-8 text-[26px] font -semibold"> Introduction:</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font- semibold"> step1: reflection and goal setting</h3>
        <p className="my-3">Lifestyle reflects the way people live, think, and make daily choices that shape their overall well-being. It includes habits related to health, work, relationships, food, fitness, and mental peace. A balanced lifestyle focuses on maintaining physical health through proper nutrition and exercise, while also caring for mental and emotional well-being through rest, hobbies, and positive social connections.</p>
        <p className="my-3">Lifestyle reflects the way people live, think, and make daily choices that shape their overall well-being. It includes habits related to health, work, relationships, food, fitness, and mental peace. A balanced lifestyle focuses on maintaining physical health through proper nutrition and exercise, while also caring for mental and emotional well-being through rest, hobbies, and positive social connections.</p>
        
        <h3 className="my-5 text-[18px] font- semibold"> step1: reflection and goal setting</h3> 
        <p className="my-3">A healthy lifestyle is not about strict rules or perfection, but about creating habits that support long-term well-being. Simple actions like waking up early, staying hydrated, eating balanced meals, and taking breaks from screens can make a big difference.</p>
        <p className="my-3">Managing time effectively and maintaining a positive mindset helps individuals stay focused and motivated. When lifestyle choices are aligned with personal goals, life becomes more meaningful and stress-free.</p>
        
        <div className="my-24">
          <p className="font-black font font-semibold my-4"> share this article on social media</p>
          <div className="flex">
            <Image src={assets.facebookicon} width={50} alt =''/>
            <Image src={assets.googleicon} width={50} alt =''/>
            <Image src={assets.twittericon} width={50} alt =''/>


          </div>
          
        </div>
      </div>
    </div>
    
  );
}
