import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen py-10 px-6 md:px-16 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">ABOUT US</h1>
      
      <div className="flex justify-center">
        <Image 
          src="/Sustainable-Streetwear-Everything-You-Need-to-Know-1.webp"
          alt="Fashion Model"
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>
      
      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold">Quality Styles</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-2">
          In fashion, beauty is in the eye of the beholder, but quality should never be a compromise. No matter what youre looking for, we guarantee durability. We are committed to providing you styles that have quality built in and will last through the wear and tear of your day.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="text-center">
          <Image 
            src="/mainPageBackgrd.jpg"
            alt="Innovative Designs"
            width={800}
            height={220}
            className="rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-4">Innovative Designs</h2>
          <p className="text-gray-400 max-w-md mx-auto mt-2">
            We know that looking stylish can make your whole day better; thats why were committed to being your source for the newest trends.
          </p>
        </div>
        <div className="text-center">
          <Image 
            src="/cr=w_600,h_300.webp"
            alt="Satisfaction Guaranteed"
            width={800}
            height={250}
            className="rounded-lg mx-auto"
          />
          <h2 className="text-lg font-semibold mt-4">Satisfaction Guaranteed</h2>
          <p className="text-gray-400 max-w-md mx-auto mt-2">
            While shopping with us, we want you to be completely happy. If you have questions about us, our products, or even shipping, get in touch!
          </p>
        </div>
      </div>
    </div>
  );
}




