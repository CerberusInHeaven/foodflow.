"use client"


export default function Home() {
  return (
     <main className="flex-grow"style={{
            backgroundImage: "url('/pattern.png')",
            backgroundSize: "center",
            backgroundPosition: "center",
          }}>
         
          <div className="container mx-auto px-4 py-32">
            <h1 className="text-6xl font-bold text-black mb-4">FoodFlow</h1>
            <p className="text-4xl text-black">catchphrase aqui</p>
          </div>
      
      </main>
  )
}
