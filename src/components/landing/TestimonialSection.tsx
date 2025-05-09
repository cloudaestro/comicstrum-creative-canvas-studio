
import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        "ComicStrum has transformed my storytelling. I can now create professional-looking comics in minutes that would have taken weeks by hand!",
      name: "Alex Morgan",
      title: "Indie Creator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "The AI understands exactly what I'm looking for. The manga style mode is particularly impressive with its authentic aesthetics.",
      name: "Kenji Takahashi",
      title: "Manga Artist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "As an educator, I use ComicStrum to create engaging visual stories for my students. The children's book mode is perfect for younger audiences!",
      name: "Sarah Johnson",
      title: "Elementary Teacher",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-comic-purple/5">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-comic-gray text-lg max-w-2xl mx-auto">
            See what our community has to say about their experience with
            ComicStrum.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 relative"
            >
              {/* Quote Mark */}
              <div className="absolute -top-4 -left-2 text-6xl text-comic-purple opacity-20 font-serif">
                "
              </div>
              
              <div className="mb-6">
                <p className="text-comic-gray italic relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-comic-gray">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
