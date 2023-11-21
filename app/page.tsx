import Hero from "@/components/main/Hero";
import AboutLoopso from "@/components/shared/AboutLoopso";

export default function Home() {
  return (
    <main className='h-full w-full'>
      <div className='flex flex-col h-[850px] gap-20'>
        <Hero />
        <AboutLoopso />
      </div>
    </main>
  )
}
