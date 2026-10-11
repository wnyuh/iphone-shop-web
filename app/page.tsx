"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BeeLogo } from "@/components/bee-logo";

// Danh sách poster phim trong khối Carousel giải trí
const MOVIES = [
  {
    id: 1,
    title: "ĐƯỜNG VỀ CÕI CHẾT",
    genre: "Hành động kịch tính • Mùa 2",
    description: "Khi mọi lối thoát đều bị bủa vây, hy vọng là vũ khí duy nhất.",
    bgImage:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "KẾ HOẠCH BẢO VỆ",
    genre: "Giật gân tâm lý • Chiếu rạp độc quyền",
    description: "Một bí mật có thể làm sụp đổ cả một đế chế ngầm.",
    bgImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "VỆ BINH NGÂN HÀ",
    genre: "Khoa học viễn tưởng • Bom tấn",
    description: "Chuyến du hành vượt qua rìa của không gian và thời gian.",
    bgImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "SÁNG TẠO ĐỘT PHÁ",
    genre: "Phim tài liệu đoạt giải",
    description: "Hành trình của những bộ óc đã làm thay đổi cách nhân loại kết nối.",
    bgImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MOVIES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full bg-black text-white">
      {/* DẢI BĂNG (RIBBON BANNER) NGAY DƯỚI HEADER */}
      <div className="bg-[#1d1d1f] border-b border-neutral-800 text-center py-3 px-4 text-[12px] text-neutral-300">
        <span>Thanh toán hàng tháng thật dễ dàng với lãi suất 0% khi mua sắm trực tuyến. </span>
        <Link href="#" className="text-[#2997ff] hover:underline font-normal inline-flex items-center ml-1">
          Tìm hiểu thêm &gt;
        </Link>
      </div>

      {/* ========================================================= */}
      {/* 2. CÁC KHỐI HERO BANNERS (TRÀN MÀN HÌNH, XẾP DỌC)          */}
      {/* ========================================================= */}

      {/* HERO 1: iPhone 18 Pro */}
      <section className="relative w-full h-[640px] md:h-[690px] bg-black text-white flex flex-col items-center justify-between text-center pt-16 pb-8 px-4 overflow-hidden mb-3">
        <div className="z-10 max-w-xl mx-auto space-y-2">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white">iPhone 18 Pro</h2>
          <p className="text-xl md:text-2xl text-neutral-300 font-normal">Pro hơn hẳn.</p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="#learn-more" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-5 py-2 text-sm font-normal transition-colors">Tìm hiểu thêm</Link>
            <Link href="/login" className="border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 rounded-full px-5 py-2 text-sm font-normal transition-colors">Mua</Link>
          </div>
        </div>

        <div className="relative w-full max-w-[900px] h-[360px] flex items-center justify-center">
          <div className="w-[320px] md:w-[480px] h-[220px] md:h-[260px] rounded-[44px] bg-gradient-to-tr from-neutral-800 via-neutral-700 to-neutral-900 border-[6px] border-neutral-600 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative flex items-center justify-center overflow-hidden rotate-[-4deg] hover:rotate-0 transition-transform duration-700">
            <div className="absolute top-6 left-6 w-24 h-24 rounded-3xl bg-neutral-900/90 border border-neutral-600/50 p-2 grid grid-cols-2 gap-2 shadow-inner">
              <div className="w-8 h-8 rounded-full bg-black border-2 border-neutral-500 shadow-md"></div>
              <div className="w-8 h-8 rounded-full bg-black border-2 border-neutral-500 shadow-md"></div>
              <div className="w-8 h-8 rounded-full bg-black border-2 border-neutral-500 shadow-md col-span-2 mx-auto"></div>
            </div>
            <div className="text-neutral-400/40 opacity-80">
              <BeeLogo className="w-16 h-16" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* HERO 2: iPhone Duo */}
      <section className="relative w-full h-[640px] md:h-[690px] bg-[#f5f5f7] text-neutral-900 flex flex-col items-center justify-between text-center pt-16 pb-8 px-4 overflow-hidden mb-3">
        <div className="z-10 max-w-xl mx-auto space-y-2">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">iPhone Duo</h2>
          <p className="text-xl md:text-2xl text-neutral-600 font-normal">Xin chào, xin chào.</p>
          <p className="text-xs text-neutral-500">Đặt trước từ 10.10. Có hàng từ 17.10.</p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="#learn-more" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-5 py-2 text-sm font-normal transition-colors">Tìm hiểu thêm</Link>
            <Link href="/login" className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full px-5 py-2 text-sm font-normal transition-colors">Mua</Link>
          </div>
        </div>

        <div className="relative w-full max-w-[800px] h-[360px] flex items-center justify-center">
          <div className="flex items-center gap-1 shadow-2xl rounded-[36px] overflow-hidden p-2 bg-neutral-200">
            <div className="w-[160px] md:w-[220px] h-[260px] md:h-[300px] rounded-[28px] bg-white border border-neutral-300 p-4 flex flex-col justify-between shadow-md">
              <span className="text-xs text-neutral-400 font-semibold tracking-widest uppercase">Màn hình ngoài</span>
              <div className="text-3xl font-light text-neutral-800">09:41</div>
              <div className="text-xs text-neutral-500">Thứ Sáu, 2 tháng 10</div>
            </div>
            <div className="w-2.5 h-[280px] bg-neutral-400 rounded-full shadow-inner"></div>
            <div className="w-[160px] md:w-[220px] h-[260px] md:h-[300px] rounded-[28px] bg-white border border-neutral-300 p-4 flex flex-col justify-center items-center shadow-md">
              <BeeLogo className="w-12 h-12 text-neutral-800 mb-2" />
              <span className="text-sm font-medium text-neutral-700">Màn hình gập đôi</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO 3: Watch Series 12 */}
      <section className="relative w-full h-[640px] md:h-[690px] bg-black text-white flex flex-col items-center justify-between text-center pt-16 pb-8 px-4 overflow-hidden mb-3">
        <div className="z-10 max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-white">
            <BeeLogo className="w-3.5 h-3.5" />
            <span>WATCH SERIES 12</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-xl mx-auto">
            Cảm biến nhịp tim tiên tiến nhất trên cổ tay bạn.
          </h2>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="#learn-more" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-5 py-2 text-sm font-normal transition-colors">Tìm hiểu thêm</Link>
            <Link href="/login" className="border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 rounded-full px-5 py-2 text-sm font-normal transition-colors">Mua</Link>
          </div>
        </div>

        <div className="relative w-full max-w-[800px] h-[340px] flex items-center justify-center gap-6">
          <div className="w-[180px] md:w-[210px] h-[250px] md:h-[280px] rounded-[48px] bg-neutral-900 border-4 border-neutral-700 p-4 flex flex-col justify-between shadow-2xl">
            <div className="text-xs text-red-500 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              72 BPM
            </div>
            <div className="h-16 flex items-center justify-center">
              <svg className="w-full h-12 stroke-red-500 fill-none" viewBox="0 0 100 40">
                <path d="M0,20 L30,20 L35,5 L42,35 L48,15 L52,24 L56,20 L100,20" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-[11px] text-neutral-400 text-center">Theo dõi điện tâm đồ</div>
          </div>

          <div className="w-[180px] md:w-[210px] h-[250px] md:h-[280px] rounded-[48px] bg-neutral-900 border-4 border-neutral-700 p-4 flex flex-col justify-between shadow-2xl hidden sm:flex">
            <div className="text-xs text-emerald-400 font-semibold">TẬP LUYỆN</div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">450</div>
              <div className="text-[11px] text-neutral-400">CALORIES TIÊU THỤ</div>
            </div>
            <div className="text-[11px] text-emerald-400 text-center">Mục tiêu sắp hoàn thành</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. KHỐI DẠNG LƯỚI (GRID SECTION - 2 CỘT 50/50)             */}
      {/* ========================================================= */}
      <section className="max-w-[1280px] mx-auto px-3 py-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Ô 1 (Trái): Nền đen, WATCH ULTRA 4 */}
        <div className="h-[520px] rounded-3xl bg-black text-white p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold tracking-widest uppercase">
              <BeeLogo className="w-3 h-3" />
              <span>WATCH ULTRA 4</span>
            </div>
            <p className="text-lg md:text-xl text-neutral-300 font-normal">Sức mạnh bền bỉ cho mọi thử thách.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-48 h-56 rounded-[44px] bg-neutral-900 border-4 border-amber-600/80 p-4 flex flex-col justify-center items-center shadow-2xl">
            <div className="w-24 h-24 rounded-full border-4 border-amber-500 flex items-center justify-center text-amber-500 font-mono text-sm">
              LA BÀN 360°
            </div>
          </div>
        </div>

        {/* Ô 2 (Phải): Nền xám rất nhạt, Mac mini */}
        <div className="h-[520px] rounded-3xl bg-[#f5f5f7] text-neutral-900 p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Mac mini</h3>
            <p className="text-lg md:text-xl text-neutral-600 font-normal">Kích thước nhỏ. Năng lực khổng lồ.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-48 h-32 rounded-2xl bg-neutral-300 border border-neutral-400/60 shadow-xl flex items-center justify-center relative">
            <BeeLogo className="w-10 h-10 text-neutral-600" />
            <span className="absolute bottom-2 text-[10px] text-neutral-500 uppercase tracking-widest font-mono">M4 Pro</span>
          </div>
        </div>

        {/* Ô 3 (Trái): Nền xanh dương nhạt, MacBook Air */}
        <div className="h-[520px] rounded-3xl bg-[#e8f1fc] text-neutral-900 p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">MacBook Air</h3>
            <p className="text-lg md:text-xl text-neutral-700 font-normal">Gọn gàng ngỡ ngàng. Sức mạnh M4.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-72 h-44 rounded-t-xl bg-neutral-900 border-4 border-b-0 border-neutral-400 p-2 flex items-center justify-center shadow-2xl">
            <div className="w-full h-full bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-t flex items-center justify-center text-white font-medium text-xs">
              Màn hình Liquid Retina
            </div>
          </div>
        </div>

        {/* Ô 4 (Phải): Nền xanh dương nhạt hơn, iPad air */}
        <div className="h-[520px] rounded-3xl bg-[#f0f4f9] text-neutral-900 p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">iPad air</h3>
            <p className="text-lg md:text-xl text-neutral-700 font-normal">Hai kích cỡ. Chip nhanh hơn. Luôn tươi mới.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-56 h-64 rounded-2xl bg-white border-2 border-neutral-300 p-2 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-200 rounded-xl flex items-center justify-center text-neutral-700 text-xs font-medium">
              Apple Pencil Pro Ready
            </div>
          </div>
        </div>

        {/* Ô 5 (Trái): Nền gradient tối, AirPods 5 */}
        <div className="h-[520px] rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">AirPods 5</h3>
            <p className="text-lg md:text-xl text-neutral-300 font-normal">Chống ồn chủ động đỉnh cao.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-44 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <div className="w-20 h-28 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-neutral-900"></div>
            </div>
          </div>
        </div>

        {/* Ô 6 (Phải): Nền trắng, Mac Studio */}
        <div className="h-[520px] rounded-3xl bg-[#fbfbfd] border border-neutral-200/60 text-neutral-900 p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="space-y-1.5 z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">Mac Studio</h3>
            <p className="text-lg md:text-xl text-neutral-600 font-normal">Trạm năng lượng sáng tạo tối thượng.</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link href="#" className="bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-1.5 text-xs font-normal">Tìm hiểu thêm</Link>
              <Link href="/login" className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 rounded-full px-4 py-1.5 text-xs font-normal">Mua</Link>
            </div>
          </div>
          <div className="w-60 h-40 rounded-3xl bg-neutral-200 border border-neutral-300 shadow-xl flex items-center justify-center relative">
            <BeeLogo className="w-12 h-12 text-neutral-700" />
            <span className="absolute bottom-2 text-[10px] text-neutral-600 uppercase font-mono tracking-widest">M4 Max / M4 Ultra</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. KHỐI CAROUSEL (APPLE TV+)                              */}
      {/* ========================================================= */}
      <section id="entertainment" className="py-14 bg-black overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BeeLogo className="w-5 h-5 text-white" />
            <span className="text-xl font-semibold tracking-tight text-white">Apple TV+</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? MOVIES.length - 1 : prev - 1))}
              aria-label="Slide trước"
              className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % MOVIES.length)}
              aria-label="Slide tiếp theo"
              className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[1240px] mx-auto h-[480px] md:h-[540px] overflow-hidden rounded-3xl">
          {MOVIES.map((movie, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.2) 60%), url(${movie.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bottom-10 left-8 md:left-14 max-w-xl space-y-3">
                  <span className="text-xs uppercase tracking-widest font-semibold text-neutral-300">
                    {movie.genre}
                  </span>
                  <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                    {movie.title}
                  </h4>
                  <p className="text-sm md:text-base text-neutral-300 font-normal">
                    {movie.description}
                  </p>
                  <div className="pt-2">
                    <button className="bg-white text-black hover:bg-neutral-200 rounded-full px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg">
                      <Play className="w-4 h-4 fill-black" />
                      <span>Xem ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          {MOVIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Chuyển tới slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "w-8 bg-white" : "w-2 bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Tạm dừng tự động chạy" : "Tiếp tục tự động chạy"}
            className="ml-3 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </section>
    </div>
  );
}
