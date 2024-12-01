import { Grid2X2, List } from 'lucide-react';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import img6 from '../images/img6.png';
import img7 from '../images/img7.png';
import img8 from '../images/img8.png';
import img9 from '../images/img9.png';
export default function MarketplacePage() {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get daily thing
              <br />
              in same <span className="text-muted-foreground">platform</span>
            </h1>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4]">
                <img
                  src={img1}
                  alt="Person using phone"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-pink-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">5000 +</div>
                  <div className="text-sm">DAILY ADS LISTING</div>
                </div>
                <div className="relative aspect-square">
                  <img
                    src={img2}
                    alt="App interface"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <div className="text-pink-600 text-xl">★</div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Recommendations Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-sm font-medium text-pink-600 mb-2">WHAT'S NEW</div>
              <h2 className="text-2xl font-bold">Fresh Recommendations</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">33 items</div>
              <div className="flex border rounded-md">
                <button className="rounded-none p-2">
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button className="rounded-none p-2">
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
  
          {/* Reduced Card Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
                <div className="relative aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <span>{product.location}</span>
                      <span>•</span>
                      <span>{product.time}</span>
                    </div>
                    <button className="h-8 w-8 p-2">
                      <span className="sr-only">Menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-medium text-sm mb-2">{product.title}</h3>
                  <div className="text-lg font-bold">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  
  const products = [
    {
      id: 1,
      title: "Pro Smart tv lite 6/128gb",
      price: "499",
      location: "Paris",
      time: "1 day ago",
      image: img3,
    },
    {
      id: 2,
      title: "HP Prosy x360 Laptop - Core i7, 16GB RAM, 512GB SSD",
      price: "899",
      location: "Paris",
      time: "1 day ago",
      image: img4,
    },
    {
      id: 3,
      title: "Sony 55' 4K Smart LED TV - Excellent Picture Quality",
      price: "499",
      location: "Paris",
      time: "1 day ago",
      image: img5,
    },
    {
      id: 4,
      title: "Sony 55' 4K Smart LED TV - Excellent Picture Quality",
      price: "499",
      location: "Paris",
      time: "1 day ago",
      image: img6,
    },
    {
      id: 5,
      title: "Apple MacBook pro 15.4 inch monitor laptop",
      price: "499",
      location: "Paris",
      time: "1 day ago",
      image: img7,
    },
    {
      id: 6,
      title: "Panasonic Split Air Conditioner - 1.5 Ton, Inverter Technology",
      price: "899",
      location: "Paris",
      time: "1 day ago",
      image: img8,
    },
    {
      id: 7,
      title: "Whirlpool Front Load Washing Machine - 7kg Capacity",
      price: "699",
      location: "Paris",
      time: "1 day ago",
      image: img9,
    },
  ];
  