
import Footer from "@/components/Footer"
import Blogitem from "@/components/Blogitem";
import Bloglist from "@/components/Bloglist";
import Header from "@/components/Header";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
    <ToastContainer theme ="dark"/>
    <Header/>
    <Bloglist/>
    <Footer/>
    </ >
   
  )
}
