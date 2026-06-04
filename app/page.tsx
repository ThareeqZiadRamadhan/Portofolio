import dynamic from 'next/dynamic';
import AnimatedContent from '@/app/components/AnimatedContent/AnimatedContent';
import DecryptedText from '@/app/components/DecryptedText/DecryptedText';
import ElectricBorder from './components/ElectricsBorder/ElectricBorder';
import Magnet from '@/app/components/Magnet/Magnet';
import RotatingText from '@/app/components/RotatingText/RotatingText';
import TextType from '@/app/components/TextType/TextType';
import FooterHomepage from '@/app/components/FooterHomepage/FooterKhususHomepage';
import ScrollProgressiveBlur from './components/ScrollBlur';
import HomepageToast from './components/HomepageToast';

const Lanyard = dynamic(
  () => import('@/app/components/Lanyard/Lanyard'), 
  { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><p>Loading 3D Model...</p></div>
  }
);

export default function Home() {
  return (
 
      <div className="container mx-auto h-full flex items-center justify-center p-4 md:p-8">
        <HomepageToast />
        <ScrollProgressiveBlur maxBlur={10} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center">

          {/* === KOLOM KIRI === */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <AnimatedContent
              distance={150}
              direction="horizontal"
              duration={1.2}
              ease="bounce.out"
              delay={0.3}
            >
              <div className="flex flex-col gap-6 items-start">

                {/* Bagian Nama & Peran */}
                <div className="flex items-center gap-3">
                  {/* DITAMBAHKAN: dark:text-white */}
                  <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white whitespace-nowrap transition-colors duration-300">Thareeq Ziad R</h1>
                  <RotatingText
                  texts={['Web Developer', 'Front-end', 'Back-end', 'Fullstack', 'Data Analyst', 'Machine Learning']}
                  mainClassName="px-3 md:px-4 bg-[#0097B2] dark:bg-[#006A7D] text-white overflow-hidden py-1 md:py-2 justify-center rounded-lg text-2xl font-bold inline-flex transition-colors duration-300"
                />
                </div>

                {/* Bagian Sapaan Animasi */}
                <TextType
                  as="h2"
                  className="font-bold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                  text={["Hi !, Nice to meet u 😊", "Thanks for dropping by!", "Interested in working together? Reach me out🔥"]}
                  textColors={["#FF0707","#0B9710","#0097B2"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                />

                {/* Bagian Deskripsi */}
                {/* DITAMBAHKAN: dark:text-gray-200 */}
                <div className="font-bold text-2xl text-black dark:text-gray-200 md:text-lg transition-colors duration-300">
                  <DecryptedText
                    text="I am a Full-Stack Developer specializing in building high-performance modern web applications. With my favorite technology stack, including TypeScript, Next.js, and PostgreSQL, I am obsessed with writing clean, efficient, and manageable code. From the client side to the server, my focus is on creating an architecture that not only meets current needs but is also ready for future growth."
                    speed={60}
                    maxIterations={40}
                    characters="ABCD1234!?ZIADGANTENGPRO"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                  />
                </div>

                {/* Bagian Tombol Aksi (CV & More About Me) */}
                <div className="mt-4 flex items-center gap-4">
                  <ElectricBorder color="#0097B2" speed={2} chaos={0.5} style={{ borderRadius: '8px' }}>
                    <Magnet magnetStrength={50}>
                      {/* DITAMBAHKAN: dark:border-white dark:text-white */}
                      <a 
                        href="/assets/cv/CV-Ziad.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-black dark:border-white hover:bg-[#007c92] text-black dark:text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm-2.5 8a2.5 2.5 0 0 0 -2.5 2.5v3a2.5 2.5 0 1 0 5 0a1 1 0 0 0 -2 0a.5 .5 0 1 1 -1 0v-3a.5 .5 0 1 1 1 0a1 1 0 0 0 2 0a2.5 2.5 0 0 0 -2.5 -2.5m6.743 .03a1 1 0 0 0 -1.213 .727l-.53 2.119l-.53 -2.119a1 1 0 1 0 -1.94 .486l1.5 6c.252 1.01 1.688 1.01 1.94 0l1.5 -6a1 1 0 0 0 -.727 -1.213m-1.244 -7.031l4.001 4.001h-4z" /></svg>
                        CV
                      </a>
                    </Magnet>
                  </ElectricBorder>
                  <Magnet magnetStrength={30}>
                    {/* DITAMBAHKAN: dark:text-white */}
                    <a href="/about" className="font-semibold text-black dark:text-white hover:opacity-80 flex items-center gap-2 transition-opacity duration-300 text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00D471" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        More About Me
                      </span>
                    </a>
                  </Magnet>
                </div>
              </div>
            </AnimatedContent>
            
          </div>

          {/* === KOLOM KANAN (3D Lanyard) === */}
          <div className="hidden md:flex md:col-span-6 items-center justify-center h-full">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
          </div>

        </div>
        </ScrollProgressiveBlur>
      </div>

  );
}