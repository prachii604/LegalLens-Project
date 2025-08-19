export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-regal-beige via-regal-offwhite to-regal-sage flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-regal-burgundy mb-6">
        Welcome to Legal Lens
      </h1>
      <p className="text-lg text-regal-black mb-8">
        Securely manage, upload, and access all your contracts in one place.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="bg-regal-gold text-regal-black px-6 py-3 rounded-xl hover:bg-regal-sage transition">
          Get Started
        </a>
        <a href="/register" className="border border-regal-burgundy text-regal-burgundy px-6 py-3 rounded-xl hover:bg-regal-gold hover:text-regal-black transition">
          Register
        </a>
      </div>
    </div>
  )
}
