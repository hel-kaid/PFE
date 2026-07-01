import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold mb-5">
            📩 Contact Us
          </span>

          <h1 className="text-5xl font-black text-slate-900">
            We'd Love to Hear From You
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question, feedback, or need help? Our team is here to assist
            you. Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-3xl font-black mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <Mail className="text-orange-500" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-slate-600">
                      supportkidcoders@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
                    <Phone className="text-pink-500" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-slate-600">
                      +212 6 07 44 66 91
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <MapPin className="text-purple-500" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p className="text-slate-600">
                      sidi bernoussi
                      <br />
                      Casablanca, Morocco
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white p-8 shadow-xl">
              <MessageCircle className="w-10 h-10 mb-5" />

              <h3 className="text-2xl font-black mb-3">
                Need Quick Help?
              </h3>

              <p className="opacity-90">
                Our support team usually responds within 24 hours.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-200">

            <h2 className="text-3xl font-black mb-8">
              Send us a Message
            </h2>

            <form className="space-y-6">

              <div>
                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border border-slate-300 rounded-2xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold hover:scale-[1.02] transition-all shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </main>
  );
};

export default Contact;