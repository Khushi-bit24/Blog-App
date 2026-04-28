"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { assets } from "@/assets/assets";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchBlog = async () => {
      try {
        // ✅ FIX: correct API call format
        const res = await fetch(`/api/blog?id=${params.id}`);
        const result = await res.json();

        console.log("API DATA:", result);

        setData(result.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (!data) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-200 py-2 px-4 text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src={assets.logoicon} width={60} height={60} alt="" />
        </Link>

        <button className="flex items-center gap-1 text-sm px-3 py-1 border border-black shadow-[-7px_7px_0px_#000000] bg-white">
          Get Started
          <Image src={assets.arrowicon} alt="" width={16} height={16} />
        </button>
      </div>

      {/* TITLE */}
      <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
          {data.title}
        </h1>
      </div>

      <div className="mx-5 max-w-[500px] md:mx-auto mt-[-80px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={900}
          height={520}
          alt=""
        />

        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <p>{data.description}</p>

        <h3 className="my-5 text-[18px] font-semibold">
          Step 1: Reflection and Goal Setting
        </h3>

        <p className="my-3">
          Lifestyle reflects the way people live, think, and make daily choices
          that shape their overall well-being...
        </p>

        <div className="my-24">
          <p className="font-bold my-4">
            Share this article on social media
          </p>

          <div className="flex">
            <Image src={assets.facebookicon} width={50} alt="" />
            <Image src={assets.googleicon} width={50} alt="" />
            <Image src={assets.twittericon} width={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}