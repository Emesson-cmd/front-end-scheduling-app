import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">ServiceBook</h1>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Easy Online Scheduling for Service Professionals</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage your barbershop, nail salon, or service business with our simple scheduling platform. 
          Let customers book appointments online, accept payments, and grow your business.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/sign-up?type=provider">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started as Provider</Button>
          </Link>
          <Link href="/browse">
            <Button size="lg" variant="outline">Browse Services</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 text-center">Why Choose ServiceBook?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">Easy Booking</h4>
              <p className="text-gray-600">Customers can see your availability and book appointments in seconds.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">Payment Processing</h4>
              <p className="text-gray-600">Accept payments securely with integrated Stripe payments.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">Manage Multiple Locations</h4>
              <p className="text-gray-600">Run multiple service locations from one dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
